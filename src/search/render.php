<?php
/**
 * A search box. It sends the words to WordPress's own search.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_id    = wp_unique_id( 'ag-search-' );
$afrigov_label = trim( wp_strip_all_tags( $attributes['label'] ?? '' ) );
$afrigov_class = 'ag-search' . ( ! empty( $attributes['large'] ) ? ' ag-search--lg' : '' );
?>
<form <?php echo get_block_wrapper_attributes( array( 'class' => $afrigov_class, 'role' => 'search', 'action' => esc_url( home_url( '/' ) ), 'method' => 'get' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<label class="ag-search__label" for="<?php echo esc_attr( $afrigov_id ); ?>"><?php echo esc_html( '' !== $afrigov_label ? $afrigov_label : __( 'Search this site', 'afrigov-blocks' ) ); ?></label>
	<div class="ag-search__row">
		<input class="ag-search__input" type="search" id="<?php echo esc_attr( $afrigov_id ); ?>" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" />
		<button class="ag-search__button" type="submit"><span class="ag-search__icon" aria-hidden="true"></span><?php esc_html_e( 'Search', 'afrigov-blocks' ); ?></button>
	</div>
</form>
