<?php
/**
 * The top of an event's page. The page's main heading; afrigovPress leaves out its own title.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	$afrigov_title = get_the_title();
}
$afrigov_date = $attributes['date'] ?? '';
$afrigov_time = $attributes['time'] ?? '';
$afrigov_has  = empty( $attributes['tbc'] ) && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $afrigov_date );
$afrigov_past = $afrigov_has && $afrigov_date < current_time( 'Y-m-d' );
if ( $afrigov_has ) {
	$afrigov_stamp = strtotime( $afrigov_date . ' 00:00' );
	$afrigov_block = sprintf(
		'<time class="ag-event__date ag-event__date--lg" datetime="%s"><span class="ag-event__day">%s</span><span class="ag-event__month">%s</span></time>',
		esc_attr( $afrigov_date . ( $afrigov_time ? 'T' . $afrigov_time : '' ) ),
		esc_html( wp_date( 'j', $afrigov_stamp, new DateTimeZone( 'UTC' ) ) ),
		esc_html( wp_date( 'M', $afrigov_stamp, new DateTimeZone( 'UTC' ) ) )
	);
} else {
	$afrigov_block = '<span class="ag-event__date ag-event__date--tbc ag-event__date--lg">TBC<span class="ag-visually-hidden">, ' . esc_html__( 'date to be confirmed', 'afrigov-blocks' ) . '</span></span>';
}
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-event' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $afrigov_block; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?>
	<div class="ag-event__body">
		<p class="ag-caption"><?php echo esc_html( $afrigov_past ? __( 'Event, past', 'afrigov-blocks' ) : __( 'Event, upcoming', 'afrigov-blocks' ) ); ?></p>
		<h1 class="ag-heading-xl"><?php echo esc_html( $afrigov_title ); ?></h1>
		<?php if ( ! empty( $attributes['lead'] ) ) : ?>
			<p class="ag-lead"><?php echo esc_html( wp_strip_all_tags( $attributes['lead'] ) ); ?></p>
		<?php endif; ?>
	</div>
</div>
