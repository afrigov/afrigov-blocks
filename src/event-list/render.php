<?php
/**
 * A list of events from the Events section.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_which  = in_array( $attributes['which'] ?? 'upcoming', array( 'upcoming', 'past', 'all' ), true ) ? $attributes['which'] : 'upcoming';
$afrigov_count  = max( 1, min( 30, (int) ( $attributes['count'] ?? 3 ) ) );
$afrigov_events = afrigov_blocks_events( $afrigov_which );
$afrigov_tag    = afrigov_blocks_heading( $attributes['headingLevel'] ?? 3 );
$afrigov_editor = defined( 'REST_REQUEST' ) && REST_REQUEST;

if ( ! $afrigov_events ) {
	if ( $afrigov_editor ) {
		echo '<p>' . esc_html__( 'No events yet. Add them under Events in the admin menu.', 'afrigov-blocks' ) . '</p>';
	}
	return;
}

// All of them, a page at a time: ?events-page=2. Its own name, so it never clashes with the page's.
$afrigov_page  = 1;
$afrigov_pages = 1;
if ( ! empty( $attributes['paginate'] ) ) {
	$afrigov_pages = (int) ceil( count( $afrigov_events ) / $afrigov_count );
	$afrigov_page  = min( $afrigov_pages, max( 1, (int) ( $_GET['events-page'] ?? 1 ) ) ); // phpcs:ignore WordPress.Security.NonceVerification -- a page number
}
$afrigov_shown = array_slice( $afrigov_events, ( $afrigov_page - 1 ) * $afrigov_count, $afrigov_count );
$afrigov_label = trim( wp_strip_all_tags( $attributes['allLabel'] ?? '' ) );
$afrigov_url   = trim( $attributes['allUrl'] ?? '' );
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<ul class="ag-events">
		<?php
		foreach ( $afrigov_shown as $afrigov_event ) {
			echo afrigov_blocks_event_item( $afrigov_event, $afrigov_tag ); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the function
		}
		?>
	</ul>
	<?php if ( $afrigov_pages > 1 ) : ?>
		<nav aria-label="<?php esc_attr_e( 'Events pages', 'afrigov-blocks' ); ?>">
			<ul class="ag-pagination">
				<?php if ( $afrigov_page > 1 ) : ?>
					<li><a class="ag-pagination__link" href="<?php echo esc_url( add_query_arg( 'events-page', $afrigov_page - 1 ) ); ?>" rel="prev"><?php esc_html_e( 'Previous', 'afrigov-blocks' ); ?></a></li>
				<?php endif; ?>
				<?php for ( $afrigov_n = 1; $afrigov_n <= $afrigov_pages; $afrigov_n++ ) : ?>
					<li><a class="ag-pagination__link" href="<?php echo esc_url( add_query_arg( 'events-page', $afrigov_n ) ); ?>"<?php echo $afrigov_n === $afrigov_page ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $afrigov_n ); ?></a></li>
				<?php endfor; ?>
				<?php if ( $afrigov_page < $afrigov_pages ) : ?>
					<li><a class="ag-pagination__link" href="<?php echo esc_url( add_query_arg( 'events-page', $afrigov_page + 1 ) ); ?>" rel="next"><?php esc_html_e( 'Next', 'afrigov-blocks' ); ?></a></li>
				<?php endif; ?>
			</ul>
		</nav>
	<?php endif; ?>
	<?php if ( $afrigov_label && $afrigov_url ) : ?>
		<p><a href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_label ); ?></a></p>
	<?php endif; ?>
</div>
