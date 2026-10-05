<?php
/**
 * One video card.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_url    = trim( $attributes['url'] ?? '' );
$afrigov_poster = (int) ( $attributes['poster']['id'] ?? 0 );
$afrigov_img    = $afrigov_poster
	? wp_get_attachment_image( $afrigov_poster, 'medium_large', false, array( 'alt' => '', 'loading' => 'lazy', 'decoding' => 'async' ) )
	: '<img src="' . esc_attr( "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23c7d6e3'/%3E%3C/svg%3E" ) . '" alt="" width="640" height="360" loading="lazy" />';
$afrigov_length = trim( wp_strip_all_tags( $attributes['duration'] ?? '' ) );
$afrigov_title_html = $afrigov_url ? sprintf( '<a class="ag-card__link" href="%s">%s</a>', esc_url( $afrigov_url ), esc_html( $afrigov_title ) ) : esc_html( $afrigov_title );
?>
<li class="ag-card ag-card--video">
	<div class="ag-card__image">
		<?php echo $afrigov_img; // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<?php if ( $afrigov_length ) : ?>
			<span class="ag-card__duration"><span class="ag-visually-hidden"><?php esc_html_e( 'Length', 'afrigov-blocks' ); ?> </span><?php echo esc_html( $afrigov_length ); ?></span>
		<?php endif; ?>
	</div>
	<h3 class="ag-card__title"><?php echo $afrigov_title_html; // phpcs:ignore WordPress.Security.EscapeOutput ?></h3>
	<?php if ( ! empty( $attributes['meta'] ) ) : ?>
		<p class="ag-card__text"><?php echo esc_html( wp_strip_all_tags( $attributes['meta'] ) ); ?></p>
	<?php endif; ?>
</li>
