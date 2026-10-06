<?php
/**
 * Plugin Name:       afrigov blocks
 * Plugin URI:        https://github.com/omoyolab/afrigov-blocks
 * Description:       afrigov's components as blocks: each one a fixed shape you fill in on the page, with an Add button for repeating parts. Pages stay accessible and light.
 * Version:           0.1.0
 * Requires at least: 6.6
 * Requires PHP:      8.0
 * Author:            Abimbola Omoyola
 * Author URI:        https://omoyola.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       afrigov-blocks
 *
 * @package AfrigovBlocks
 */

defined( 'ABSPATH' ) || exit;

define( 'AFRIGOV_BLOCKS_VERSION', '0.1.0' );

/**
 * The blocks: every folder in build/ with a block.json. Each has the editor script and render.php,
 * which builds the HTML when the page is shown. Nothing is saved in the post but the block's fields,
 * so when afrigov changes a component's markup, existing pages follow without a block error.
 */
function afrigov_blocks_register() {
	foreach ( glob( __DIR__ . '/build/*/block.json' ) as $file ) {
		register_block_type( dirname( $file ) );
	}
}
add_action( 'init', 'afrigov_blocks_register' );

/**
 * An "afrigov" group at the top of the block inserter, so the components are the first thing seen.
 *
 * @param array $categories The editor's block categories.
 * @return array
 */
function afrigov_blocks_category( $categories ) {
	array_unshift(
		$categories,
		array(
			'slug'  => 'afrigov',
			'title' => __( 'afrigov', 'afrigov-blocks' ),
		)
	);
	return $categories;
}
add_filter( 'block_categories_all', 'afrigov_blocks_category' );

/**
 * afrigov's stylesheet, for a theme that does not carry it. A theme that does says so with
 * add_theme_support( 'afrigov' ), as afrigovPress does, and the plugin adds nothing.
 * enqueue_block_assets runs for the page and inside the editor's canvas, so both look the same.
 */
function afrigov_blocks_styles() {
	if ( ! current_theme_supports( 'afrigov' ) ) {
		wp_enqueue_style( 'afrigov-blocks-core', plugin_dir_url( __FILE__ ) . 'assets/afrigov/core.min.css', array(), AFRIGOV_BLOCKS_VERSION );
		// The script plays videos when pressed and opens menus; a theme with afrigov loads its own.
		if ( ! is_admin() ) {
			wp_enqueue_script( 'afrigov-blocks-script', plugin_dir_url( __FILE__ ) . 'assets/afrigov/afrigov.iife.js', array(), AFRIGOV_BLOCKS_VERSION, true );
		}
	}
	if ( is_admin() ) {
		wp_enqueue_style( 'afrigov-blocks-editor', plugin_dir_url( __FILE__ ) . 'assets/editor.css', array(), AFRIGOV_BLOCKS_VERSION );
	}
}
add_action( 'enqueue_block_assets', 'afrigov_blocks_styles' );

/**
 * The editor's own styles in the sidebar too, where the layout pictures and the media picker are.
 */
function afrigov_blocks_editor_styles() {
	wp_enqueue_style( 'afrigov-blocks-editor', plugin_dir_url( __FILE__ ) . 'assets/editor.css', array(), AFRIGOV_BLOCKS_VERSION );
	wp_enqueue_script( 'afrigov-blocks-editor', plugin_dir_url( __FILE__ ) . 'assets/editor.js', array( 'wp-blocks', 'wp-data', 'wp-dom-ready', 'wp-editor' ), AFRIGOV_BLOCKS_VERSION, true );
}
add_action( 'enqueue_block_editor_assets', 'afrigov_blocks_editor_styles' );

/**
 * A picture from the media library, at the sizes phones and desktops need, with its description
 * from the media library. Lazy-loaded unless it is the first thing on the page.
 *
 * @param int    $id    The attachment.
 * @param string $class Class for the img.
 * @param string $sizes The sizes attribute: how wide the picture is shown.
 * @param bool   $eager True for the hero's picture.
 * @return string
 */
function afrigov_blocks_image( $id, $class, $sizes, $eager = false ) {
	return wp_get_attachment_image(
		$id,
		'large',
		false,
		array(
			'class'         => $class,
			'sizes'         => $sizes,
			'loading'       => $eager ? 'eager' : 'lazy',
			'fetchpriority' => $eager ? 'high' : 'auto',
			'decoding'      => 'async',
		)
	);
}

/**
 * A heading tag from a level the editor chose, never anything else.
 *
 * @param mixed $level 2, 3 or 4.
 * @param int   $fallback Level when the value is not allowed.
 * @return string
 */
function afrigov_blocks_heading( $level, $fallback = 3 ) {
	$level = (int) $level;
	return 'h' . ( in_array( $level, array( 2, 3, 4 ), true ) ? $level : $fallback );
}

