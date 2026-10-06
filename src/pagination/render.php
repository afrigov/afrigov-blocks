<?php
/**
 * Previous and next links for a long list.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_links = array();
foreach ( array( 'prev', 'next' ) as $afrigov_key ) {
	$afrigov_label = trim( wp_strip_all_tags( $attributes[ $afrigov_key . 'Label' ] ?? '' ) );
	$afrigov_url   = trim( $attributes[ $afrigov_key . 'Url' ] ?? '' );
	if ( $afrigov_label && $afrigov_url ) {
		$afrigov_links[] = sprintf( '<li><a class="ag-pagination__link" href="%s" rel="%s">%s</a></li>', esc_url( $afrigov_url ), $afrigov_key, esc_html( $afrigov_label ) );
	}
}
if ( ! $afrigov_links ) {
	return;
}
?>
<nav <?php echo get_block_wrapper_attributes( array( 'aria-label' => __( 'Pagination', 'afrigov-blocks' ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<ul class="ag-pagination ag-pagination--simple"><?php echo implode( '', $afrigov_links ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></ul>
</nav>
