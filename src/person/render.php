<?php
/**
 * One person. Without a portrait, a plain frame keeps the grid even.
 *
 * @package AfrigovBlocks
 * @var array    $attributes The block's fields.
 * @var WP_Block $block      For the list's heading level.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_name = trim( wp_strip_all_tags( $attributes['name'] ?? '' ) );
if ( '' === $afrigov_name ) {
	return;
}
$afrigov_tag   = afrigov_blocks_heading( $block->context['afrigov/personHeading'] ?? 3 );
$afrigov_url   = trim( $attributes['url'] ?? '' );
$afrigov_photo = (int) ( $attributes['photo']['id'] ?? 0 );
$afrigov_img   = $afrigov_photo
	? wp_get_attachment_image( $afrigov_photo, 'medium', false, array( 'class' => 'ag-person__photo', 'loading' => 'lazy', 'alt' => '' ) )
	: '<img class="ag-person__photo" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3Crect width=\'1\' height=\'1\' fill=\'%23dfe6ec\'/%3E%3C/svg%3E" alt="" width="320" height="320" loading="lazy" />';
$afrigov_name_html = $afrigov_url ? sprintf( '<a href="%s">%s</a>', esc_url( $afrigov_url ), esc_html( $afrigov_name ) ) : esc_html( $afrigov_name );
?>
<li class="ag-person">
	<?php echo $afrigov_img; // phpcs:ignore WordPress.Security.EscapeOutput -- built by wp_get_attachment_image or fixed ?>
	<div>
		<<?php echo esc_html( $afrigov_tag ); ?> class="ag-person__name"><?php echo $afrigov_name_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></<?php echo esc_html( $afrigov_tag ); ?>>
		<?php if ( ! empty( $attributes['role'] ) ) : ?>
			<p class="ag-person__role"><?php echo esc_html( wp_strip_all_tags( $attributes['role'] ) ); ?></p>
		<?php endif; ?>
	</div>
</li>
