<?php
/**
 * Key figures: a description list, each figure with what it counts.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The rendered figures.
 */

defined( 'ABSPATH' ) || exit;

if ( '' === trim( $content ) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<dl class="ag-stats"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- each figure escapes its own fields ?></dl>
	<?php if ( ! empty( $attributes['asAt'] ) ) : ?>
		<p class="ag-caption"><?php echo esc_html( wp_strip_all_tags( $attributes['asAt'] ) ); ?></p>
	<?php endif; ?>
</div>
