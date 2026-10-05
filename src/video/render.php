<?php
/**
 * A video that loads only when pressed. Without the script, the poster is a link to the video.
 * YouTube plays from youtube-nocookie.com and Vimeo with do-not-track, so nobody is followed
 * for loading the page.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The transcript.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_embed = afrigov_blocks_video_embed( $attributes['url'] ?? '' );
$afrigov_title = trim( wp_strip_all_tags( $attributes['title'] ?? '' ) );
if ( ! $afrigov_embed || '' === $afrigov_title ) {
	return;
}
$afrigov_poster = (int) ( $attributes['poster']['id'] ?? 0 );
$afrigov_img    = $afrigov_poster
	? afrigov_blocks_image( $afrigov_poster, '', '(min-width: 48em) 40rem, 100vw' )
	: '<img src="' . esc_attr( "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23c7d6e3'/%3E%3C/svg%3E" ) . '" alt="" width="1280" height="720" loading="lazy" />';
$afrigov_length = trim( wp_strip_all_tags( $attributes['length'] ?? '' ) );
$afrigov_note   = trim( wp_strip_all_tags( $attributes['caption'] ?? '' ) );
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<figure class="ag-video">
		<a class="ag-video__poster" href="<?php echo esc_url( $attributes['url'] ); ?>" data-ag-video="<?php echo esc_url( $afrigov_embed ); ?>" data-ag-video-title="<?php echo esc_attr( $afrigov_title ); ?>">
			<?php echo $afrigov_img; // phpcs:ignore WordPress.Security.EscapeOutput -- built by wp_get_attachment_image or fixed ?>
			<span class="ag-video__play" aria-hidden="true"></span>
			<span class="ag-video__label"><?php echo esc_html( sprintf( /* translators: %s: video title */ __( 'Play video: %s', 'afrigov-blocks' ), $afrigov_title ) ); ?><?php if ( $afrigov_length ) : ?><span class="ag-video__length"><?php echo esc_html( $afrigov_length ); ?></span><?php endif; ?></span>
		</a>
		<?php if ( $afrigov_note ) : ?>
			<figcaption class="ag-video__caption"><?php echo esc_html( $afrigov_note ); ?></figcaption>
		<?php endif; ?>
	</figure>
	<?php if ( '' !== trim( wp_strip_all_tags( $content ) ) ) : ?>
		<details class="ag-details">
			<summary class="ag-details__summary"><?php esc_html_e( 'Read the transcript', 'afrigov-blocks' ); ?></summary>
			<div class="ag-details__body"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- core paragraphs ?></div>
		</details>
	<?php endif; ?>
</div>
