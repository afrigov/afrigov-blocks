<?php
/**
 * One event. The date block comes from the date; an event whose date has gone is marked past.
 *
 * @package AfrigovBlocks
 * @var array    $attributes The block's fields.
 * @var WP_Block $block      For the list's heading level.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_tag  = afrigov_blocks_heading( $block->context['afrigov/eventHeading'] ?? 3 );
$afrigov_date = $attributes['date'] ?? '';
$afrigov_time = $attributes['time'] ?? '';
$afrigov_has  = empty( $attributes['tbc'] ) && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $afrigov_date );
$afrigov_past = $afrigov_has && $afrigov_date < current_time( 'Y-m-d' );
$afrigov_url  = trim( $attributes['url'] ?? '' );
$afrigov_meta = trim( wp_strip_all_tags( $attributes['meta'] ?? '' ) );

if ( $afrigov_has ) {
	$afrigov_stamp    = strtotime( $afrigov_date . ' ' . ( preg_match( '/^\d{2}:\d{2}$/', $afrigov_time ) ? $afrigov_time : '00:00' ) );
	$afrigov_datetime = $afrigov_date . ( $afrigov_time ? 'T' . $afrigov_time : '' );
	$afrigov_block    = sprintf(
		'<time class="ag-event__date" datetime="%s"><span class="ag-event__day">%s</span><span class="ag-event__month">%s</span></time>',
		esc_attr( $afrigov_datetime ),
		esc_html( wp_date( 'j', $afrigov_stamp, new DateTimeZone( 'UTC' ) ) ),
		esc_html( wp_date( 'M', $afrigov_stamp, new DateTimeZone( 'UTC' ) ) )
	);
	if ( '' === $afrigov_meta ) {
		$afrigov_meta = wp_date( $afrigov_time ? 'l j F Y, g:ia' : 'l j F Y', $afrigov_stamp, new DateTimeZone( 'UTC' ) );
	}
} else {
	$afrigov_block = '<span class="ag-event__date ag-event__date--tbc">TBC<span class="ag-visually-hidden">, ' . esc_html__( 'date to be confirmed', 'afrigov-blocks' ) . '</span></span>';
}
$afrigov_title_html = $afrigov_url ? sprintf( '<a href="%s">%s</a>', esc_url( $afrigov_url ), esc_html( $afrigov_title ) ) : esc_html( $afrigov_title );
?>
<li class="ag-event<?php echo $afrigov_past ? ' ag-event--past' : ''; ?>">
	<?php echo $afrigov_block; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?>
	<div class="ag-event__body">
		<<?php echo esc_html( $afrigov_tag ); ?> class="ag-event__title"><?php echo $afrigov_title_html; // phpcs:ignore WordPress.Security.EscapeOutput ?></<?php echo esc_html( $afrigov_tag ); ?>>
		<?php if ( '' !== $afrigov_meta || $afrigov_past ) : ?>
			<p class="ag-event__meta"><?php echo esc_html( $afrigov_meta ); ?><?php echo $afrigov_past ? esc_html( ( '' !== $afrigov_meta ? '. ' : '' ) . __( 'Past event.', 'afrigov-blocks' ) ) : ''; ?></p>
		<?php endif; ?>
		<?php if ( ! empty( $attributes['text'] ) ) : ?>
			<p class="ag-event__text"><?php echo wp_kses( $attributes['text'], array( 'strong' => array() ) ); ?></p>
		<?php endif; ?>
	</div>
</li>
