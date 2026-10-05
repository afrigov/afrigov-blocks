<?php
/**
 * A photo gallery. The caption is the description: it says what the photo shows.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_images = array_filter( (array) ( $attributes['images'] ?? array() ), fn( $i ) => ! empty( $i['id'] ) && wp_attachment_is_image( (int) $i['id'] ) );
if ( ! $afrigov_images ) {
	return;
}
$afrigov_columns = array( '2' => 'ag-gallery--2', '4' => 'ag-gallery--4' );
$afrigov_class   = trim( 'ag-gallery ' . ( $afrigov_columns[ $attributes['columns'] ?? 'auto' ] ?? '' ) );
$afrigov_link    = ! empty( $attributes['linkFull'] );
?>
<ul <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_class ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php foreach ( $afrigov_images as $afrigov_image ) : ?>
		<?php
		$afrigov_id      = (int) $afrigov_image['id'];
		$afrigov_caption = trim( wp_strip_all_tags( $afrigov_image['caption'] ?? '' ) );
		$afrigov_cap_id  = wp_unique_id( 'ag-photo-' );
		$afrigov_img     = afrigov_blocks_image( $afrigov_id, 'ag-figure__image', '(min-width: 48em) 33vw, 100vw' );
		?>
		<li>
			<figure class="ag-figure ag-figure--3-2">
				<?php if ( $afrigov_link ) : ?>
					<a href="<?php echo esc_url( wp_get_attachment_url( $afrigov_id ) ); ?>"<?php echo $afrigov_caption ? ' aria-labelledby="' . esc_attr( $afrigov_cap_id ) . '"' : ''; ?>><?php echo $afrigov_img; // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
				<?php else : ?>
					<?php echo $afrigov_img; // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php endif; ?>
				<?php if ( $afrigov_caption ) : ?>
					<figcaption class="ag-figure__caption" id="<?php echo esc_attr( $afrigov_cap_id ); ?>"><?php echo esc_html( $afrigov_caption ); ?></figcaption>
				<?php endif; ?>
			</figure>
		</li>
	<?php endforeach; ?>
</ul>
