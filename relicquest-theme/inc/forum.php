<?php
/**
 * Interactive forum engine.
 *
 * Turns the "board" custom post type into real discussion boards: logged-in
 * members start topics (the "topic" CPT) and reply with native WordPress
 * comments. No external plugin or API is required.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Topics that belong to a board, newest activity first.
 *
 * @param int   $board_id Board post ID.
 * @param array $args     Extra WP_Query args.
 * @return WP_Query
 */
function relicquest_board_topics( $board_id, $args = array() ) {
	return new WP_Query(
		wp_parse_args(
			$args,
			array(
				'post_type'      => 'topic',
				'post_status'    => 'publish',
				'posts_per_page' => 20,
				'orderby'        => 'modified',
				'order'          => 'DESC',
				'meta_key'       => '_rq_board',
				'meta_value'     => (string) $board_id,
			)
		)
	);
}

/**
 * Number of topics in a board.
 *
 * @param int $board_id Board post ID.
 * @return int
 */
function relicquest_board_topic_count( $board_id ) {
	$ids = get_posts(
		array(
			'post_type'      => 'topic',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'no_found_rows'  => true,
			'meta_key'       => '_rq_board',
			'meta_value'     => (string) $board_id,
		)
	);
	return count( $ids );
}

/**
 * Number of posts in a board (opening topics + every reply).
 *
 * @param int $board_id Board post ID.
 * @return int
 */
function relicquest_board_post_count( $board_id ) {
	$ids   = get_posts(
		array(
			'post_type'      => 'topic',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'no_found_rows'  => true,
			'meta_key'       => '_rq_board',
			'meta_value'     => (string) $board_id,
		)
	);
	$count = count( $ids );
	foreach ( $ids as $id ) {
		$count += (int) get_comments_number( $id );
	}
	return $count;
}

/**
 * "Last post" summary for a board.
 *
 * @param int $board_id Board post ID.
 * @return array { title, meta } — empty strings when the board has no topics.
 */
function relicquest_board_last_post( $board_id ) {
	$latest = relicquest_board_topics( $board_id, array( 'posts_per_page' => 1 ) );
	if ( ! $latest->have_posts() ) {
		return array( 'title' => '', 'meta' => '' );
	}
	$post = $latest->posts[0];
	wp_reset_postdata();
	return array(
		'title' => get_the_title( $post ),
		'meta'  => sprintf(
			/* translators: 1: author name, 2: human time diff */
			__( '%1$s · %2$s ago', 'relicquest' ),
			get_the_author_meta( 'display_name', $post->post_author ),
			human_time_diff( get_post_modified_time( 'U', true, $post ), current_time( 'timestamp', true ) )
		),
	);
}

/**
 * The board a topic belongs to.
 *
 * @param int $topic_id Topic post ID.
 * @return WP_Post|null
 */
function relicquest_topic_board( $topic_id ) {
	$board_id = (int) get_post_meta( $topic_id, '_rq_board', true );
	return $board_id ? get_post( $board_id ) : null;
}

/**
 * Render the "start a topic" form, or a sign-in prompt for guests.
 *
 * @param int $board_id Board post ID.
 */
