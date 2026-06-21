// SEO landing pages. Add an entry to create a new static page at /<slug>.
// `tool` selects which Instagram engine variant renders.
export const SEO_PAGES = {
  "download-instagram-reels": {
    tool: "reel",
    heading: "Download Instagram Reels",
    title: "Download Instagram Reels (HD, No Watermark)",
    description:
      "Free Instagram Reels downloader. Save any public Reel as HD MP4 with no watermark.",
    subheading: "Save any public Reel as HD MP4 — free and watermark-free.",
    intro:
      "Looking to download Instagram Reels? Paste a Reel link and save the original MP4 in seconds. No app, no login, and no watermark added to your video.",
    target: "/instagram-reel-downloader",
  },
  "save-instagram-video": {
    tool: "reel",
    heading: "Save Instagram Video",
    title: "Save Instagram Video Online — Free",
    description:
      "Save Instagram videos and Reels online for free. Paste a link, download the MP4.",
    subheading: "Paste a link and save the original video file.",
    intro:
      "Save Instagram videos to your phone or computer without screen recording. Paste the post or Reel link and download the original quality MP4.",
    target: "/instagram-reel-downloader",
  },
  "instagram-photo-download-full-size": {
    tool: "photo",
    heading: "Download Instagram Photos in Full Size",
    title: "Download Instagram Photos Full Size",
    description:
      "Download Instagram photos at full original resolution — free, no login.",
    subheading: "Get the original full-resolution image, not a screenshot.",
    intro:
      "Screenshots crop and compress your image. Paste a public photo link to download the original, full-size file exactly as it was uploaded.",
    target: "/instagram-photo-downloader",
  },
};

export const SEO_SLUGS = Object.keys(SEO_PAGES);
