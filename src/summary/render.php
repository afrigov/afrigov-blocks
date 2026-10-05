<?php
/**
 * The list. Each item is rendered by its own block; this wraps them.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The rendered items.
 */

defined( 'ABSPATH' ) || exit;

if ( '' === trim( $content ) ) {
	return;
}
?>
<dl <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-summary' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- each item escapes its own fields ?>
</dl>
