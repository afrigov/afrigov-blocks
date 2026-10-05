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

$afrigov_classes = array( 'ag-hero' );
if ( 'primary' === ( $attributes['colour'] ?? 'primary' ) ) {
	$afrigov_classes[] = 'ag-hero--primary';
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
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => implode( ' ', $afrigov_classes ) ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<div class="ag-container ag-hero__inner">
		<div>
			<<?php echo esc_html( $afrigov_heading ); ?> class="ag-heading-xl ag-hero__title"><?php echo esc_html( $afrigov_title ); ?></<?php echo esc_html( $afrigov_heading ); ?>>
			<?php if ( ! empty( $attributes['lead'] ) ) : ?>
				<p class="ag-lead ag-hero__lead"><?php echo wp_kses( $attributes['lead'], array( 'strong' => array(), 'em' => array() ) ); ?></p>
			<?php endif; ?>
			<?php if ( $afrigov_buttons ) : ?>
				<div class="ag-button-group ag-hero__actions"><?php echo $afrigov_buttons; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped above ?></div>
			<?php endif; ?>
		</div>
	</div>
</div>
