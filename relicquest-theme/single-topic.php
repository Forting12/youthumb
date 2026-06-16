<?php
/**
 * Single forum topic: the opening post plus member replies (comments).
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$relicquest_board = relicquest_topic_board( get_the_ID() );

	relicquest_hero(
		array(
			'eyebrow' => __( 'Forum topic', 'relicquest' ),
			'title'   => get_the_title(),
			'small'   => true,
		)
	);
	?>

	<section class="section">
		<div class="container container-narrow">
			<p class="breadcrumb">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'relicquest' ); ?></a> /
				<a href="<?php echo esc_url( home_url( '/forum/' ) ); ?>"><?php esc_html_e( 'Forums', 'relicquest' ); ?></a> /
				<?php if ( $relicquest_board ) : ?>
					<a href="<?php echo esc_url( get_permalink( $relicquest_board ) ); ?>"><?php echo esc_html( get_the_title( $relicquest_board ) ); ?></a> /
				<?php endif; ?>
				<span><?php the_title(); ?></span>
			</p>

			<article <?php post_class( 'card forum-post op' ); ?>>
				<div class="card-body">
					<div class="forum-post-head">
						<span class="avatar"><?php echo esc_html( strtoupper( substr( get_the_author(), 0, 1 ) ) ); ?></span>
						<div>
							<strong class="forum-author"><?php the_author(); ?></strong>
							<span class="forum-date"><?php echo esc_html( get_the_date() . ' · ' . get_the_time() ); ?></span>
						</div>
						<span class="forum-badge"><?php esc_html_e( 'Original post', 'relicquest' ); ?></span>
					</div>
					<div class="entry-content"><?php the_content(); ?></div>
					<?php if ( has_post_thumbnail() ) : ?>
						<a class="forum-attachment" href="<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'full' ) ); ?>" target="_blank" rel="noopener">
							<?php the_post_thumbnail( 'relicquest-card', array( 'loading' => 'lazy' ) ); ?>
						</a>
					<?php endif; ?>
				</div>
			</article>

			<?php comments_template(); ?>
		</div>
	</section>

	<?php
endwhile;

get_footer();
