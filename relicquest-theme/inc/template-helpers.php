<?php
/**
 * Shared template helpers.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Output a "vintage photo" block. Uses the post's featured image when present,
 * otherwise falls back to the CSS gradient placeholder.
 *
 * @param array $args { id, class, size, style }.
 */
function relicquest_photo( $args = array() ) {
	$args  = wp_parse_args(
		$args,
		array(
			'id'    => 0,
			'class' => '',
			'size'  => 'relicquest-card',
			'style' => '',
		)
	);
	$style = $args['style'];

	if ( $args['id'] && has_post_thumbnail( $args['id'] ) ) {
		$src = get_the_post_thumbnail_url( $args['id'], $args['size'] );
		if ( $src ) {
			$style .= 'background-image:url(' . esc_url( $src ) . ');';
		}
	}

	printf(
		'<div class="photo %1$s"%2$s></div>',
		esc_attr( $args['class'] ),
		$style ? ' style="' . esc_attr( $style ) . '"' : ''
	);
}

/**
 * Render the page hero.
 *
 * @param array $args { eyebrow, title, subtitle, small, actions (html) }.
 */
function relicquest_hero( $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'eyebrow'  => '',
			'title'    => '',
			'subtitle' => '',
			'small'    => false,
			'actions'  => '',
		)
	);
	?>
	<section class="hero photo<?php echo $args['small'] ? ' hero-sm' : ''; ?>">
		<div class="container">
			<?php if ( $args['eyebrow'] ) : ?>
				<p class="eyebrow"><?php echo esc_html( $args['eyebrow'] ); ?></p>
			<?php endif; ?>
			<h1><?php echo esc_html( $args['title'] ); ?></h1>
			<?php if ( $args['subtitle'] ) : ?>
				<p class="lead"><?php echo esc_html( $args['subtitle'] ); ?></p>
			<?php endif; ?>
			<?php if ( $args['actions'] ) : ?>
				<div class="hero-actions"><?php echo wp_kses_post( $args['actions'] ); ?></div>
			<?php endif; ?>
		</div>
	</section>
	<?php
}

/**
 * Render a star rating row.
 *
 * @param float $rating 0–5.
 */
function relicquest_stars( $rating ) {
	$rating = (float) $rating;
	$full   = (int) round( $rating );
	$full   = max( 0, min( 5, $full ) );
	echo '<span class="stars" aria-label="' . esc_attr( sprintf( '%s out of 5', $rating ) ) . '">';
	echo esc_html( str_repeat( '★', $full ) );
	echo '<span class="empty">' . esc_html( str_repeat( '★', 5 - $full ) ) . '</span>';
	echo '</span>';
}

/**
 * Social share links for the current post.
 */
function relicquest_share_links() {
	$url   = rawurlencode( get_permalink() );
	$title = rawurlencode( get_the_title() );
	$links = array(
		'F'  => 'https://www.facebook.com/sharer/sharer.php?u=' . $url,
		'X'  => 'https://twitter.com/intent/tweet?url=' . $url . '&text=' . $title,
		'in' => 'https://www.linkedin.com/sharing/share-offsite/?url=' . $url,
		'P'  => 'https://pinterest.com/pin/create/button/?url=' . $url . '&description=' . $title,
	);
	echo '<div class="share-row"><span style="font-weight:600;color:var(--sepia-dark);font-size:.875rem;">' . esc_html__( 'Share:', 'relicquest' ) . '</span>';
	foreach ( $links as $label => $href ) {
		printf( '<a href="%s" target="_blank" rel="noopener noreferrer" aria-label="%s">%s</a>', esc_url( $href ), esc_attr( $label ), esc_html( $label ) );
	}
	echo '</div>';
}

/**
 * Get discoveries as normalised arrays (real posts, or demo fallback).
 *
 * @param int $limit Number to return.
 * @return array Each item: [ id, title, meta, has_image ].
 */
function relicquest_get_discoveries( $limit = 4 ) {
	$query = new WP_Query(
		array(
			'post_type'      => 'discovery',
			'posts_per_page' => $limit,
			'no_found_rows'  => true,
		)
	);

	if ( $query->have_posts() ) {
		$items = array();
		foreach ( $query->posts as $post ) {
			$items[] = array(
				'id'        => $post->ID,
				'title'     => get_the_title( $post ),
				'meta'      => get_post_meta( $post->ID, '_rq_meta_line', true ),
				'has_image' => has_post_thumbnail( $post->ID ),
			);
		}
		wp_reset_postdata();
		return $items;
	}

	return array_map(
		function ( $d ) {
			return array(
				'id'        => 0,
				'title'     => $d['title'],
				'meta'      => $d['meta'],
				'has_image' => false,
			);
		},
		array_slice( relicquest_demo_discoveries(), 0, $limit )
	);
}

/**
 * Default navigation links, used when no menu is assigned to the "primary"
 * location. Returns [ label => url ].
 *
 * @return array
 */
function relicquest_default_links() {
	return array(
		__( 'Home', 'relicquest' )           => home_url( '/' ),
		__( 'Discoveries', 'relicquest' )     => get_post_type_archive_link( 'discovery' ) ?: home_url( '/discoveries/' ),
		__( 'Guides', 'relicquest' )          => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
		__( 'Reviews', 'relicquest' )         => get_post_type_archive_link( 'review' ) ?: home_url( '/reviews/' ),
		__( 'Coin Identifier', 'relicquest' ) => home_url( '/coin-identifier/' ),
		__( 'Forum', 'relicquest' )           => home_url( '/forum/' ),
		__( 'About', 'relicquest' )           => home_url( '/about/' ),
	);
}

/**
 * Fallback menu renderer for wp_nav_menu().
 */
function relicquest_fallback_menu() {
	echo '<ul id="primary-menu" class="menu">';
	foreach ( relicquest_default_links() as $label => $url ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( $url ), esc_html( $label ) );
	}
	echo '</ul>';
}

/**
 * Convenience: does a CPT have any published posts?
 *
 * @param string $post_type Post type.
 * @return bool
 */
function relicquest_has_posts( $post_type ) {
	$counts = wp_count_posts( $post_type );
	return $counts && ! empty( $counts->publish );
}
