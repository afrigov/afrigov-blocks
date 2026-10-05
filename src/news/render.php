<?php
/**
 * The newest posts as afrigov's dated list, newest first.
 *
 * @package AfrigovBlocks
 * @var array $attributes The block's fields.
 */

defined( 'ABSPATH' ) || exit;

$afrigov_args = array(
	'post_type'           => 'post',
	'post_status'         => 'publish',
	'posts_per_page'      => max( 1, min( 10, (int) ( $attributes['count'] ?? 5 ) ) ),
	'ignore_sticky_posts' => true,
	'no_found_rows'       => true,
);
if ( ! empty( $attributes['category'] ) ) {
	$afrigov_args['cat'] = (int) $attributes['category'];
}
$afrigov_posts = get_posts( $afrigov_args );
if ( ! $afrigov_posts ) {
	if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		echo '<p>' . esc_html__( 'No posts yet. The newest will show here.', 'afrigov-blocks' ) . '</p>';
	}
	return;
}
$afrigov_all  = trim( $attributes['allLabel'] ?? '' );
$afrigov_page = (int) get_option( 'page_for_posts' );
$afrigov_href = ! empty( $attributes['category'] ) ? get_category_link( (int) $attributes['category'] ) : ( $afrigov_page ? get_permalink( $afrigov_page ) : home_url( '/' ) );
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<ul class="ag-list">
		<?php foreach ( $afrigov_posts as $afrigov_post ) : ?>
			<li class="ag-list__item">
				<a class="ag-list__link" href="<?php echo esc_url( get_permalink( $afrigov_post ) ); ?>"><?php echo esc_html( get_the_title( $afrigov_post ) ); ?></a>
				<span class="ag-list__meta"><time datetime="<?php echo esc_attr( get_the_date( 'Y-m-d', $afrigov_post ) ); ?>"><?php echo esc_html( get_the_date( 'j F Y', $afrigov_post ) ); ?></time></span>
				<?php if ( ! empty( $attributes['excerpts'] ) && has_excerpt( $afrigov_post ) ) : ?>
					<p class="ag-list__text"><?php echo esc_html( get_the_excerpt( $afrigov_post ) ); ?></p>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ul>
	<?php if ( $afrigov_all ) : ?>
		<p><a href="<?php echo esc_url( $afrigov_href ); ?>"><?php echo esc_html( $afrigov_all ); ?></a></p>
	<?php endif; ?>
</div>
