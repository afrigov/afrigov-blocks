<?php
/**
 * Events: their own kind of content, so a list can show the next few anywhere and the events
 * page can show them all, in pages. Each event has a date (or "to be confirmed"), a start time,
 * and a line saying when and where. An event with nothing written about it can link elsewhere.
 *
 * @package AfrigovBlocks
 */

defined( 'ABSPATH' ) || exit;

const AFRIGOV_EVENT = 'afrigov_event';

/**
 * The Events type, and the fields the editor's "When and where" panel edits.
 */
function afrigov_blocks_events_register() {
	register_post_type(
		AFRIGOV_EVENT,
		array(
			'labels'       => array(
				'name'          => __( 'Events', 'afrigov-blocks' ),
				'singular_name' => __( 'Event', 'afrigov-blocks' ),
				'add_new_item'  => __( 'Add event', 'afrigov-blocks' ),
				'edit_item'     => __( 'Edit event', 'afrigov-blocks' ),
				'all_items'     => __( 'All events', 'afrigov-blocks' ),
			),
			'public'       => true,
			'has_archive'  => false, // The events page is an ordinary page with an Events list block on it.
			'rewrite'      => array( 'slug' => 'events', 'with_front' => false ),
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-calendar-alt',
			'menu_position' => 21,
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'page-attributes' ),
		)
	);
	$fields = array(
		'afrigov_date'  => 'string',
		'afrigov_time'  => 'string',
		'afrigov_tbc'   => 'boolean',
		'afrigov_where' => 'string',
		'afrigov_link'  => 'string',
		'afrigov_lead'  => 'string',
	);
	foreach ( $fields as $key => $type ) {
		register_post_meta(
			AFRIGOV_EVENT,
			$key,
			array(
				'type'          => $type,
				'single'        => true,
				'show_in_rest'  => true,
				'auth_callback' => fn() => current_user_can( 'edit_posts' ),
			)
		);
	}
}
add_action( 'init', 'afrigov_blocks_events_register' );

/**
 * The "When and where" panel beside the editor, for events only.
 */
function afrigov_blocks_events_panel() {
	if ( get_current_screen() && AFRIGOV_EVENT === get_current_screen()->post_type ) {
		wp_enqueue_script( 'afrigov-blocks-event-panel', plugin_dir_url( __DIR__ ) . 'assets/event-panel.js', array( 'wp-plugins', 'wp-editor', 'wp-components', 'wp-data', 'wp-element', 'wp-core-data', 'wp-i18n' ), AFRIGOV_BLOCKS_VERSION, true );
	}
}
add_action( 'enqueue_block_editor_assets', 'afrigov_blocks_events_panel' );

/**
 * One event's facts, from its fields.
 *
 * @param int|WP_Post $post The event.
 * @return array
 */
function afrigov_blocks_event( $post ) {
	$post = get_post( $post );
	$date = (string) get_post_meta( $post->ID, 'afrigov_date', true );
	$tbc  = (bool) get_post_meta( $post->ID, 'afrigov_tbc', true ) || ! preg_match( '/^\d{4}-\d{2}-\d{2}$/', $date );
	$link = trim( (string) get_post_meta( $post->ID, 'afrigov_link', true ) );
	return array(
		'id'    => $post->ID,
		'title' => get_the_title( $post ),
		'date'  => $tbc ? '' : $date,
		'time'  => (string) get_post_meta( $post->ID, 'afrigov_time', true ),
		'tbc'   => $tbc,
		'where' => trim( (string) get_post_meta( $post->ID, 'afrigov_where', true ) ),
		'text'  => has_excerpt( $post ) ? get_the_excerpt( $post ) : '',
		// The sentence under the title on the event's own page; the excerpt when there is none.
		'lead'  => trim( (string) get_post_meta( $post->ID, 'afrigov_lead', true ) ),
		// An event with something written about it has its own page; otherwise it links where it says.
		'url'   => ( '' === trim( wp_strip_all_tags( $post->post_content ) ) && $link ) ? $link : get_permalink( $post ),
		'past'  => ! $tbc && $date < current_time( 'Y-m-d' ),
	);
}

