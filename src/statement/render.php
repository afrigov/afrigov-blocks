<?php
/**
 * A statement from the head of the organisation.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The message's paragraphs.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title || '' === trim( wp_strip_all_tags( $content ) ) ) {
	return;
}
$afrigov_id    = wp_unique_id( 'ag-statement-' );
$afrigov_photo = (int) ( $attributes['photo']['id'] ?? 0 );
$afrigov_name  = trim( wp_strip_all_tags( $attributes['name'] ?? '' ) );
$afrigov_role  = trim( wp_strip_all_tags( $attributes['role'] ?? '' ) );
$afrigov_label = trim( wp_strip_all_tags( $attributes['linkLabel'] ?? '' ) );
$afrigov_url   = trim( $attributes['linkUrl'] ?? '' );
?>
<section <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-statement', 'aria-labelledby' => $afrigov_id ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php if ( $afrigov_photo ) : ?>
		<figure class="ag-figure ag-statement__media"><?php echo afrigov_blocks_image( $afrigov_photo, 'ag-figure__image', '20rem' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></figure>
	<?php endif; ?>
	<div class="ag-statement__body">
		<h2 class="ag-statement__title" id="<?php echo esc_attr( $afrigov_id ); ?>"><?php echo esc_html( $afrigov_title ); ?></h2>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- core paragraphs ?>
		<?php if ( $afrigov_name ) : ?>
			<p class="ag-statement__by"><strong><?php echo esc_html( $afrigov_name ); ?></strong><?php echo esc_html( $afrigov_role ); ?></p>
		<?php endif; ?>
		<?php if ( $afrigov_label && $afrigov_url ) : ?>
			<p><a href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_label ); ?></a></p>
		<?php endif; ?>
	</div>
</section>
