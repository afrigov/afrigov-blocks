<?php
/**
 * One step.
 *
 * @package AfrigovBlocks
 * @var array    $attributes The block's fields.
 * @var WP_Block $block      For the list's heading level.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_tag = afrigov_blocks_heading( $block->context['afrigov/stepHeading'] ?? 3 );
?>
<li class="ag-steps__item">
	<<?php echo esc_html( $afrigov_tag ); ?> class="ag-steps__title"><?php echo esc_html( $afrigov_title ); ?></<?php echo esc_html( $afrigov_tag ); ?>>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p><?php echo wp_kses( $attributes['text'], array( 'strong' => array(), 'a' => array( 'href' => true ) ) ); ?></p>
	<?php endif; ?>
</li>
