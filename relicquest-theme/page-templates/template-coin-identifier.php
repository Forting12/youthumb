<?php
/**
 * Template Name: Coin Identifier
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$relicquest_coins = relicquest_demo_coins();
$relicquest_steps = array(
	array( 'n' => '1', 't' => __( 'Snap a picture', 'relicquest' ), 'd' => __( 'Photograph the coin on a plain background in good light.', 'relicquest' ) ),
	array( 'n' => '2', 't' => __( 'Upload it', 'relicquest' ), 'd' => __( 'Drop the photo in above — both sides help accuracy.', 'relicquest' ) ),
	array( 'n' => '3', 't' => __( 'Get results', 'relicquest' ), 'd' => __( 'See likely matches with era, metal and rough value.', 'relicquest' ) ),
);
?>

<section class="hero photo">
	<div class="container">
		<p class="eyebrow"><?php esc_html_e( 'Instant coin ID', 'relicquest' ); ?></p>
		<h1><?php esc_html_e( 'Coin Identifier', 'relicquest' ); ?></h1>
		<p class="lead"><?php esc_html_e( 'Upload a photo of your coin and let the identifier do the rest.', 'relicquest' ); ?></p>

		<div class="coin-uploader" style="max-width:36rem;margin:2rem auto 0;">
			<input type="file" id="coin-input" accept="image/*" class="hidden" />

			<button type="button" class="upload-zone" id="coin-dropzone">
				<span class="feature-icon" style="width:3.5rem;height:3.5rem;">
					<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#faf6ec" stroke-width="1.8" stroke-linejoin="round">
						<path d="M3 9a2 2 0 012-2h2l1.5-2h7L18 7h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
						<circle cx="12" cy="13" r="3.5" />
					</svg>
				</span>
				<span style="font-size:1.1rem;font-weight:700;">+ <?php esc_html_e( 'Choose photo', 'relicquest' ); ?></span>
				<span style="font-size:.875rem;opacity:.8;"><?php esc_html_e( 'or drag & drop · JPG or PNG', 'relicquest' ); ?></span>
			</button>

			<div class="upload-preview hidden" id="coin-preview">
				<img id="coin-preview-img" src="" alt="<?php esc_attr_e( 'Coin to identify', 'relicquest' ); ?>" />
				<div style="flex-grow:1;">
					<p id="coin-status" style="font-weight:600;"></p>
					<div class="mt-4" style="display:flex;gap:.75rem;">
						<button type="button" class="btn btn-gold btn-sm" id="coin-retry"><?php esc_html_e( 'Try another', 'relicquest' ); ?></button>
						<button type="button" class="btn btn-outline btn-sm" id="coin-clear"><?php esc_html_e( 'Clear', 'relicquest' ); ?></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section" id="coin-steps">
	<div class="container">
		<div class="steps">
			<?php foreach ( $relicquest_steps as $s ) : ?>
				<div>
					<div class="coin step-num"><?php echo esc_html( $s['n'] ); ?></div>
					<h3 class="mt-4" style="font-size:1.1rem;"><?php echo esc_html( $s['t'] ); ?></h3>
					<p style="font-size:.875rem;"><?php echo esc_html( $s['d'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="section hidden" id="coin-results">
	<div class="container">
		<h2 style="font-size:2rem;"><?php esc_html_e( 'Coin ID Results', 'relicquest' ); ?></h2>
		<p style="color:var(--sepia-light);" class="mb-8"><?php esc_html_e( 'Ranked by match confidence. Always verify high-value coins with an expert.', 'relicquest' ); ?></p>

		<div class="grid grid-3" id="coin-grid">
			<?php foreach ( $relicquest_coins as $i => $coin ) : ?>
				<div class="card coin-result<?php echo $i >= 3 ? ' coin-extra hidden' : ''; ?>">
					<div class="coin-img photo"><div class="coin"></div></div>
					<div class="card-body">
						<div class="flex items-center justify-between gap-2">
							<h3 style="font-size:1.1rem;"><?php echo esc_html( $coin['name'] ); ?></h3>
							<span class="confidence"><?php echo esc_html( $coin['confidence'] ); ?>%</span>
						</div>
						<p class="meta mt-2" style="font-size:.875rem;"><?php echo esc_html( $coin['detail'] ); ?></p>
						<p class="mt-2" style="font-size:.875rem;"><?php echo esc_html( $coin['blurb'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( count( $relicquest_coins ) > 3 ) : ?>
			<div class="text-center mt-8">
				<button type="button" class="btn btn-primary" id="coin-more"><?php esc_html_e( 'View more results', 'relicquest' ); ?> &rarr;</button>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
// Optional page body content under the tool.
while ( have_posts() ) :
	the_post();
	if ( trim( get_the_content() ) ) :
		?>
		<section class="section">
			<div class="container" style="max-width:48rem;">
				<div class="entry-content"><?php the_content(); ?></div>
			</div>
		</section>
		<?php
	endif;
endwhile;

get_footer();
