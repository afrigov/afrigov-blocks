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
