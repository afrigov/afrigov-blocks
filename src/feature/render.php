<?php
/**
 * A feature: a picture beside a title, a sentence, points and a link.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_image  = (int) ( $attributes['image']['id'] ?? 0 );
$afrigov_points = array_filter( array_map( fn( $p ) => trim( wp_strip_all_tags( (string) $p ) ), (array) ( $attributes['points'] ?? array() ) ) );
$afrigov_label  = trim( wp_strip_all_tags( $attributes['linkLabel'] ?? '' ) );
$afrigov_url    = trim( $attributes['linkUrl'] ?? '' );
$afrigov_class  = 'ag-feature' . ( ! empty( $attributes['reverse'] ) ? ' ag-feature--reverse' : '' );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_class ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php if ( $afrigov_image ) : ?>
		<figure class="ag-figure ag-feature__media"><?php echo afrigov_blocks_image( $afrigov_image, 'ag-figure__image', '(min-width: 48em) 50vw, 100vw' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></figure>
	<?php endif; ?>
	<div class="ag-feature__body">
		<h2 class="ag-feature__title"><?php echo esc_html( $afrigov_title ); ?></h2>
		<?php if ( ! empty( $attributes['text'] ) ) : ?>
			<p><?php echo wp_kses( $attributes['text'], array( 'strong' => array(), 'a' => array( 'href' => true ) ) ); ?></p>
		<?php endif; ?>
		<?php if ( $afrigov_points ) : ?>
			<ul class="ag-feature__list">
				<?php foreach ( $afrigov_points as $afrigov_point ) : ?>
					<li><?php echo esc_html( $afrigov_point ); ?></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
		<?php if ( $afrigov_label && $afrigov_url ) : ?>
			<p><a href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_label ); ?></a></p>
		<?php endif; ?>
	</div>
</div>
