<?php
/**
 * Template Name: Forum
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

/**
 * Build the section -> boards structure from real CPT data, or demo data.
 *
 * @return array
 */
function relicquest_forum_sections() {
	if ( ! relicquest_has_posts( 'board' ) ) {
		return relicquest_demo_boards();
	}

	$sections = array();
	$terms    = get_terms( array( 'taxonomy' => 'board_section', 'hide_empty' => true ) );

	foreach ( $terms as $term ) {
		$query  = new WP_Query(
			array(
				'post_type'      => 'board',
				'posts_per_page' => -1,
				'no_found_rows'  => true,
				'tax_query'      => array(
					array(
						'taxonomy' => 'board_section',
						'field'    => 'term_id',
						'terms'    => $term->term_id,
					),
				),
			)
		);
		$boards = array();
		foreach ( $query->posts as $post ) {
			$last = relicquest_board_last_post( $post->ID );
			// Live topic/post counts, falling back to the seeded meta values.
			$topics = relicquest_board_topic_count( $post->ID );
			$posts  = relicquest_board_post_count( $post->ID );
			$boards[] = array(
				'title'     => get_the_title( $post ),
				'desc'      => get_the_excerpt( $post ),
				'url'       => get_permalink( $post ),
				'topics'    => $topics ? $topics : (int) get_post_meta( $post->ID, '_rq_topics', true ),
				'posts'     => $posts ? $posts : (int) get_post_meta( $post->ID, '_rq_posts', true ),
				'last'      => $last['title'] ? $last['title'] : get_post_meta( $post->ID, '_rq_last_post', true ),
				'last_meta' => $last['meta'] ? $last['meta'] : get_post_meta( $post->ID, '_rq_last_meta', true ),
			);
		}
		wp_reset_postdata();
		if ( $boards ) {
			$sections[] = array( 'section' => $term->name, 'boards' => $boards );
		}
	}

	return $sections ? $sections : relicquest_demo_boards();
}

relicquest_hero(
	array(
		'eyebrow'  => __( 'Community', 'relicquest' ),
		'title'    => __( 'Treasure Hunting Forum', 'relicquest' ),
		'subtitle' => __( 'Join the conversation — ask questions, share your finds and learn from hunters near you.', 'relicquest' ),
		'small'    => true,
	)
);

$relicquest_sections = relicquest_forum_sections();

// First board with a real URL, used by the "New topic" button.
$relicquest_first_board = '';
foreach ( $relicquest_sections as $relicquest_section ) {
	foreach ( $relicquest_section['boards'] as $relicquest_b ) {
		if ( ! empty( $relicquest_b['url'] ) ) {
			$relicquest_first_board = $relicquest_b['url'];
			break 2;
		}
	}
}
?>

<section class="section">
	<div class="container">
		<div class="flex items-center justify-between mb-8" style="flex-wrap:wrap;gap:1rem;">
			<p class="breadcrumb" style="margin:0;">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'relicquest' ); ?></a> / <?php esc_html_e( 'Forums', 'relicquest' ); ?>
			</p>
			<div class="forum-toolbar">
				<input type="search" id="forum-search" placeholder="<?php esc_attr_e( 'Search forums…', 'relicquest' ); ?>" />
					<?php if ( is_user_logged_in() && $relicquest_first_board ) : ?>
						<a class="btn btn-primary btn-sm" href="<?php echo esc_url( $relicquest_first_board ); ?>#new-topic"><?php esc_html_e( 'New topic', 'relicquest' ); ?></a>
					<?php elseif ( ! is_user_logged_in() ) : ?>
						<a class="btn btn-primary btn-sm" href="<?php echo esc_url( wp_login_url( home_url( '/forum/' ) ) ); ?>"><?php esc_html_e( 'Sign in to post', 'relicquest' ); ?></a>
					<?php endif; ?>
			</div>
		</div>

		<div id="forum-sections">
			<?php foreach ( $relicquest_sections as $section ) : ?>
				<div class="card board-section">
					<div class="section-head">
						<h2><?php echo esc_html( $section['section'] ); ?></h2>
						<span style="font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;opacity:.8;"><?php esc_html_e( 'Topics / Posts', 'relicquest' ); ?></span>
					</div>
					<ul class="board-list">
						<?php foreach ( $section['boards'] as $board ) : ?>
							<li class="forum-board" data-name="<?php echo esc_attr( strtolower( $board['title'] . ' ' . $board['desc'] ) ); ?>">
								<div class="coin" style="width:2.5rem;height:2.5rem;"></div>
								<div class="board-info">
									<a class="board-title" href="<?php echo esc_url( isset( $board['url'] ) ? $board['url'] : home_url( '/forum/' ) ); ?>"><?php echo esc_html( $board['title'] ); ?></a>
									<p><?php echo esc_html( $board['desc'] ); ?></p>
								</div>
								<div class="board-stats">
									<strong><?php echo esc_html( number_format_i18n( $board['topics'] ) ); ?></strong>
									<span><?php echo esc_html( number_format_i18n( $board['posts'] ) ); ?> <?php esc_html_e( 'posts', 'relicquest' ); ?></span>
								</div>
								<div class="board-last">
									<?php if ( $board['last'] ) : ?>
										<div class="t"><?php echo esc_html( $board['last'] ); ?></div>
										<div class="s"><?php echo esc_html( $board['last_meta'] ); ?></div>
									<?php endif; ?>
								</div>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endforeach; ?>
		</div>
		<p id="forum-empty" class="text-center hidden" style="color:var(--sepia-light);padding:3rem 0;"></p>
	</div>
</section>

<?php
get_footer();