/**
 * Events in the order people want them: the next first, then those to be confirmed, then the
 * most recent past.
 *
 * @param string $which upcoming, past or all.
 * @return array
 */
function afrigov_blocks_events( $which = 'all' ) {
	$posts = get_posts(
		array(
			'post_type'      => AFRIGOV_EVENT,
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
		)
	);
	$events   = array_map( 'afrigov_blocks_event', $posts );
	$dated    = array_values( array_filter( $events, fn( $e ) => ! $e['tbc'] && ! $e['past'] ) );
	$tbc      = array_values( array_filter( $events, fn( $e ) => $e['tbc'] ) );
	$past     = array_values( array_filter( $events, fn( $e ) => $e['past'] ) );
	usort( $dated, fn( $a, $b ) => strcmp( $a['date'] . $a['time'], $b['date'] . $b['time'] ) );
	usort( $past, fn( $a, $b ) => strcmp( $b['date'] . $b['time'], $a['date'] . $a['time'] ) );
	$upcoming = array_merge( $dated, $tbc );
	if ( 'upcoming' === $which ) {
		return $upcoming;
	}
	if ( 'past' === $which ) {
		return $past;
	}
	return array_merge( $upcoming, $past );
}

/**
 * One event as afrigov's event item.
 *
 * @param array  $e   The event, from afrigov_blocks_event().
 * @param string $tag The title's heading tag.
 * @return string
 */
function afrigov_blocks_event_item( $e, $tag = 'h3' ) {
	if ( $e['tbc'] ) {
		$block = '<span class="ag-event__date ag-event__date--tbc">TBC<span class="ag-visually-hidden">, ' . esc_html__( 'date to be confirmed', 'afrigov-blocks' ) . '</span></span>';
		$meta  = $e['where'];
	} else {
		$stamp = strtotime( $e['date'] . ' ' . ( $e['time'] ? $e['time'] : '00:00' ) );
		$utc   = new DateTimeZone( 'UTC' );
		$block = sprintf(
			'<time class="ag-event__date" datetime="%s"><span class="ag-event__day">%s</span><span class="ag-event__month">%s</span></time>',
			esc_attr( $e['date'] . ( $e['time'] ? 'T' . $e['time'] : '' ) ),
			esc_html( wp_date( 'j', $stamp, $utc ) ),
			esc_html( wp_date( 'M', $stamp, $utc ) )
		);
		$meta  = $e['where'] ? $e['where'] : wp_date( $e['time'] ? 'l j F Y, g:ia' : 'l j F Y', $stamp, $utc );
	}
	if ( $e['past'] ) {
		$meta .= ( $meta ? '. ' : '' ) . __( 'Past event.', 'afrigov-blocks' );
	}
	$html  = '<li class="ag-event' . ( $e['past'] ? ' ag-event--past' : '' ) . '">' . $block . '<div class="ag-event__body">';
	$html .= sprintf( '<%1$s class="ag-event__title"><a href="%2$s">%3$s</a></%1$s>', $tag, esc_url( $e['url'] ), esc_html( $e['title'] ) );
	if ( $meta ) {
		$html .= '<p class="ag-event__meta">' . esc_html( $meta ) . '</p>';
	}
	if ( $e['text'] ) {
		$html .= '<p class="ag-event__text">' . esc_html( $e['text'] ) . '</p>';
	}
	return $html . '</div></li>';
}

/**
 * An event's own page: the event header, then what is written about it. Used when the theme
 * has no template for events of its own.
 *
 * @param string $template The template WordPress chose.
 * @return string
 */
function afrigov_blocks_event_template( $template ) {
	if ( is_singular( AFRIGOV_EVENT ) && ! locate_template( array( 'single-' . AFRIGOV_EVENT . '.php' ) ) ) {
		return dirname( __DIR__ ) . '/templates/single-event.php';
	}
	return $template;
}
add_filter( 'template_include', 'afrigov_blocks_event_template' );
