<?php
/**
 * Default page template.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	relicquest_hero(
		array(
			'title' => get_the_title(),
			'small' => true,
		)
	);
	?>
	<section class="section">
		<div class="container" style="max-width:48rem;">
			<div class="entry-content">
				<?php the_content(); ?>
				<?php
				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'relicquest' ),
						'after'  => '</div>',
					)
				);
				?>
			</div>
		</div>
	</section>
	<?php
endwhile;

get_footer();
