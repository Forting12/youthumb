// Static demo content for the Treasure Hunting site.
// In a real deployment this would come from a CMS / API / database.

export const forumCategories = [
  {
    section: 'Featured Categories',
    boards: [
      {
        title: 'Treasure Hunting Q&A and Tips',
        description: 'Ask questions and share hard-won advice with the community.',
        topics: 1280,
        posts: 9420,
        last: { title: 'Best spots after heavy rain?', author: 'RiverRat', when: '12m ago' },
      },
      {
        title: 'Metal Detector Settings and Setup',
        description: 'Dial in your machine for the ground you hunt.',
        topics: 405,
        posts: 3110,
        last: { title: 'Ground balance on wet sand', author: 'BeachComber', when: '1h ago' },
      },
    ],
  },
  {
    section: 'Metal Detecting',
    boards: [
      {
        title: 'Coin & Relic Hunting',
        description: 'Old coins, buttons, buckles and the stories behind them.',
        topics: 905,
        posts: 7340,
        last: { title: '1853 seated dime in the park', author: 'DigginDan', when: '34m ago' },
      },
      {
        title: 'Beach & Water Detecting',
        description: 'Surf, sand and the gold that hides in it.',
        topics: 612,
        posts: 4980,
        last: { title: 'Lost ring recovery success', author: 'SaltyHunter', when: '2h ago' },
      },
    ],
  },
  {
    section: 'Gold Prospecting',
    boards: [
      {
        title: 'Sluicing & Panning Discovery',
        description: 'Working creeks and rivers for placer gold.',
        topics: 503,
        posts: 3890,
        last: { title: 'First pickers of the season', author: 'CreekFever', when: '5h ago' },
      },
      {
        title: 'Equipment & Gear Setup',
        description: 'Highbankers, dredges, pans and DIY rigs.',
        topics: 288,
        posts: 2110,
        last: { title: 'DIY highbanker build log', author: 'BuildItBob', when: '1d ago' },
      },
      {
        title: 'Gold Prospecting & Relic Hunting',
        description: 'Where prospecting and detecting overlap.',
        topics: 199,
        posts: 1540,
        last: { title: 'Bench gravels worth it?', author: 'PaydirtPete', when: '2d ago' },
      },
    ],
  },
]

export const coinResults = [
  {
    name: '1871 Indian Head Cent',
    detail: 'Copper · USA · ~$15–$40',
    confidence: 0.94,
    blurb: 'Worn but legible date. A solid common-date find for any collection.',
  },
  {
    name: '1866 Spanish Silver Real',
    detail: 'Silver · Spain · ~$60–$120',
    confidence: 0.88,
    blurb: 'Colonial-era silver. Check edge wear before cleaning.',
  },
  {
    name: '1877 Morgan Silver Dollar',
    detail: 'Silver · USA · ~$45–$200',
    confidence: 0.82,
    blurb: 'Popular large silver dollar. Grade drives the value sharply.',
  },
  {
    name: '1908 Liberty Head Eagle',
    detail: 'Gold · USA · ~$900+',
    confidence: 0.71,
    blurb: 'Possible gold strike — verify weight and diameter.',
  },
  {
    name: '1943 Steel Wheat Cent',
    detail: 'Zinc-coated steel · USA · ~$0.50',
    confidence: 0.69,
    blurb: 'Wartime steel cent. Common, but a fun era piece.',
  },
  {
    name: '1787 Fugio Cent',
    detail: 'Copper · USA · ~$300+',
    confidence: 0.63,
    blurb: 'Early American copper. Authentication strongly recommended.',
  },
]

export const discoveries = [
  { title: 'Hoard of Roman denarii unearthed', meta: 'Field find · Somerset' },
  { title: 'Gold class ring recovered from surf', meta: 'Beach hunt · Florida' },
  { title: 'Civil War belt plate near old camp', meta: 'Relic hunt · Virginia' },
  { title: 'Half-ounce nugget from bench gravels', meta: 'Prospecting · Yukon' },
]

