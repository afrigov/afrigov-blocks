<?php
/**
 * A panel: a done message.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	return;
}
$afrigov_body = trim( wp_strip_all_tags( $attributes['body'] ?? '' ) );
$afrigov_ref  = trim( wp_strip_all_tags( $attributes['reference'] ?? '' ) );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-panel' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<h2 class="ag-panel__title"><?php echo esc_html( $afrigov_title ); ?></h2>
	<?php if ( $afrigov_body || $afrigov_ref ) : ?>
		<p class="ag-panel__body"><?php echo esc_html( $afrigov_body ); ?><?php if ( $afrigov_ref ) : ?> <span class="ag-panel__ref"><?php echo esc_html( $afrigov_ref ); ?></span><?php endif; ?></p>
	<?php endif; ?>
</div>
