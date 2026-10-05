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

$afrigov_edges   = array(
	'accent' => 'ag-card--accent',
	'flag'   => 'ag-card--flag',
);
$afrigov_edge    = $block->context['afrigov/cardEdge'] ?? 'primary';
$afrigov_classes = trim( 'ag-card ' . ( $afrigov_edges[ $afrigov_edge ] ?? '' ) );
$afrigov_heading = 2 === (int) ( $block->context['afrigov/cardHeading'] ?? 3 ) ? 'h2' : 'h3';
$afrigov_url     = trim( $attributes['url'] ?? '' );
$afrigov_title_html = $afrigov_url
	? sprintf( '<a class="ag-card__link" href="%s">%s</a>', esc_url( $afrigov_url ), esc_html( $afrigov_title ) )
	: esc_html( $afrigov_title );
?>
<li class="<?php echo esc_attr( $afrigov_classes ); ?>">
	<<?php echo esc_html( $afrigov_heading ); ?> class="ag-card__title"><?php echo $afrigov_title_html; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></<?php echo esc_html( $afrigov_heading ); ?>>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p class="ag-card__text"><?php echo wp_kses( $attributes['text'], array( 'strong' => array() ) ); ?></p>
	<?php endif; ?>
</li>
