<?php
/**
 * One dated item.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_url  = trim( $attributes['url'] ?? '' );
$afrigov_date = $attributes['date'] ?? '';
$afrigov_tag  = trim( wp_strip_all_tags( $attributes['tag'] ?? '' ) );
$afrigov_meta = array();
if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $afrigov_date ) ) {
	$afrigov_meta[] = sprintf( '<time datetime="%s">%s</time>', esc_attr( $afrigov_date ), esc_html( wp_date( 'j F Y', strtotime( $afrigov_date ), new DateTimeZone( 'UTC' ) ) ) );
}
if ( $afrigov_tag ) {
	$afrigov_meta[] = esc_html( $afrigov_tag );
}
?>
<li class="ag-list__item">
	<?php if ( $afrigov_url ) : ?>
		<a class="ag-list__link" href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_title ); ?></a>
	<?php else : ?>
		<span class="ag-list__link"><?php echo esc_html( $afrigov_title ); ?></span>
	<?php endif; ?>
	<?php if ( $afrigov_meta ) : ?>
		<span class="ag-list__meta"><?php echo implode( ' · ', $afrigov_meta ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></span>
	<?php endif; ?>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p class="ag-list__text"><?php echo esc_html( wp_strip_all_tags( $attributes['text'] ) ); ?></p>
	<?php endif; ?>
</li>
