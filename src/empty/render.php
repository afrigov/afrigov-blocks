<?php
/**
 * An empty state.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_label = trim( wp_strip_all_tags( $attributes['buttonLabel'] ?? '' ) );
$afrigov_url   = trim( $attributes['buttonUrl'] ?? '' );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-empty' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<h2 class="ag-empty__title"><?php echo esc_html( $afrigov_title ); ?></h2>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p><?php echo wp_kses( $attributes['text'], array( 'a' => array( 'href' => true ) ) ); ?></p>
	<?php endif; ?>
	<?php if ( $afrigov_label && $afrigov_url ) : ?>
		<a class="ag-button ag-button--secondary" href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_label ); ?></a>
	<?php endif; ?>
</div>
