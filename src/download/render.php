<?php
/**
 * One document: its name as the link, then its type and size, read from the file.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_id = (int) ( $attributes['file']['id'] ?? 0 );
$afrigov_url = $afrigov_id ? wp_get_attachment_url( $afrigov_id ) : '';
if ( ! $afrigov_url ) {
	return;
}
$afrigov_label = trim( wp_strip_all_tags( $attributes['label'] ?? '' ) );
if ( '' === $afrigov_label ) {
	$afrigov_label = get_the_title( $afrigov_id );
}

// The type in words people know, and the size, so they can tell how long it will take on a phone.
$afrigov_types = array(
	'pdf'  => 'PDF',
	'doc'  => 'Word document',
	'docx' => 'Word document',
	'xls'  => 'Excel spreadsheet',
	'xlsx' => 'Excel spreadsheet',
	'csv'  => 'CSV',
	'ppt'  => 'PowerPoint',
	'pptx' => 'PowerPoint',
	'odt'  => 'OpenDocument text',
	'zip'  => 'ZIP',
);
$afrigov_ext  = strtolower( pathinfo( wp_parse_url( $afrigov_url, PHP_URL_PATH ), PATHINFO_EXTENSION ) );
$afrigov_type = $afrigov_types[ $afrigov_ext ] ?? strtoupper( $afrigov_ext );
$afrigov_path = get_attached_file( $afrigov_id );
$afrigov_size = ( $afrigov_path && file_exists( $afrigov_path ) ) ? afrigov_blocks_size( filesize( $afrigov_path ) ) : '';
$afrigov_meta = implode( ', ', array_filter( array( $afrigov_type, $afrigov_size ) ) );
?>
<li class="ag-list__item">
	<a class="ag-download ag-list__link" href="<?php echo esc_url( $afrigov_url ); ?>"><?php echo esc_html( $afrigov_label ); ?><?php if ( $afrigov_meta ) : ?> <span class="ag-download__meta">(<?php echo esc_html( $afrigov_meta ); ?>)</span><?php endif; ?></a>
	<?php if ( ! empty( $attributes['note'] ) ) : ?>
		<p class="ag-list__text"><?php echo esc_html( wp_strip_all_tags( $attributes['note'] ) ); ?></p>
	<?php endif; ?>
</li>
