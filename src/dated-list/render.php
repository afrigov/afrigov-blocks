<?php
/**
 * The dated list.
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
<ul <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-list' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- each item escapes its own fields ?>
</ul>
