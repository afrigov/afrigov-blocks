<?php
/**
 * One accordion section: a native details element, so it opens with no script.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    What opens under the question.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_summary = trim( wp_strip_all_tags( $attributes['summary'] ?? '' ) );
if ( '' === $afrigov_summary ) {
	return;
}
?>
<details class="ag-accordion__item">
	<summary class="ag-accordion__summary"><?php echo esc_html( $afrigov_summary ); ?></summary>
	<div class="ag-accordion__body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- core blocks ?></div>
</details>
