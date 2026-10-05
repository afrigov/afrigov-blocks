<?php
/**
 * One summary row.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_key = trim( wp_strip_all_tags( $attributes['key'] ?? '' ) );
if ( '' === $afrigov_key || '' === trim( wp_strip_all_tags( $attributes['value'] ?? '' ) ) ) {
	return;
}
?>
<div class="ag-summary__row">
	<dt class="ag-summary__key"><?php echo esc_html( $afrigov_key ); ?></dt>
	<dd class="ag-summary__value"><?php echo wp_kses( $attributes['value'], array( 'strong' => array(), 'a' => array( 'href' => true ) ) ); ?></dd>
</div>