/**
 * A file size the way afrigov writes it: 310 KB, 2.4 MB. Small files round up to 1 KB.
 *
 * @param int $bytes The size.
 * @return string
 */
function afrigov_blocks_size( $bytes ) {
	if ( $bytes >= 1048576 ) {
		return number_format_i18n( $bytes / 1048576, 1 ) . ' MB';
	}
	return number_format_i18n( max( 1, round( $bytes / 1024 ) ) ) . ' KB';
}

/**
 * On pages, the block list holds afrigov's blocks and the basic blocks for writing, so there is
 * little to choose from and nothing that breaks the look. Posts keep every block: articles are
 * mostly text. Blocks already on a page keep working; they just cannot be added again.
 *
 * Turn it off with:  add_filter( 'afrigov_blocks_limit_pages', '__return_false' );
 * Change the basic blocks with the afrigov_blocks_page_core_blocks filter.
 *
 * @param bool|string[]           $allowed Allowed block types.
 * @param WP_Block_Editor_Context $context Where the editor is.
 * @return bool|string[]
 */
function afrigov_blocks_page_blocks( $allowed, $context ) {
	if ( empty( $context->post ) || 'page' !== $context->post->post_type || ! apply_filters( 'afrigov_blocks_limit_pages', true ) ) {
		return $allowed;
	}
	$core   = apply_filters(
		'afrigov_blocks_page_core_blocks',
		array(
			'core/paragraph',
			'core/heading',
			'core/list',
			'core/list-item',
			'core/quote',
			'core/image',
			'core/table',
			'core/details',
			'core/separator',
			'core/buttons',
			'core/button',
			'core/embed',
			'core/shortcode',
			'core/block',
		)
	);
	$ours   = array_filter( array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ), fn( $name ) => str_starts_with( $name, 'afrigov/' ) );
	return array_values( array_merge( $ours, $core ) );
}
add_filter( 'allowed_block_types_all', 'afrigov_blocks_page_blocks', 10, 2 );

/**
 * Starter pages. They are offered when someone creates a new page, already laid out with the
 * right blocks and example words to replace.
 */
function afrigov_blocks_starter_pages() {
	register_block_pattern_category( 'afrigov-pages', array( 'label' => __( 'afrigov: starter pages', 'afrigov-blocks' ) ) );
	$pages = array(
		'service' => array( __( 'Service page', 'afrigov-blocks' ), __( 'What the service is, who can use it, how it works, what to bring, and a Start button.', 'afrigov-blocks' ) ),
		'about'   => array( __( 'About page', 'afrigov-blocks' ), __( 'What the organisation does, in numbers, its leaders and a message from its head.', 'afrigov-blocks' ) ),
		'home'    => array( __( 'Home page', 'afrigov-blocks' ), __( 'A hero, the main services, key figures, events, the latest news and a feature.', 'afrigov-blocks' ) ),
	);
	foreach ( $pages as $slug => $page ) {
		$file = __DIR__ . '/patterns/' . $slug . '.html';
		if ( ! is_readable( $file ) ) {
			continue;
		}
		register_block_pattern(
			'afrigov-blocks/page-' . $slug,
			array(
				'title'       => $page[0],
				'description' => $page[1],
				'categories'  => array( 'afrigov-pages' ),
				'blockTypes'  => array( 'core/post-content' ),
				'postTypes'   => array( 'page' ),
				'content'     => file_get_contents( $file ), // phpcs:ignore WordPress.WP.AlternativeFunctions -- a local file in the plugin
			)
		);
	}
}
add_action( 'init', 'afrigov_blocks_starter_pages' );

/**
 * The player address for a YouTube or Vimeo page address. YouTube plays from youtube-nocookie.com
 * and Vimeo with do-not-track. Anything else returns an empty string, and the video is left out.
 *
 * @param string $url The address copied from the video's page.
 * @return string
 */
function afrigov_blocks_video_embed( $url ) {
	$url = trim( (string) $url );
	if ( preg_match( '~(?:youtu\.be/|youtube(?:-nocookie)?\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/))([A-Za-z0-9_-]{11})~', $url, $m ) ) {
		return 'https://www.youtube-nocookie.com/embed/' . $m[1];
	}
	if ( preg_match( '~vimeo\.com/(?:video/)?(\d+)~', $url, $m ) ) {
		return 'https://player.vimeo.com/video/' . $m[1] . '?dnt=1';
	}
	// A video file, such as one in the media library: the browser's own player shows it.
	if ( preg_match( '~^https?://\S+\.(mp4|webm|m4v)(\?\S*)?$~i', $url ) ) {
		return $url;
	}
	return '';
}
