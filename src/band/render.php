<?php
/**
 * A band: a section across the page in one colour.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The blocks inside.
 */

defined( 'ABSPATH' ) || exit;

if ( '' === trim( $content ) ) {
	return;
}
$afrigov_colour = in_array( $attributes['colour'] ?? 'tint', array( 'tint', 'primary', 'dark', 'accent' ), true ) ? $attributes['colour'] : 'tint';
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-band ag-band--' . $afrigov_colour ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<div class="ag-container"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- blocks render themselves ?></div>
</div>
