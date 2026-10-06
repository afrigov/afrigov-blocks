<?php
/**
 * One event's page: the event header from its fields, then what is written about it.
 *
 * @package AfrigovBlocks
 */

defined( 'ABSPATH' ) || exit;

get_header();
if ( function_exists( 'afrigovpress_breadcrumb' ) ) {
	afrigovpress_breadcrumb();
}
while ( have_posts() ) :
	the_post();
	$afrigov_e = afrigov_blocks_event( get_post() );
	echo render_block( // phpcs:ignore WordPress.Security.EscapeOutput -- the block escapes its fields
		array(
			'blockName'    => 'afrigov/event-header',
			'attrs'        => array(
				'title' => $afrigov_e['title'],
				'lead'  => $afrigov_e['lead'] ? $afrigov_e['lead'] : $afrigov_e['text'],
				'date'  => $afrigov_e['date'],
				'time'  => $afrigov_e['time'],
				'tbc'   => $afrigov_e['tbc'],
			),
			'innerBlocks'  => array(),
			'innerHTML'    => '',
			'innerContent' => array(),
		)
	);
	?>
	<div class="agp-content"><?php the_content(); ?></div>
	<?php
endwhile;
get_footer();
