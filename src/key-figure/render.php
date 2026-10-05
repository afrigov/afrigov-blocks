<?php
/**
 * One key figure.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_value = trim( wp_strip_all_tags( $attributes['value'] ?? '' ) );
$afrigov_label = trim( wp_strip_all_tags( $attributes['label'] ?? '' ) );
if ( '' === $afrigov_value || '' === $afrigov_label ) {
	return;
}
?>
<div class="ag-stats__item">
	<dt class="ag-stats__label"><?php echo esc_html( $afrigov_label ); ?></dt>
	<dd class="ag-stats__value"><?php echo esc_html( $afrigov_value ); ?></dd>
</div>
