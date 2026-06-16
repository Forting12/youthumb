<?php
/**
 * Comments / replies template. Powers forum topic replies and article comments.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( post_password_required() ) {
	return;
}

$relicquest_is_topic = ( 'topic' === get_post_type() );
$relicquest_count    = (int) get_comments_number();
?>

<div id="comments" class="comments-area">
	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
			if ( $relicquest_is_topic ) {
				printf(
					esc_html( _n( '%s reply', '%s replies', $relicquest_count, 'relicquest' ) ),
					esc_html( number_format_i18n( $relicquest_count ) )
				);
			} else {
				printf(
					esc_html( _n( '%s comment', '%s comments', $relicquest_count, 'relicquest' ) ),
					esc_html( number_format_i18n( $relicquest_count ) )
				);
			}
			?>
		</h2>

		<ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'       => 'ol',
					'avatar_size' => 44,
					'short_ping'  => true,
				)
			);
			?>
		</ol>

		<?php the_comments_navigation(); ?>

		<?php if ( ! comments_open() ) : ?>
			<p class="no-comments"><?php esc_html_e( 'Replies are closed.', 'relicquest' ); ?></p>
		<?php endif; ?>
	<?php endif; ?>

	<?php
	$relicquest_label = $relicquest_is_topic ? __( 'Post a reply', 'relicquest' ) : __( 'Leave a comment', 'relicquest' );

	comment_form(
		array(
			'class_container'    => 'comment-respond card',
			'title_reply'        => $relicquest_label,
			'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
			'title_reply_after'  => '</h3>',
			'label_submit'       => $relicquest_is_topic ? __( 'Post reply', 'relicquest' ) : __( 'Submit', 'relicquest' ),
			'class_submit'       => 'btn btn-primary btn-sm',
			'comment_field'      => '<p class="comment-form-comment"><label for="comment">' . esc_html__( 'Your message', 'relicquest' ) . '</label><textarea id="comment" name="comment" rows="5" required></textarea></p>',
		)
	);
	?>
</div>
