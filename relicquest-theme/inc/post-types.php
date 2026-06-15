<?php
/**
 * Custom post types & taxonomies.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the content types that power the site.
 */
function relicquest_register_post_types() {

	register_post_type(
		'guide',
		array(
			'labels'       => array(
				'name'          => __( 'Guides', 'relicquest' ),
				'singular_name' => __( 'Guide', 'relicquest' ),
				'add_new_item'  => __( 'Add New Guide', 'relicquest' ),
				'edit_item'     => __( 'Edit Guide', 'relicquest' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-book-alt',
			'rewrite'      => array( 'slug' => 'guides' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'author' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'discovery',
		array(
			'labels'       => array(
				'name'          => __( 'Discoveries', 'relicquest' ),
				'singular_name' => __( 'Discovery', 'relicquest' ),
				'add_new_item'  => __( 'Add New Discovery', 'relicquest' ),
				'edit_item'     => __( 'Edit Discovery', 'relicquest' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-camera',
			'rewrite'      => array( 'slug' => 'discoveries' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'review',
		array(
			'labels'       => array(
				'name'          => __( 'Reviews', 'relicquest' ),
				'singular_name' => __( 'Review', 'relicquest' ),
				'add_new_item'  => __( 'Add New Review', 'relicquest' ),
				'edit_item'     => __( 'Edit Review', 'relicquest' ),
			),
			'public'       => true,
			'has_archive'  => true,
			'menu_icon'    => 'dashicons-star-filled',
			'rewrite'      => array( 'slug' => 'reviews' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'show_in_rest' => true,
		)
	);

	register_post_type(
		'board',
		array(
			'labels'       => array(
				'name'          => __( 'Forum Boards', 'relicquest' ),
				'singular_name' => __( 'Board', 'relicquest' ),
				'add_new_item'  => __( 'Add New Board', 'relicquest' ),
				'edit_item'     => __( 'Edit Board', 'relicquest' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-groups',
			'rewrite'      => array( 'slug' => 'forum' ),
			'supports'     => array( 'title', 'editor' ),
			'show_in_rest' => true,
		)
	);

	register_taxonomy(
		'board_section',
		'board',
		array(
			'labels'            => array(
				'name'          => __( 'Board Sections', 'relicquest' ),
				'singular_name' => __( 'Section', 'relicquest' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'forum-section' ),
		)
	);
}
add_action( 'init', 'relicquest_register_post_types' );

/**
 * Flush rewrite rules on theme activation so the new CPT URLs work.
 */
function relicquest_flush_rewrites() {
	relicquest_register_post_types();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'relicquest_flush_rewrites' );
