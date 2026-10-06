<?php
/**
 * A picture with a caption.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_id = (int) ( $attributes['image']['id'] ?? 0 );
if ( ! $afrigov_id ) {
	return;
}
$afrigov_ratio = in_array( $attributes['ratio'] ?? '', array( '16-9', '3-2', '4-3', '1-1' ), true ) ? $attributes['ratio'] : '';
$afrigov_attrs = array( 'class' => trim( 'ag-figure ' . ( $afrigov_ratio ? 'ag-figure--' . $afrigov_ratio : '' ) ) );
if ( ! empty( $attributes['narrow'] ) ) {
	$afrigov_attrs['style'] = 'max-width: 48rem';
}
$afrigov_caption = trim( wp_strip_all_tags( $attributes['caption'] ?? '' ) );
?>
<figure <?php echo get_block_wrapper_attributes( $afrigov_attrs ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo afrigov_blocks_image( $afrigov_id, 'ag-figure__image', '(min-width: 48em) 48rem, 100vw' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	<?php if ( $afrigov_caption ) : ?>
		<figcaption class="ag-figure__caption"><?php echo esc_html( $afrigov_caption ); ?></figcaption>
	<?php endif; ?>
</figure>
