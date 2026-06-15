<?php
/**
 * Footer template.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$relicquest_footer_cols = array(
	__( 'Featured', 'relicquest' )  => array(
		__( 'Latest Finds', 'relicquest' )    => get_post_type_archive_link( 'discovery' ) ?: home_url( '/discoveries/' ),
		__( 'Top Guides', 'relicquest' )      => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
		__( 'Coin Identifier', 'relicquest' ) => home_url( '/coin-identifier/' ),
	),
	__( 'Guides', 'relicquest' )    => array(
		__( 'Getting Started', 'relicquest' )  => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
		__( 'Gear & Setup', 'relicquest' )     => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
		__( 'Field Techniques', 'relicquest' ) => get_post_type_archive_link( 'guide' ) ?: home_url( '/guides/' ),
	),
	__( 'Reviews', 'relicquest' )   => array(
		__( 'Detectors', 'relicquest' )   => get_post_type_archive_link( 'review' ) ?: home_url( '/reviews/' ),
		__( 'Pinpointers', 'relicquest' ) => get_post_type_archive_link( 'review' ) ?: home_url( '/reviews/' ),
		__( 'Accessories', 'relicquest' ) => get_post_type_archive_link( 'review' ) ?: home_url( '/reviews/' ),
	),
	__( 'Community', 'relicquest' ) => array(
		__( 'Forum', 'relicquest' )    => home_url( '/forum/' ),
		__( 'Q&A', 'relicquest' )      => home_url( '/forum/' ),
		__( 'About Us', 'relicquest' ) => home_url( '/about/' ),
	),
);
?>
</main><!-- #content -->

<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-about">
				<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
						<circle cx="20" cy="20" r="18" fill="#3d4a2c" stroke="#c19a4b" stroke-width="2" />
						<path d="M20 8 L24 20 L20 32 L16 20 Z" fill="#c19a4b" />
						<path d="M8 20 L20 16 L32 20 L20 24 Z" fill="#e7dcc7" opacity="0.85" />
						<circle cx="20" cy="20" r="2.5" fill="#3d4a2c" />
					</svg>
					<span class="brand-name"><?php bloginfo( 'name' ); ?></span>
				</a>
				<p><?php echo esc_html( get_bloginfo( 'description' ) ? get_bloginfo( 'description' ) : __( 'Your field companion for metal detecting, coin ID and treasure hunting know-how.', 'relicquest' ) ); ?></p>
			</div>

			<?php foreach ( $relicquest_footer_cols as $heading => $links ) : ?>
				<div>
					<h4><?php echo esc_html( $heading ); ?></h4>
					<ul>
						<?php foreach ( $links as $label => $url ) : ?>
							<li><a href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $label ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved.', 'relicquest' ); ?></p>
			<div class="socials">
				<?php foreach ( array( 'Facebook', 'Twitter', 'YouTube', 'Instagram' ) as $social ) : ?>
					<a href="#" aria-label="<?php echo esc_attr( $social ); ?>"><?php echo esc_html( substr( $social, 0, 2 ) ); ?></a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
