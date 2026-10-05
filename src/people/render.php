<?php
/**
 * The list. Each item is rendered by its own block; this wraps them.
 *
 * @package AfrigovBlocks
 * @var array  $attributes The block's fields.
 * @var string $content    The rendered items.
 */

defined( 'ABSPATH' ) || exit;

if ( '' === trim( $content ) ) {
	return;
}
$afrigov_columns = array( '2' => 'ag-people--2', '3' => 'ag-people--3', '4' => 'ag-people--4', '6' => 'ag-people--6', 'rows' => 'ag-people--rows' );
$afrigov_classes = trim( 'ag-people ' . ( $afrigov_columns[ $attributes['columns'] ?? 'auto' ] ?? '' ) );
?>
<ul <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_classes ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- each item escapes its own fields ?>
</ul>
