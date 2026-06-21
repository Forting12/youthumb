// Pure helpers for parsing Instagram links. Network logic lives in /api/instagram.

// Extracts the shortcode from a reel/post/tv link, or returns null.
export function extractShortcode(input) {
  if (!input || typeof input !== "string") return null;
  const url = input.trim();
  const regExp =
    /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Normalizes whatever the Instagram JSON returns into a flat media list:
// [{ type: "image" | "video", url, thumbnail }]
export function normalizeMedia(node) {
  if (!node) return [];

  const items = [];
  const pick = (n) => {
    const isVideo = n.is_video || n.media_type === 2 || !!n.video_url || !!n.video_versions;
    if (isVideo) {
      const url =
        n.video_url ||
        (n.video_versions && n.video_versions[0] && n.video_versions[0].url);
      items.push({
        type: "video",
        url,
        thumbnail:
          n.display_url ||
          (n.image_versions2 &&
            n.image_versions2.candidates &&
            n.image_versions2.candidates[0].url) ||
          null,
      });
    } else {
      const url =
        n.display_url ||
        (n.image_versions2 &&
          n.image_versions2.candidates &&
          n.image_versions2.candidates[0].url);
      items.push({ type: "image", url, thumbnail: url });
    }
  };

  // Carousel (both old graphql and new api shapes)
  const carousel =
    (node.edge_sidecar_to_children &&
      node.edge_sidecar_to_children.edges.map((e) => e.node)) ||
    node.carousel_media;

  if (carousel && carousel.length) {
    carousel.forEach(pick);
  } else {
    pick(node);
  }

  return items.filter((m) => !!m.url);
}
