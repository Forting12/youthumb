# RelicQuest — WordPress Theme

A classic (PHP) WordPress theme for treasure-hunting / metal-detecting sites.
It reproduces the RelicQuest design with a home page, field guides, discoveries
gallery, detector reviews, an interactive **Coin Identifier**, and a forum
listing.

The theme ships with **demo content** that renders automatically before you add
your own posts — so it looks complete the moment you activate it.

## Requirements

- WordPress 5.9+
- PHP 7.4+

## Installation

1. Zip the `relicquest-theme` folder:
   ```bash
   cd relicquest-theme && zip -r ../relicquest-theme.zip . && cd ..
   ```
2. In WordPress: **Appearance → Themes → Add New → Upload Theme**, choose the
   zip, then **Activate**.
   (Or copy the `relicquest-theme` folder into `wp-content/themes/`.)

On activation the theme automatically:

- registers the custom post types and the forum-section taxonomy,
- creates three pages — **Coin Identifier** (`/coin-identifier/`),
  **Forum** (`/forum/`) and **About** (`/about/`) — and assigns the right
  page templates,
- flushes permalinks so the new URLs work.

> If any sub-page shows a 404, go to **Settings → Permalinks** and click
> **Save** once to refresh the rewrite rules.

## Recommended one-time configuration

- **Settings → Reading →** *Your homepage displays* → **A static page**, and pick
  a page as the front page (the theme uses `front-page.php` either way, but this
  keeps the home URL clean). A blog page is optional.
- **Appearance → Menus →** create a menu, add your pages/links, and assign it to
  the **Primary Menu** location. Without a menu the theme falls back to a sensible
  default (Home · Discoveries · Guides · Reviews · Coin Identifier · About).
- **Appearance → Customize → Site Identity →** set the site **Title**, **Tagline**
  and (optionally) a **Logo**.

## Adding content

| Section | Where to add it | Custom fields (in the "RelicQuest Details" box) |
|---|---|---|
| **Guides** | Guides → Add New | — (uses title, content, excerpt, featured image, author) |
| **Discoveries** | Discoveries → Add New | *Meta line* (e.g. `Field find · Somerset`) |
| **Reviews** | Reviews → Add New | *Rating* (0–5), *Category label* (e.g. `Best Overall`) |
| **Forum boards** | Forum Boards → Add New | *Topics*, *Posts*, *Last post*, *Last post author · time*; assign a **Board Section** to group them |

Set a **Featured Image** on any item to replace the vintage-gradient placeholder.
As soon as a section has at least one published item, its demo content is
replaced by your real entries.

## The Coin Identifier

`page-templates/template-coin-identifier.php` provides the upload UI and a
**simulated** analysis (it shows sample results after a short delay). To connect
real coin recognition, replace the `setTimeout` block in
`assets/js/main.js → setupCoinIdentifier()` with a `fetch()` call that POSTs the
selected image to your model/API and renders the returned matches.

## A real forum

The Forum page is a styled board **listing**. For full discussion threads,
install [bbPress](https://wordpress.org/plugins/bbpress/) and link the menu item
to its forum index; the board cards here work well as a landing page above it.

## File overview

```
relicquest-theme/
├── style.css                     Theme header + all styles (design tokens, components)
├── functions.php                 Setup, asset loading, includes
├── header.php / footer.php       Site chrome (nav, footer)
├── front-page.php                Home (hero, features, discoveries, featured guide)
├── archive.php                   Guides / Discoveries / Reviews listings
├── single.php                    Article with banner + sidebar
├── page.php / index.php          Generic page / fallback
├── sidebar.php                   Latest Discoveries · Related · Coin ID CTA
├── page-templates/
│   ├── template-coin-identifier.php
│   └── template-forum.php
├── inc/
│   ├── post-types.php            CPTs + board_section taxonomy
│   ├── meta-boxes.php            Rating / meta-line / board stat fields
│   ├── demo-content.php          Fallback demo data
│   ├── template-helpers.php      hero(), photo(), stars(), share, menus
│   └── setup.php                 Auto-create pages on activation
└── assets/js/main.js             Nav toggle, coin identifier, forum search
```

## License

GPL-2.0-or-later.
