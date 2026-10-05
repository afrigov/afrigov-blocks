<?php
/**
 * An alert. A problem is announced at once (role="alert"); the others politely (role="status").
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_kind  = in_array( $attributes['kind'] ?? 'info', array( 'success', 'warning', 'error' ), true ) ? $attributes['kind'] : 'info';
$afrigov_class = 'ag-alert' . ( 'info' !== $afrigov_kind ? ' ag-alert--' . $afrigov_kind : '' );
$afrigov_tag   = afrigov_blocks_heading( $attributes['headingLevel'] ?? 2, 2 );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_class, 'role' => 'error' === $afrigov_kind ? 'alert' : 'status' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<<?php echo esc_html( $afrigov_tag ); ?> class="ag-alert__title"><?php echo esc_html( $afrigov_title ); ?></<?php echo esc_html( $afrigov_tag ); ?>>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p><?php echo wp_kses( $attributes['text'], array( 'strong' => array(), 'a' => array( 'href' => true ) ) ); ?></p>
	<?php endif; ?>
</div>
