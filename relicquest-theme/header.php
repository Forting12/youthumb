<?php
/**
 * Header template.
 *
 * @package RelicQuest
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
	<div class="container">
		<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
					<circle cx="20" cy="20" r="18" fill="#3d4a2c" stroke="#c19a4b" stroke-width="2" />
					<path d="M20 8 L24 20 L20 32 L16 20 Z" fill="#c19a4b" />
					<path d="M8 20 L20 16 L32 20 L20 24 Z" fill="#e7dcc7" opacity="0.85" />
					<circle cx="20" cy="20" r="2.5" fill="#3d4a2c" />
				</svg>
			<?php endif; ?>
			<span class="brand-name"><?php bloginfo( 'name' ); ?></span>
		</a>

		<nav class="primary-nav" aria-label="<?php esc_attr_e( 'Primary', 'relicquest' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_id'        => 'primary-menu',
					'fallback_cb'    => 'relicquest_fallback_menu',
					'depth'          => 1,
				)
			);
			?>
		</nav>

		<div class="header-cta">
			<a class="btn btn-gold btn-sm" href="<?php echo esc_url( home_url( '/coin-identifier/' ) ); ?>"><?php esc_html_e( 'Join free', 'relicquest' ); ?></a>
		</div>

		<button class="nav-toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'relicquest' ); ?>" aria-expanded="false">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<nav class="mobile-nav" aria-label="<?php esc_attr_e( 'Mobile', 'relicquest' ); ?>">
		<?php
		if ( has_nav_menu( 'primary' ) ) {
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'depth'          => 1,
				)
			);
		} else {
			foreach ( relicquest_default_links() as $label => $url ) {
				printf( '<a href="%s">%s</a>', esc_url( $url ), esc_html( $label ) );
			}
		}
		?>
		<a class="btn btn-gold btn-block mt-2" href="<?php echo esc_url( home_url( '/coin-identifier/' ) ); ?>"><?php esc_html_e( 'Join free', 'relicquest' ); ?></a>
	</nav>
</header>

<main id="content" class="site-main">
