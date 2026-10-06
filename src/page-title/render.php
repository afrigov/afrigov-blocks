<?php
/**
 * The page's title, with an optional line above and a sentence under it. It is the page's one
 * main heading; afrigovPress leaves out its own title when a page starts with this block.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( '' === $afrigov_title ) {
	$afrigov_title = get_the_title();
}
$afrigov_caption = trim( wp_strip_all_tags( $attributes['caption'] ?? '' ) );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-prose' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php if ( $afrigov_caption ) : ?>
		<p class="ag-caption"><?php echo esc_html( $afrigov_caption ); ?></p>
	<?php endif; ?>
	<h1 class="ag-heading-xl"><?php echo esc_html( $afrigov_title ); ?></h1>
	<?php if ( ! empty( $attributes['lead'] ) ) : ?>
		<p class="ag-lead"><?php echo wp_kses( $attributes['lead'], array( 'a' => array( 'href' => true ) ) ); ?></p>
	<?php endif; ?>
</div>
