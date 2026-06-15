<?php
/**
 * Single guide / post / discovery / review.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	$relicquest_label = 'guide' === get_post_type() ? __( 'Field Guide', 'relicquest' ) : get_post_type_object( get_post_type() )->labels->singular_name;
	?>

	<section class="hero photo" style="<?php echo has_post_thumbnail() ? 'background-image:url(' . esc_url( get_the_post_thumbnail_url( get_the_ID(), 'full' ) ) . ');' : ''; ?>text-align:left;padding-top:4rem;padding-bottom:4rem;">
		<div class="container">
			<p class="eyebrow"><?php echo esc_html( $relicquest_label ); ?></p>
			<h1 style="max-width:48rem;"><?php the_title(); ?></h1>
			<p class="lead" style="margin-left:0;font-size:.95rem;">
				<?php
				printf(
					/* translators: 1: author, 2: date, 3: reading note */
					esc_html__( 'By %1$s · %2$s', 'relicquest' ),
					esc_html( get_the_author() ),
					esc_html( get_the_date() )
				);
				?>
			</p>
		</div>
	</section>

	<div class="container section">
		<div class="article-layout">
			<article <?php post_class(); ?>>
				<p class="breadcrumb">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'relicquest' ); ?></a> /
					<?php
					$relicquest_archive = get_post_type_archive_link( get_post_type() );
					if ( $relicquest_archive ) :
						?>
						<a href="<?php echo esc_url( $relicquest_archive ); ?>"><?php echo esc_html( get_post_type_object( get_post_type() )->labels->name ); ?></a> /
					<?php endif; ?>
					<span><?php the_title(); ?></span>
				</p>

				<div class="entry-content">
					<?php the_content(); ?>
				</div>

				<?php relicquest_share_links(); ?>

				<?php
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}
				?>
			</article>

			<?php get_sidebar(); ?>
		</div>
	</div>

	<?php
endwhile;

get_footer();
