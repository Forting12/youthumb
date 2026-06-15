<?php
/**
 * Article sidebar: registered widgets, or built-in Latest Discoveries /
 * Related articles / Coin Identifier CTA.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<aside class="article-sidebar">
	<?php if ( is_active_sidebar( 'sidebar-article' ) ) : ?>
		<?php dynamic_sidebar( 'sidebar-article' ); ?>
	<?php else : ?>

		<div class="widget">
			<h3><?php esc_html_e( 'Latest Discoveries', 'relicquest' ); ?></h3>
			<ul class="widget-list">
				<?php foreach ( relicquest_get_discoveries( 3 ) as $d ) : ?>
					<li>
						<?php relicquest_photo( array( 'id' => $d['id'], 'class' => 'thumb', 'size' => 'relicquest-thumb' ) ); ?>
						<div>
							<p class="t"><?php echo esc_html( $d['title'] ); ?></p>
							<?php if ( $d['meta'] ) : ?><p class="m"><?php echo esc_html( $d['meta'] ); ?></p><?php endif; ?>
						</div>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>

		<?php
		// Related guides: same post type, excluding current.
		$relicquest_related = new WP_Query(
			array(
				'post_type'      => get_post_type(),
				'posts_per_page' => 2,
				'post__not_in'   => array( get_the_ID() ),
				'orderby'        => 'rand',
				'no_found_rows'  => true,
			)
		);
		if ( $relicquest_related->have_posts() ) :
			?>
			<div class="widget">
				<h3><?php esc_html_e( 'Related articles', 'relicquest' ); ?></h3>
				<ul class="widget-list">
					<?php
					while ( $relicquest_related->have_posts() ) :
						$relicquest_related->the_post();
						?>
						<li>
							<a href="<?php the_permalink(); ?>" style="display:flex;gap:.75rem;">
								<?php relicquest_photo( array( 'id' => get_the_ID(), 'class' => 'thumb', 'size' => 'relicquest-thumb' ) ); ?>
								<span class="t"><?php the_title(); ?></span>
							</a>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
			<?php
			wp_reset_postdata();
		else :
			?>
			<div class="widget">
				<h3><?php esc_html_e( 'Related articles', 'relicquest' ); ?></h3>
				<ul class="widget-list">
					<?php foreach ( array_slice( relicquest_demo_guides(), 1, 2 ) as $g ) : ?>
						<li>
							<?php relicquest_photo( array( 'class' => 'thumb' ) ); ?>
							<span class="t"><?php echo esc_html( $g['title'] ); ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>

		<div class="widget cta">
			<h3><?php esc_html_e( 'Identify your finds', 'relicquest' ); ?></h3>
			<p style="font-size:.875rem;opacity:.9;margin:.25rem 0 1rem;"><?php esc_html_e( 'Snap a photo of a coin and get an instant ID and rough value.', 'relicquest' ); ?></p>
			<a class="btn btn-gold btn-block btn-sm" href="<?php echo esc_url( home_url( '/coin-identifier/' ) ); ?>"><?php esc_html_e( 'Open Coin Identifier', 'relicquest' ); ?></a>
		</div>

	<?php endif; ?>
</aside>
