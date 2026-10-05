<?php
/**
 * A back link.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_url = trim( $attributes['url'] ?? '' );
if ( '' === $afrigov_url ) {
	return;
}
$afrigov_label = trim( wp_strip_all_tags( $attributes['label'] ?? '' ) );
?>
<p <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>><a class="ag-back-link" href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( '' !== $afrigov_label ? $afrigov_label : __( 'Back', 'afrigov-blocks' ) ); ?></a></p>
