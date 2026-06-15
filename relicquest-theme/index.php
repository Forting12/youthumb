<?php
/**
 * Fallback template (blog index / search results / anything without a more
 * specific template).
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

relicquest_hero(
	array(
		'title' => is_search() ? sprintf( /* translators: search query */ esc_html__( 'Search: %s', 'relicquest' ), get_search_query() ) : ( single_post_title( '', false ) ?: get_bloginfo( 'name' ) ),
		'small' => true,
	)
);
?>
<section class="section">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="grid grid-3">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<a class="card" href="<?php the_permalink(); ?>">
						<?php relicquest_photo( array( 'id' => get_the_ID(), 'class' => 'card-img' ) ); ?>
						<div class="card-body">
							<h3><?php the_title(); ?></h3>
							<p class="flex-grow" style="font-size:.875rem;"><?php echo esc_html( get_the_excerpt() ); ?></p>
							<p class="meta mt-4"><?php echo esc_html( get_the_date() ); ?></p>
						</div>
					</a>
				<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p class="text-center"><?php esc_html_e( 'Nothing found.', 'relicquest' ); ?></p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
