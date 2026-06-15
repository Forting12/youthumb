<?php
/**
 * Custom meta boxes for Reviews, Discoveries and Forum boards.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Field definitions keyed by post type.
 *
 * @return array
 */
function relicquest_meta_fields() {
	return array(
		'review'    => array(
			'_rq_rating'   => __( 'Rating (0–5, e.g. 4.5)', 'relicquest' ),
			'_rq_category' => __( 'Category label (e.g. Best Overall)', 'relicquest' ),
		),
		'discovery' => array(
			'_rq_meta_line' => __( 'Meta line (e.g. Field find · Somerset)', 'relicquest' ),
		),
		'board'     => array(
			'_rq_topics'    => __( 'Topic count', 'relicquest' ),
			'_rq_posts'     => __( 'Post count', 'relicquest' ),
			'_rq_last_post' => __( 'Last post title', 'relicquest' ),
			'_rq_last_meta' => __( 'Last post author · time', 'relicquest' ),
		),
	);
}

/**
 * Register the meta boxes.
 */
function relicquest_add_meta_boxes() {
	foreach ( array_keys( relicquest_meta_fields() ) as $post_type ) {
		add_meta_box(
			'relicquest_details',
			__( 'RelicQuest Details', 'relicquest' ),
			'relicquest_render_meta_box',
			$post_type,
			'side',
			'default'
		);
	}
}
add_action( 'add_meta_boxes', 'relicquest_add_meta_boxes' );

/**
 * Render the meta box fields.
 *
 * @param WP_Post $post Current post.
 */
function relicquest_render_meta_box( $post ) {
	$fields = relicquest_meta_fields();
	if ( empty( $fields[ $post->post_type ] ) ) {
		return;
	}
	wp_nonce_field( 'relicquest_save_meta', 'relicquest_meta_nonce' );

	foreach ( $fields[ $post->post_type ] as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s" style="display:block;font-weight:600;margin-bottom:2px;">%2$s</label>' .
			'<input type="text" id="%1$s" name="%1$s" value="%3$s" style="width:100%%;" /></p>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( $value )
		);
	}
}

/**
 * Save meta box values.
 *
 * @param int $post_id Post ID.
 */
function relicquest_save_meta( $post_id ) {
	if ( ! isset( $_POST['relicquest_meta_nonce'] ) ||
		! wp_verify_nonce( sanitize_key( $_POST['relicquest_meta_nonce'] ), 'relicquest_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$fields = relicquest_meta_fields();
	$type   = get_post_type( $post_id );
	if ( empty( $fields[ $type ] ) ) {
		return;
	}

	foreach ( array_keys( $fields[ $type ] ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}
add_action( 'save_post', 'relicquest_save_meta' );
