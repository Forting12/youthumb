<?php
/**
 * Archive template for Guides, Discoveries, Reviews and standard archives.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$relicquest_pt = get_post_type();

/* ----- Guides ----- */
if ( 'guide' === $relicquest_pt ) :
	relicquest_hero(
		array(
			'eyebrow'  => __( 'Learn the craft', 'relicquest' ),
			'title'    => __( 'Field Guides', 'relicquest' ),
			'subtitle' => __( 'Practical know-how from research to recovery — written by hunters who put in the dirt time.', 'relicquest' ),
			'small'    => true,
		)
	);
	?>
	<section class="section">
		<div class="container">
			<div class="grid grid-3">
				<?php if ( have_posts() ) : ?>
					<?php
					while ( have_posts() ) :
						the_post();
						?>
						<a class="card" href="<?php the_permalink(); ?>">
							<?php relicquest_photo( array( 'id' => get_the_ID(), 'class' => 'card-img' ) ); ?>
							<div class="card-body">
								<p class="eyebrow"><?php esc_html_e( 'Field Guide', 'relicquest' ); ?></p>
								<h3><?php the_title(); ?></h3>
								<p class="flex-grow" style="font-size:.875rem;"><?php echo esc_html( get_the_excerpt() ); ?></p>
								<p class="meta mt-4"><?php echo esc_html( get_the_author() ); ?></p>
							</div>
						</a>
					<?php endwhile; ?>
				<?php else : ?>
					<?php foreach ( relicquest_demo_guides() as $g ) : ?>
						<div class="card">
							<?php relicquest_photo( array( 'class' => 'card-img' ) ); ?>
							<div class="card-body">
								<p class="eyebrow"><?php echo esc_html( $g['category'] ); ?></p>
								<h3><?php echo esc_html( $g['title'] ); ?></h3>
								<p class="flex-grow" style="font-size:.875rem;"><?php echo esc_html( $g['excerpt'] ); ?></p>
								<p class="meta mt-4"><?php echo esc_html( $g['meta'] ); ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<?php the_posts_pagination(); ?>
		</div>
	</section>
	<?php

/* ----- Discoveries ----- */
elseif ( 'discovery' === $relicquest_pt ) :
	relicquest_hero(
		array(
			'eyebrow'  => __( 'From the field', 'relicquest' ),
			'title'    => __( 'Latest Discoveries', 'relicquest' ),
			'subtitle' => __( 'Recent finds shared by the community — coins, relics and the occasional glint of gold.', 'relicquest' ),
			'small'    => true,
		)
	);
	?>
	<section class="section">
		<div class="container">
			<div class="grid grid-4">
				<?php if ( have_posts() ) : ?>
					<?php
					while ( have_posts() ) :
						the_post();
						?>
						<div class="card">
							<?php relicquest_photo( array( 'id' => get_the_ID(), 'class' => 'card-img' ) ); ?>
							<div class="card-body">
								<?php $relicquest_line = get_post_meta( get_the_ID(), '_rq_meta_line', true ); ?>
								<?php if ( $relicquest_line ) : ?>
									<p class="eyebrow" style="font-size:.7rem;"><?php echo esc_html( $relicquest_line ); ?></p>
								<?php endif; ?>
								<h3 style="font-size:1rem;color:var(--sepia-dark);"><?php the_title(); ?></h3>
							</div>
						</div>
					<?php endwhile; ?>
				<?php else : ?>
					<?php foreach ( relicquest_demo_discoveries() as $d ) : ?>
						<div class="card">
							<?php relicquest_photo( array( 'class' => 'card-img' ) ); ?>
							<div class="card-body">
								<p class="eyebrow" style="font-size:.7rem;"><?php echo esc_html( $d['meta'] ); ?></p>
								<h3 style="font-size:1rem;color:var(--sepia-dark);"><?php echo esc_html( $d['title'] ); ?></h3>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<?php the_posts_pagination(); ?>
		</div>
	</section>
	<?php

/* ----- Reviews ----- */
elseif ( 'review' === $relicquest_pt ) :
	relicquest_hero(
		array(
			'eyebrow'  => __( 'Tested in the dirt', 'relicquest' ),
			'title'    => __( 'Detector Reviews', 'relicquest' ),
			'subtitle' => __( 'Hands-on impressions across budget, all-rounder and beach-specialist categories.', 'relicquest' ),
			'small'    => true,
		)
	);
	?>
	<section class="section">
		<div class="container">
			<div class="grid grid-2">
				<?php if ( have_posts() ) : ?>
					<?php
					while ( have_posts() ) :
						the_post();
						$relicquest_rating = get_post_meta( get_the_ID(), '_rq_rating', true );
						$relicquest_cat    = get_post_meta( get_the_ID(), '_rq_category', true );
						?>
						<div class="card" style="flex-direction:row;">
							<?php relicquest_photo( array( 'id' => get_the_ID(), 'style' => 'width:7rem;flex-shrink:0;', 'size' => 'relicquest-thumb' ) ); ?>
							<div class="card-body">
								<?php if ( $relicquest_cat ) : ?><p class="eyebrow"><?php echo esc_html( $relicquest_cat ); ?></p><?php endif; ?>
								<h3 style="margin-bottom:.25rem;"><?php the_title(); ?></h3>
								<?php if ( $relicquest_rating ) : ?>
									<div style="font-size:.875rem;margin-bottom:.25rem;"><?php relicquest_stars( $relicquest_rating ); ?> <span style="color:var(--sepia-light);"><?php echo esc_html( number_format( (float) $relicquest_rating, 1 ) ); ?></span></div>
								<?php endif; ?>
								<p style="font-size:.875rem;"><?php echo esc_html( get_the_excerpt() ); ?></p>
							</div>
						</div>
					<?php endwhile; ?>
				<?php else : ?>
					<?php foreach ( relicquest_demo_reviews() as $r ) : ?>
						<div class="card" style="flex-direction:row;">
							<?php relicquest_photo( array( 'style' => 'width:7rem;flex-shrink:0;' ) ); ?>
							<div class="card-body">
								<p class="eyebrow"><?php echo esc_html( $r['category'] ); ?></p>
								<h3 style="margin-bottom:.25rem;"><?php echo esc_html( $r['title'] ); ?></h3>
								<div style="font-size:.875rem;margin-bottom:.25rem;"><?php relicquest_stars( $r['rating'] ); ?> <span style="color:var(--sepia-light);"><?php echo esc_html( number_format( (float) $r['rating'], 1 ) ); ?></span></div>
								<p style="font-size:.875rem;"><?php echo esc_html( $r['excerpt'] ); ?></p>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<?php the_posts_pagination(); ?>
		</div>
	</section>
	<?php

/* ----- Generic archives (categories, tags, dates...) ----- */
else :
	relicquest_hero(
		array(
			'title' => get_the_archive_title(),
			'small' => true,
		)
	);
	?>
	<section class="section">
		<div class="container">
			<div class="grid grid-3">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<a class="card" href="<?php the_permalink(); ?>">
						<?php relicquest_photo( array( 'id' => get_the_ID(), 'class' => 'card-img' ) ); ?>
						<div class="card-body">
							<h3><?php the_title(); ?></h3>
							<p class="flex-grow" style="font-size:.875rem;"><?php echo esc_html( get_the_excerpt() ); ?></p>
							<p class="meta mt-4"><?php echo esc_html( get_the_date() ); ?></p>
						</div>
					</a>
				<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		</div>
	</section>
	<?php
endif;

get_footer();