export const guides = [
  {
    slug: 'finding-buried-treasure',
    title: 'Tips for Finding Buried Treasure',
    excerpt:
      'Research, patience and the right ground. A practical field guide to turning hunches into finds.',
    category: 'Field Guide',
    readTime: '8 min read',
    author: 'M. Calloway',
    date: 'June 2026',
    body: [
      { type: 'p', text: 'Every great find starts long before the coil hits the dirt. The hunters who consistently pull silver and gold out of the ground are the ones who do their homework, read the landscape, and return to promising spots again and again. This guide walks through the habits that separate a lucky day from a productive season.' },
      { type: 'h2', text: 'Research Historical Maps and Records' },
      { type: 'p', text: 'Old plat maps, postcards and county histories reveal where people gathered a century ago: fairgrounds, swimming holes, churches, and homesteads that no longer appear on modern maps. Overlay a historical map on satellite imagery and look for the gaps — a lone tree line or a dip in a field often marks a vanished structure.' },
      { type: 'p', text: 'Newspaper archives are gold of a different kind. Reports of lost payrolls, buried caches and old picnic grounds give you targets that casual hunters never think to check.' },
      { type: 'h2', text: 'Read the Ground' },
      { type: 'p', text: 'Mineralization, moisture and soil disturbance all change how your detector behaves. After heavy rain, conductive targets read deeper and cleaner. Slow down over old foundations and pathways where foot traffic concentrated coins and small relics.' },
      { type: 'ul', items: [
        'Grid your search so you cover ground methodically, not randomly.',
        'Lower your sweep speed near hot spots — overlap each pass.',
        'Dig the iffy signals; deep silver often sounds broken.',
      ] },
      { type: 'h2', text: 'Get Permission and Hunt Responsibly' },
      { type: 'p', text: 'Always secure permission for private land and know the rules for public sites. Fill every hole, pack out trash you dig, and report significant historical finds where the law requires it. Good stewardship keeps sites open for the hunters who follow you.' },
    ],
  },
  {
    slug: 'choosing-your-first-detector',
    title: 'How to Choose Your First Metal Detector',
    excerpt:
      'VLF vs. PI, single vs. multi-frequency, and what actually matters for a beginner budget.',
    category: 'Gear',
    readTime: '6 min read',
    author: 'D. Reyes',
    date: 'May 2026',
    body: [
      { type: 'p', text: 'The best beginner detector is the one you will actually carry. Weight, simplicity and a sensible price matter more than chasing the deepest machine on the market.' },
      { type: 'h2', text: 'Match the Machine to Your Ground' },
      { type: 'p', text: 'Single-frequency VLF detectors are versatile and affordable for parks and fields. If you plan to hunt wet salt beaches, look at multi-frequency or pulse-induction models that ignore salt and mineralization.' },
      { type: 'h2', text: 'Spend on the Coil and the Headphones' },
      { type: 'p', text: 'A good coil and a decent pair of headphones improve your results more than a marginally fancier control box. Learn one machine deeply before upgrading.' },
    ],
  },
  {
    slug: 'best-metal-detectors-reviewed',
    title: 'Best Metal Detectors of the Year, Reviewed',
    excerpt:
      'Hands-on impressions across budget, all-rounder and beach-specialist categories.',
    category: 'Reviews',
    readTime: '11 min read',
    author: 'The Editors',
    date: 'April 2026',
    body: [
      { type: 'p', text: 'We field-tested this year’s most talked-about detectors across parks, fields and surf to find the standouts in each category.' },
      { type: 'h2', text: 'Best Overall' },
      { type: 'p', text: 'Balanced depth, intuitive tones and a comfortable build make this the machine we reached for most often.' },
      { type: 'h2', text: 'Best Value' },
      { type: 'p', text: 'You give up a few features, but the core performance punches well above its price.' },
    ],
  },
]

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Discoveries', href: '/discoveries' },
  { label: 'Guides', href: '/guides' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Coin Identifier', href: '/coin-identifier' },
  { label: 'About', href: '/about' },
]

export const footerColumns = [
  {
    heading: 'Featured',
    links: [
      { label: 'Latest Finds', href: '/discoveries' },
      { label: 'Top Guides', href: '/guides' },
      { label: 'Coin Identifier', href: '/coin-identifier' },
    ],
  },
  {
    heading: 'Guides',
    links: [
      { label: 'Getting Started', href: '/guides' },
      { label: 'Gear & Setup', href: '/guides' },
      { label: 'Field Techniques', href: '/guides' },
    ],
  },
  {
    heading: 'Reviews',
    links: [
      { label: 'Detectors', href: '/reviews' },
      { label: 'Pinpointers', href: '/reviews' },
      { label: 'Accessories', href: '/reviews' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Forum', href: '/forum' },
      { label: 'Q&A', href: '/forum' },
      { label: 'About Us', href: '/about' },
    ],
  },
]
