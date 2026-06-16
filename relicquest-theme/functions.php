<?php
/**
 * RelicQuest theme functions.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'RELICQUEST_VERSION', '1.1.0' );

/**
 * Theme setup.
 */
function relicquest_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array( 'height' => 40, 'width' => 40, 'flex-width' => true ) );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'relicquest' ),
			'footer'  => __( 'Footer Menu', 'relicquest' ),
		)
	);

	add_image_size( 'relicquest-card', 640, 420, true );
	add_image_size( 'relicquest-thumb', 160, 160, true );
}
add_action( 'after_setup_theme', 'relicquest_setup' );

/**
 * Enqueue styles and scripts.
 */
function relicquest_assets() {
	wp_enqueue_style(
		'relicquest-fonts',
		'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+Pro:wght@400;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'relicquest-style', get_stylesheet_uri(), array(), RELICQUEST_VERSION );

	wp_enqueue_script(
		'relicquest-main',
		get_template_directory_uri() . '/assets/js/main.js',
		array(),
		RELICQUEST_VERSION,
		true
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'relicquest_assets' );

/**
 * Register sidebar widget area.
 */
function relicquest_widgets() {
	register_sidebar(
		array(
			'name'          => __( 'Article Sidebar', 'relicquest' ),
			'id'            => 'sidebar-article',
			'description'   => __( 'Shown alongside single guides/posts. Leave empty to use the built-in Latest Discoveries / Related blocks.', 'relicquest' ),
			'before_widget' => '<div class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3>',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'relicquest_widgets' );

require get_template_directory() . '/inc/post-types.php';
require get_template_directory() . '/inc/meta-boxes.php';
require get_template_directory() . '/inc/demo-content.php';
require get_template_directory() . '/inc/template-helpers.php';
require get_template_directory() . '/inc/forum.php';
require get_template_directory() . '/inc/setup.php';
