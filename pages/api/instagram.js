import { extractShortcode, normalizeMedia } from "../../lib/instagram";

// Server-side fetch of public Instagram media. Instagram changes these
// endpoints often and blocks datacenter IPs — if this stops working,
// swap the fetch below for a maintained third-party API. This is the one
// file you maintain.
const IG_APP_ID = "936619743392459";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/121.0 Safari/537.36";

// Demo media used only when MOCK_INSTAGRAM=1 (local testing without internet).
function mockMedia() {
  const svg = (label, color) =>
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>` +
        `<rect width='100%' height='100%' fill='${color}'/>` +
        `<text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='32' ` +
        `text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
    );
  return [
    { type: "image", url: svg("Sample 1", "#2563eb"), thumbnail: svg("Sample 1", "#2563eb") },
    { type: "image", url: svg("Sample 2", "#7c3aed"), thumbnail: svg("Sample 2", "#7c3aed") },
    { type: "image", url: svg("Sample 3", "#059669"), thumbnail: svg("Sample 3", "#059669") },
  ];
}

export default async function handler(req, res) {
  const { url } = req.query;
  const shortcode = extractShortcode(url);

  if (!shortcode) {
    return res.status(400).json({ error: "Invalid Instagram link." });
  }

  if (process.env.MOCK_INSTAGRAM === "1") {
    return res.status(200).json({ shortcode, media: mockMedia() });
  }

  try {
    const apiUrl = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;
    const r = await fetch(apiUrl, {
      headers: {
        "User-Agent": UA,
        "x-ig-app-id": IG_APP_ID,
        Accept: "application/json",
      },
    });

    if (!r.ok) throw new Error(`Instagram returned ${r.status}`);

    const data = await r.json();
    // Handle both the graphql shape and the items[] shape.
    const node =
      (data.graphql && data.graphql.shortcode_media) ||
      (data.items && data.items[0]) ||
      null;

    const media = normalizeMedia(node);
    if (!media.length) {
      return res
        .status(404)
        .json({ error: "No downloadable media found for this link." });
    }

    // Cache successful lookups briefly at the edge.
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
    return res.status(200).json({ shortcode, media });
  } catch (err) {
    return res.status(502).json({
      error:
        "Couldn't fetch this post. It may be private, removed, or temporarily blocked.",
    });
  }
}
