<?php
/**
 * One service card. The title is the link; the whole card is clickable through it.
 *
 * @package AfrigovBlocks
 * @var array    $attributes The block's fields.
 * @var WP_Block $block      The block, for the list's settings.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}

$afrigov_edges      = array(
	'accent' => 'ag-card--accent',
	'flag'   => 'ag-card--flag',
	'tinted' => 'ag-card--tinted',
	'plain'  => 'ag-card--plain',
);
$afrigov_horizontal = ! empty( $block->context['afrigov/cardHorizontal'] );
$afrigov_classes    = array_filter( array( 'ag-card', $afrigov_edges[ $block->context['afrigov/cardEdge'] ?? 'primary' ] ?? '', $afrigov_horizontal ? 'ag-card--horizontal' : '' ) );
$afrigov_heading    = afrigov_blocks_heading( $block->context['afrigov/cardHeading'] ?? 3 );
$afrigov_url        = trim( $attributes['url'] ?? '' );
$afrigov_title_html = $afrigov_url
	? sprintf( '<a class="ag-card__link" href="%s">%s</a>', esc_url( $afrigov_url ), esc_html( $afrigov_title ) )
	: esc_html( $afrigov_title );

// The picture is decoration: the title says what the card is, so it has no description of its own.
$afrigov_image   = (int) ( $attributes['image']['id'] ?? 0 );
$afrigov_picture = '';
if ( $afrigov_image ) {
	$afrigov_logo    = 'logo' === ( $attributes['imageKind'] ?? 'photo' );
	$afrigov_picture = sprintf(
		'<div class="%s">%s</div>',
		$afrigov_logo ? 'ag-card__logo' : 'ag-card__image',
		wp_get_attachment_image( $afrigov_image, $afrigov_logo ? 'medium' : 'medium_large', false, array( 'alt' => '', 'loading' => 'lazy', 'decoding' => 'async' ) )
	);
}
ob_start();
?>
<<?php echo esc_html( $afrigov_heading ); ?> class="ag-card__title"><?php echo $afrigov_title_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></<?php echo esc_html( $afrigov_heading ); ?>>
<?php if ( ! empty( $attributes['text'] ) ) : ?>
	<p class="ag-card__text"><?php echo wp_kses( $attributes['text'], array( 'strong' => array() ) ); ?></p>
<?php endif; ?>
<?php if ( ! empty( $attributes['meta'] ) ) : ?>
	<p class="ag-card__meta"><?php echo esc_html( wp_strip_all_tags( $attributes['meta'] ) ); ?></p>
<?php endif; ?>
<?php
$afrigov_words = ob_get_clean();
?>
<li class="<?php echo esc_attr( implode( ' ', $afrigov_classes ) ); ?>">
	<?php echo $afrigov_picture; // phpcs:ignore WordPress.Security.EscapeOutput -- built by wp_get_attachment_image ?>
	<?php echo $afrigov_horizontal ? '<div class="ag-card__body">' . $afrigov_words . '</div>' : $afrigov_words; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?>
</li>
