<?php
/**
 * Single forum board: lists its topics and the "start a topic" form.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$relicquest_board_id = get_the_ID();

	relicquest_hero(
		array(
			'eyebrow'  => __( 'Forum board', 'relicquest' ),
			'title'    => get_the_title(),
			'subtitle' => get_the_excerpt(),
			'small'    => true,
		)
	);

	$relicquest_topics = relicquest_board_topics( $relicquest_board_id );
	?>

	<section class="section">
		<div class="container">
			<p class="breadcrumb">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'relicquest' ); ?></a> /
				<a href="<?php echo esc_url( home_url( '/forum/' ) ); ?>"><?php esc_html_e( 'Forums', 'relicquest' ); ?></a> /
				<span><?php the_title(); ?></span>
			</p>

			<div class="card board-section">
				<div class="section-head">
					<h2><?php esc_html_e( 'Topics', 'relicquest' ); ?></h2>
					<span style="font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;opacity:.8;"><?php esc_html_e( 'Replies / Last reply', 'relicquest' ); ?></span>
				</div>

				<?php if ( $relicquest_topics->have_posts() ) : ?>
					<ul class="topic-list">
						<?php
						while ( $relicquest_topics->have_posts() ) :
							$relicquest_topics->the_post();
							$relicquest_replies = (int) get_comments_number();
							?>
							<li class="topic-row">
								<div class="topic-info">
									<a class="topic-title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
									<p class="topic-meta">
										<?php
										printf(
											/* translators: 1: author, 2: date */
											esc_html__( 'by %1$s · %2$s', 'relicquest' ),
											esc_html( get_the_author() ),
											esc_html( get_the_date() )
										);
										?>
									</p>
								</div>
								<div class="topic-stats">
									<strong><?php echo esc_html( number_format_i18n( $relicquest_replies ) ); ?></strong>
									<span><?php echo esc_html( _n( 'reply', 'replies', $relicquest_replies, 'relicquest' ) ); ?></span>
								</div>
							</li>
						<?php endwhile; ?>
					</ul>
					<?php wp_reset_postdata(); ?>
				<?php else : ?>
					<p style="padding:1.5rem;color:var(--sepia-light);"><?php esc_html_e( 'No topics yet — be the first to start one.', 'relicquest' ); ?></p>
				<?php endif; ?>
			</div>

			<?php relicquest_new_topic_form( $relicquest_board_id ); ?>
		</div>
	</section>

	<?php
endwhile;

get_footer();
