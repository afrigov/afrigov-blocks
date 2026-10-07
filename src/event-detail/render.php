<?php
/**
 * An event's details beside its flyer. The flyer is the block's own picture, or on an event the
 * event's featured image, labelled Flyer there. Without a flyer, the details take the full width.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The rendered rows.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_flyer = (int) ( $attributes['flyer']['id'] ?? 0 );
if ( ! $afrigov_flyer && AFRIGOV_EVENT === get_post_type() ) {
	$afrigov_flyer = (int) get_post_thumbnail_id( get_the_ID() );
}
$afrigov_rows = trim( $content );
if ( '' === $afrigov_rows && ! $afrigov_flyer ) {
	return;
}

$afrigov_figure = '';
if ( $afrigov_flyer ) {
	// A flyer is a picture of text: a short description, since the page says everything on it.
	$afrigov_alt = trim( (string) get_post_meta( $afrigov_flyer, '_wp_attachment_image_alt', true ) );
	if ( '' === $afrigov_alt ) {
		/* translators: %s: the event's title. */
		$afrigov_alt = sprintf( __( 'Flyer for %s', 'afrigov-blocks' ), wp_strip_all_tags( get_the_title() ) );
	}
	$afrigov_img = wp_get_attachment_image(
		$afrigov_flyer,
		'medium_large',
		false,
		array(
			'alt'      => $afrigov_alt,
			'sizes'    => '(min-width: 48em) 16rem, 100vw',
			'loading'  => 'lazy',
			'decoding' => 'async',
		)
	);
	if ( $afrigov_img ) {
		$afrigov_caption = trim( wp_strip_all_tags( $attributes['caption'] ?? '' ) );
		if ( '' === $afrigov_caption ) {
			$afrigov_caption = __( 'Open the flyer full size. Everything on it is written on this page.', 'afrigov-blocks' );
		}
		$afrigov_figure = sprintf(
			'<figure class="ag-flyer"><a href="%s">%s</a><figcaption class="ag-flyer__caption">%s</figcaption></figure>',
			esc_url( (string) wp_get_attachment_url( $afrigov_flyer ) ),
			$afrigov_img,
			esc_html( $afrigov_caption )
		);
	}
}

$afrigov_list = '' === $afrigov_rows ? '' : '<dl class="ag-summary">' . $afrigov_rows . '</dl>';
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_figure ? 'ag-event-detail' : 'afrigov-event-detail' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $afrigov_list . $afrigov_figure; // phpcs:ignore WordPress.Security.EscapeOutput -- each row escapes its own fields; the figure is built from escaped parts and wp_get_attachment_image ?>
</div>
