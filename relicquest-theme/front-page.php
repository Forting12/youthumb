<?php
/**
 * Front page (home).
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$relicquest_features = array(
	array(
		'title' => __( 'AI Coin Identifier', 'relicquest' ),
		'body'  => __( 'Snap a photo of any coin and get an instant identification, era and rough value.', 'relicquest' ),
		'url'   => home_url( '/coin-identifier/' ),
		'cta'   => __( 'Identify a coin', 'relicquest' ),
		'icon'  => 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z',
	),
	array(
		'title' => __( 'Field Guides', 'relicquest' ),
		'body'  => __( 'Research tactics, ground reading and gear setup from experienced hunters.', 'relicquest' ),
		'url'   => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
		'cta'   => __( 'Browse guides', 'relicquest' ),
		'icon'  => 'M4 4h11a3 3 0 013 3v13a2 2 0 00-2-2H4V4zm16 0v14',
	),
	array(
		'title' => __( 'Community Forum', 'relicquest' ),
		'body'  => __( 'Ask questions, share finds and learn the local hot spots from the community.', 'relicquest' ),
		'url'   => home_url( '/forum/' ),
		'cta'   => __( 'Join the forum', 'relicquest' ),
		'icon'  => 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
	),
);

$relicquest_actions  = '<a class="btn btn-gold" href="' . esc_url( home_url( '/coin-identifier/' ) ) . '">' . esc_html__( 'Identify a coin', 'relicquest' ) . '</a>';
$relicquest_actions .= '<a class="btn btn-outline" href="' . esc_url( get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ) ) . '">' . esc_html__( 'Read the guides', 'relicquest' ) . '</a>';

relicquest_hero(
	array(
		'eyebrow'  => __( 'Dig deeper', 'relicquest' ),
		'title'    => __( 'Find more. Hunt smarter.', 'relicquest' ),
		'subtitle' => __( 'Your field companion for metal detecting, coin identification and treasure hunting know-how.', 'relicquest' ),
		'actions'  => $relicquest_actions,
	)
);
?>

<section class="section">
	<div class="container">
		<div class="grid grid-3">
			<?php foreach ( $relicquest_features as $f ) : ?>
				<div class="card">
					<div class="card-body">
						<div class="feature-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
								<path d="<?php echo esc_attr( $f['icon'] ); ?>" />
							</svg>
						</div>
						<h3><?php echo esc_html( $f['title'] ); ?></h3>
						<p class="flex-grow"><?php echo esc_html( $f['body'] ); ?></p>
						<a href="<?php echo esc_url( $f['url'] ); ?>" style="font-weight:600;"><?php echo esc_html( $f['cta'] ); ?> &rarr;</a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section" style="background:rgba(231,220,199,.55);">
	<div class="container">
		<div class="flex items-center justify-between mb-8">
			<div>
				<p class="eyebrow"><?php esc_html_e( 'From the field', 'relicquest' ); ?></p>
				<h2 style="font-size:2rem;"><?php esc_html_e( 'Latest discoveries', 'relicquest' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'discovery' ) ?: home_url( '/discoveries/' ) ); ?>" style="font-weight:600;"><?php esc_html_e( 'View all', 'relicquest' ); ?> &rarr;</a>
		</div>
		<div class="grid grid-4">
			<?php foreach ( relicquest_get_discoveries( 4 ) as $d ) : ?>
				<div class="card">
					<?php relicquest_photo( array( 'id' => $d['id'], 'class' => 'card-img' ) ); ?>
					<div class="card-body">
						<?php if ( $d['meta'] ) : ?>
							<p class="eyebrow" style="font-size:.7rem;"><?php echo esc_html( $d['meta'] ); ?></p>
						<?php endif; ?>
						<h3 style="font-size:1rem;color:var(--sepia-dark);"><?php echo esc_html( $d['title'] ); ?></h3>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
// Featured guide: latest real guide, or demo fallback.
$relicquest_featured = new WP_Query(
	array(
		'post_type'      => 'guide',
		'posts_per_page' => 1,
		'no_found_rows'  => true,
	)
);

if ( $relicquest_featured->have_posts() ) :
	$relicquest_featured->the_post();
	?>
	<section class="section">
		<div class="container">
			<p class="eyebrow text-center"><?php esc_html_e( "Editor's pick", 'relicquest' ); ?></p>
			<h2 class="text-center mb-8" style="font-size:2rem;"><?php esc_html_e( 'Featured guide', 'relicquest' ); ?></h2>
			<a class="card" href="<?php the_permalink(); ?>" style="display:grid;grid-template-columns:1fr 1fr;">
				<?php relicquest_photo( array( 'id' => get_the_ID(), 'style' => 'min-height:220px;' ) ); ?>
				<div class="card-body" style="padding:2rem;">
					<p class="eyebrow"><?php esc_html_e( 'Field Guide', 'relicquest' ); ?></p>
					<h3 style="font-size:1.5rem;"><?php the_title(); ?></h3>
					<p><?php echo esc_html( get_the_excerpt() ); ?></p>
					<span style="color:var(--forest);font-weight:600;"><?php esc_html_e( 'Read the guide', 'relicquest' ); ?> &rarr;</span>
				</div>
			</a>
		</div>
	</section>
	<?php
	wp_reset_postdata();
else :
	$relicquest_demo = relicquest_demo_guides()[0];
	?>
	<section class="section">
		<div class="container">
			<p class="eyebrow text-center"><?php esc_html_e( "Editor's pick", 'relicquest' ); ?></p>
			<h2 class="text-center mb-8" style="font-size:2rem;"><?php esc_html_e( 'Featured guide', 'relicquest' ); ?></h2>
			<a class="card" href="<?php echo esc_url( get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ) ); ?>" style="display:grid;grid-template-columns:1fr 1fr;">
				<?php relicquest_photo( array( 'style' => 'min-height:220px;' ) ); ?>
				<div class="card-body" style="padding:2rem;">
					<p class="eyebrow"><?php echo esc_html( $relicquest_demo['category'] ); ?></p>
					<h3 style="font-size:1.5rem;"><?php echo esc_html( $relicquest_demo['title'] ); ?></h3>
					<p><?php echo esc_html( $relicquest_demo['excerpt'] ); ?></p>
					<span style="color:var(--forest);font-weight:600;"><?php esc_html_e( 'Read the guide', 'relicquest' ); ?> &rarr;</span>
				</div>
			</a>
		</div>
	</section>
	<?php
endif;

get_footer();
