<?php
/**
 * Inset text.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

if ( '' === trim( wp_strip_all_tags( $attributes['text'] ?? '' ) ) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-inset' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<p><?php echo wp_kses( $attributes['text'], array( 'strong' => array(), 'a' => array( 'href' => true ) ) ); ?></p>
</div>
