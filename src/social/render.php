<?php
/**
 * Social links, each with its icon and its name, so it reads without the icon.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_links = array_filter( (array) ( $attributes['links'] ?? array() ), fn( $u ) => is_string( $u ) && '' !== trim( $u ) );
if ( ! $afrigov_links ) {
	return;
}
static $afrigov_icons = null;
if ( null === $afrigov_icons ) {
	$afrigov_icons = json_decode( file_get_contents( dirname( __DIR__, 2 ) . '/assets/social-icons.json' ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions -- a local file in the plugin
}
?>
<ul <?php echo get_block_wrapper_attributes( array( 'class' => 'ag-social' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php foreach ( array( 'Facebook', 'X', 'Instagram', 'LinkedIn', 'YouTube', 'WhatsApp' ) as $afrigov_name ) : ?>
		<?php
		if ( empty( $afrigov_links[ $afrigov_name ] ) ) {
			continue;
		}
		?>
		<li><a class="ag-social__link" href="<?php echo esc_url( $afrigov_links[ $afrigov_name ] ); ?>"><svg class="ag-social__icon" aria-hidden="true" viewBox="0 0 24 24"><path d="<?php echo esc_attr( $afrigov_icons[ $afrigov_name ] ?? '' ); ?>"/></svg><?php echo esc_html( $afrigov_name ); ?></a></li>
	<?php endforeach; ?>
</ul>
