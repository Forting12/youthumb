# RelicQuest — WordPress Theme

A classic (PHP) WordPress theme for treasure-hunting / metal-detecting sites.
It reproduces the RelicQuest design with a home page, field guides, discoveries
gallery, detector reviews, an interactive **Coin Identifier**, and a fully
interactive **community forum** (members post topics and replies — no plugin
required).

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

## The forum (interactive, no plugin needed)

The theme ships a **fully interactive forum** built into the theme — no plugin
or external API required:

- On activation it seeds real, clickable **boards** (grouped into sections).
- Clicking a board opens it (`single-board.php`), listing its **topics** and a
  *Start a new topic* form.
- Logged-in members create topics (the `topic` custom post type) and **reply**
  using native WordPress comments (`single-topic.php` + `comments.php`).
- Members can **attach a photo** to a topic or reply (JPEG/PNG/GIF/WebP); the
  image is added to the Media Library and shown inline. Uploads are restricted
  to logged-in users and to image types only.
- Topic/post counts and the "last post" line on the forum index update
  automatically as members post.
- Guests see a *Sign in to post* prompt; posting is restricted to logged-in
  users and protected with nonces.

To let visitors register, enable **Settings → General → Anyone can register**
and set a default role (e.g. *Subscriber*). Add your own boards anytime under
**Forum Boards → Add New** and assign a **Board Section**.

> Prefer a dedicated forum plugin instead? You can still install
> [bbPress](https://wordpress.org/plugins/bbpress/) and point the menu at it —
> the built-in forum and bbPress can coexist.

## File overview

```
relicquest-theme/
├── style.css                     Theme header + all styles (design tokens, components)
├── functions.php                 Setup, asset loading, includes
├── header.php / footer.php       Site chrome (nav, footer)
├── front-page.php                Home (hero, features, discoveries, featured guide)
├── archive.php                   Guides / Discoveries / Reviews listings
├── single.php                    Article with banner + sidebar
├── single-board.php              Forum board: topic list + new-topic form
├── single-topic.php              Forum topic: opening post + replies
├── comments.php                  Replies / comments (topics + articles)
├── page.php / index.php          Generic page / fallback
├── sidebar.php                   Latest Discoveries · Related · Coin ID CTA
├── page-templates/
│   ├── template-coin-identifier.php
│   └── template-forum.php        Forum index (board sections, live counts)
├── inc/
│   ├── post-types.php            CPTs (guide/discovery/review/board/topic) + taxonomy
│   ├── meta-boxes.php            Rating / meta-line / board stat fields
│   ├── demo-content.php          Fallback demo data
│   ├── template-helpers.php      hero(), photo(), stars(), share, menus
│   ├── forum.php                 Interactive forum: topics, replies, counts
│   └── setup.php                 Auto-create pages + seed boards on activation
└── assets/js/main.js             Nav toggle, coin identifier, forum search
```

## License

GPL-2.0-or-later.
