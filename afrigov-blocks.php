<?php
/**
 * Plugin Name:       afrigov blocks
 * Plugin URI:        https://github.com/omoyolab/afrigov-blocks
 * Description:       afrigov's components as blocks: each one a fixed shape you fill in on the page, with an Add button for repeating parts. Pages stay accessible and light.
 * Version:           0.1.0
 * Requires at least: 6.6
 * Requires PHP:      8.0
 * Author:            omoyolab
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       afrigov-blocks
 *
 * @package AfrigovBlocks
 */

defined( 'ABSPATH' ) || exit;

define( 'AFRIGOV_BLOCKS_VERSION', '0.1.0' );

/**
 * The blocks. Each folder in build/ has a block.json, the editor script, and render.php, which
 * builds the HTML when the page is shown. Nothing is saved in the post but the block's fields,
 * so when afrigov changes a component's markup, existing pages follow without a block error.
 */
function afrigov_blocks_register() {
	foreach ( array( 'hero', 'service-cards', 'service-card' ) as $block ) {
		register_block_type( __DIR__ . '/build/' . $block );
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
 */
function afrigov_blocks_styles() {
	if ( current_theme_supports( 'afrigov' ) ) {
		return;
	}
	$css = plugin_dir_url( __FILE__ ) . 'assets/afrigov/core.min.css';
	wp_enqueue_style( 'afrigov-blocks-core', $css, array(), AFRIGOV_BLOCKS_VERSION );
}
// enqueue_block_assets runs for the page and inside the editor's canvas, so both look the same.
add_action( 'enqueue_block_assets', 'afrigov_blocks_styles' );