function relicquest_new_topic_form( $board_id ) {
	if ( ! is_user_logged_in() ) {
		printf(
			'<div class="card forum-signin"><div class="card-body"><p>%1$s</p><a class="btn btn-gold btn-sm" href="%2$s">%3$s</a></div></div>',
			esc_html__( 'Sign in to start a new topic and join the discussion.', 'relicquest' ),
			esc_url( wp_login_url( get_permalink( $board_id ) ) ),
			esc_html__( 'Sign in', 'relicquest' )
		);
		return;
	}

	$error = isset( $_GET['rq_error'] ) ? sanitize_key( $_GET['rq_error'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	?>
	<div class="card new-topic" id="new-topic">
		<div class="card-body">
			<h3><?php esc_html_e( 'Start a new topic', 'relicquest' ); ?></h3>
			<?php if ( 'missing' === $error ) : ?>
				<p class="forum-notice error"><?php esc_html_e( 'Please add a title and a message.', 'relicquest' ); ?></p>
			<?php elseif ( 'failed' === $error ) : ?>
				<p class="forum-notice error"><?php esc_html_e( 'Something went wrong. Please try again.', 'relicquest' ); ?></p>
			<?php endif; ?>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" class="forum-form">
				<input type="hidden" name="action" value="relicquest_new_topic" />
				<input type="hidden" name="board_id" value="<?php echo esc_attr( $board_id ); ?>" />
				<?php wp_nonce_field( 'relicquest_new_topic_' . $board_id, 'relicquest_topic_nonce' ); ?>
				<p>
					<label for="rq-topic-title"><?php esc_html_e( 'Title', 'relicquest' ); ?></label>
					<input type="text" id="rq-topic-title" name="topic_title" maxlength="160" required />
				</p>
				<p>
					<label for="rq-topic-body"><?php esc_html_e( 'Message', 'relicquest' ); ?></label>
					<textarea id="rq-topic-body" name="topic_body" rows="5" required></textarea>
				</p>
				<button type="submit" class="btn btn-primary btn-sm"><?php esc_html_e( 'Post topic', 'relicquest' ); ?></button>
			</form>
		</div>
	</div>
	<?php
}

/**
 * Handle a new-topic submission (logged-in members only).
 */
function relicquest_handle_new_topic() {
	$board_id = isset( $_POST['board_id'] ) ? absint( $_POST['board_id'] ) : 0;

	if ( ! is_user_logged_in() ) {
		auth_redirect();
		exit;
	}

	if ( ! isset( $_POST['relicquest_topic_nonce'] ) ||
		! wp_verify_nonce( sanitize_key( $_POST['relicquest_topic_nonce'] ), 'relicquest_new_topic_' . $board_id ) ) {
		wp_die( esc_html__( 'Security check failed.', 'relicquest' ) );
	}

	$board = $board_id ? get_post( $board_id ) : null;
	$title = isset( $_POST['topic_title'] ) ? sanitize_text_field( wp_unslash( $_POST['topic_title'] ) ) : '';
	$body  = isset( $_POST['topic_body'] ) ? wp_kses_post( wp_unslash( $_POST['topic_body'] ) ) : '';

	$back = $board ? get_permalink( $board ) : home_url( '/forum/' );

	if ( ! $board || 'board' !== $board->post_type || '' === $title || '' === trim( wp_strip_all_tags( $body ) ) ) {
		wp_safe_redirect( add_query_arg( 'rq_error', 'missing', $back ) . '#new-topic' );
		exit;
	}

	$topic_id = wp_insert_post(
		array(
			'post_type'      => 'topic',
			'post_status'    => 'publish',
			'post_title'     => $title,
			'post_content'   => $body,
			'post_author'    => get_current_user_id(),
			'comment_status' => 'open',
		),
		true
	);

	if ( is_wp_error( $topic_id ) ) {
		wp_safe_redirect( add_query_arg( 'rq_error', 'failed', $back ) . '#new-topic' );
		exit;
	}

	update_post_meta( $topic_id, '_rq_board', $board_id );

	wp_safe_redirect( get_permalink( $topic_id ) );
	exit;
}
add_action( 'admin_post_relicquest_new_topic', 'relicquest_handle_new_topic' );

/**
 * Force comments open on topics so members can always reply.
 *
 * @param bool $open    Whether comments are open.
 * @param int  $post_id Post ID.
 * @return bool
 */
function relicquest_topics_allow_replies( $open, $post_id ) {
	if ( 'topic' === get_post_type( $post_id ) ) {
		return true;
	}
	return $open;
}
add_filter( 'comments_open', 'relicquest_topics_allow_replies', 10, 2 );
