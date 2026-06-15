<?php
/**
 * One-time setup on theme activation: create the pages the navigation links to
 * and assign their page templates, so /coin-identifier/, /forum/ and /about/
 * work out of the box.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create a page if one with the slug does not already exist.
 *
 * @param string $title    Page title.
 * @param string $slug     Page slug.
 * @param string $template Template file path relative to theme, or ''.
 * @param string $content  Optional page content.
 */
function relicquest_maybe_create_page( $title, $slug, $template = '', $content = '' ) {
	$existing = get_page_by_path( $slug );
	if ( $existing ) {
		return;
	}

	$page_id = wp_insert_post(
		array(
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_content' => $content,
			'post_status'  => 'publish',
			'post_type'    => 'page',
		)
	);

	if ( $page_id && ! is_wp_error( $page_id ) && $template ) {
		update_post_meta( $page_id, '_wp_page_template', $template );
	}
}

/**
 * Run on activation.
 */
function relicquest_create_pages() {
	relicquest_maybe_create_page(
		__( 'Coin Identifier', 'relicquest' ),
		'coin-identifier',
		'page-templates/template-coin-identifier.php'
	);

	relicquest_maybe_create_page(
		__( 'Forum', 'relicquest' ),
		'forum',
		'page-templates/template-forum.php'
	);

	relicquest_maybe_create_page(
		__( 'About', 'relicquest' ),
		'about',
		'',
		"<p>RelicQuest is a community and toolkit for everyone who loves the thrill of the dig — metal detecting, coin identification and treasure hunting.</p>\n\n<h2>What you'll find here</h2>\n<ul>\n<li><strong>Coin Identifier</strong> — upload a photo and get an instant match with era, metal and rough value.</li>\n<li><strong>Field Guides</strong> — research, ground reading and recovery techniques.</li>\n<li><strong>Reviews</strong> — hands-on impressions of detectors and pinpointers.</li>\n<li><strong>Community Forum</strong> — ask questions and share discoveries.</li>\n</ul>\n\n<h2>Hunt responsibly</h2>\n<p>Get permission, fill your holes, pack out trash and report significant historical finds. Responsible hunting keeps sites open for everyone.</p>"
	);
}
add_action( 'after_switch_theme', 'relicquest_create_pages' );
