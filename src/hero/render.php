<?php
/**
 * The hero's HTML, built when the page is shown, from afrigov's hero component.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}

$afrigov_layout = $attributes['layout'] ?? 'text';
$afrigov_cover  = 'cover' === $afrigov_layout;
$afrigov_side   = in_array( $afrigov_layout, array( 'image', 'image-first' ), true );
$afrigov_image  = (int) ( $attributes['image']['id'] ?? 0 );

// A layout that needs a picture falls back to text only until it has one.
if ( ( $afrigov_cover || $afrigov_side ) && ! $afrigov_image ) {
	$afrigov_cover = false;
	$afrigov_side  = false;
	$afrigov_layout = 'text';
}

$afrigov_classes = array( 'ag-hero' );
if ( $afrigov_cover ) {
	$afrigov_classes[] = 'ag-hero--cover';
	if ( 'light' === ( $attributes['panel'] ?? 'dark' ) ) {
		$afrigov_classes[] = 'ag-hero--cover-light';
	}
	$afrigov_position = $attributes['position'] ?? 'start';
	if ( 'end' === $afrigov_position || 'top' === $afrigov_position ) {
		$afrigov_classes[] = 'ag-hero--cover-' . $afrigov_position;
	}
} else {
	if ( 'primary' === ( $attributes['colour'] ?? 'primary' ) ) {
		$afrigov_classes[] = 'ag-hero--primary';
	}
	if ( $afrigov_side ) {
		$afrigov_classes[] = 'ag-hero--image';
	}
	if ( 'image-first' === $afrigov_layout ) {
		$afrigov_classes[] = 'ag-hero--image-first';
	}
	if ( 'centred' === $afrigov_layout ) {
		$afrigov_classes[] = 'ag-hero--centred';
	}
}
if ( ! empty( $attributes['tall'] ) ) {
	$afrigov_classes[] = 'ag-hero--tall';
}
$afrigov_heading = empty( $attributes['isPageTitle'] ) ? 'h2' : 'h1';

$afrigov_buttons = '';
foreach ( array( array( 'primary', 'ag-button ag-button--start' ), array( 'secondary', 'ag-button ag-button--secondary' ) ) as $afrigov_button ) {
	$afrigov_label = trim( wp_strip_all_tags( $attributes[ $afrigov_button[0] . 'Label' ] ?? '' ) );
	$afrigov_url   = trim( $attributes[ $afrigov_button[0] . 'Url' ] ?? '' );
	if ( '' === $afrigov_label || '' === $afrigov_url ) {
		continue;
	}
	$afrigov_buttons .= sprintf( '<a class="%s" href="%s">%s</a>', esc_attr( $afrigov_button[1] ), esc_url( $afrigov_url ), esc_html( $afrigov_label ) );
}

// The hero's picture is the one image on the page that is not lazy-loaded: it is seen first.
$afrigov_picture = '';
if ( $afrigov_image ) {
	$afrigov_picture = afrigov_blocks_image(
		$afrigov_image,
		$afrigov_cover ? 'ag-hero__cover' : 'ag-figure__image',
		$afrigov_cover ? '100vw' : '(min-width: 64em) 40vw, 100vw',
		true
	);
}
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => implode( ' ', $afrigov_classes ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php
	if ( $afrigov_cover ) {
		echo $afrigov_picture; // phpcs:ignore WordPress.Security.EscapeOutput -- built by wp_get_attachment_image
	}
	?>
	<div class="ag-container ag-hero__inner">
		<div<?php echo $afrigov_cover ? ' class="ag-hero__panel"' : ''; ?>>
			<<?php echo esc_html( $afrigov_heading ); ?> class="ag-heading-xl ag-hero__title"><?php echo esc_html( $afrigov_title ); ?></<?php echo esc_html( $afrigov_heading ); ?>>
			<?php if ( ! empty( $attributes['lead'] ) ) : ?>
				<p class="ag-lead ag-hero__lead"><?php echo wp_kses( $attributes['lead'], array( 'strong' => array(), 'em' => array() ) ); ?></p>
			<?php endif; ?>
			<?php if ( $afrigov_buttons ) : ?>
				<div class="ag-button-group ag-hero__actions"><?php echo $afrigov_buttons; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></div>
			<?php endif; ?>
			<?php if ( ! empty( $attributes['note'] ) ) : ?>
				<p class="ag-mb-0"><?php echo wp_kses( $attributes['note'], array( 'a' => array( 'href' => true ), 'strong' => array(), 'br' => array() ) ); ?></p>
			<?php endif; ?>
		</div>
		<?php if ( $afrigov_side ) : ?>
			<figure class="ag-figure ag-hero__media"><?php echo $afrigov_picture; // phpcs:ignore WordPress.Security.EscapeOutput ?></figure>
		<?php endif; ?>
	</div>
</div>
