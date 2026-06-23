// Browser-side helpers for HunterCTR AI.

export function parseYouTubeId(url) {
  if (!url) return null;
  const re = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const m = String(url).match(re);
  return m && m[1] && m[1].length === 11 ? m[1] : null;
}

export function youTubeThumbnailUrl(id, code = "maxresdefault") {
  return `https://img.youtube.com/vi/${id}/${code}.jpg`;
}

// Read a File into { label, mediaType, data(base64, no prefix), preview(dataURL) }
export function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const comma = dataUrl.indexOf(",");
      resolve({
        label: file.name,
        mediaType: file.type || "image/jpeg",
        data: dataUrl.slice(comma + 1),
        preview: dataUrl,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Fetch a remote image (e.g. a YouTube thumbnail) and convert to base64.
// Falls back to just the URL preview if the fetch is blocked by CORS.
export async function urlToImage(url, label = "competitor_thumbnail") {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const file = new File([blob], label, { type: blob.type || "image/jpeg" });
    return await fileToImage(file);
  } catch (_) {
    return { label, mediaType: "image/jpeg", data: null, preview: url, remote: true };
  }
}

export function scoreColor(score) {
  if (score >= 8) return "#16a34a";
  if (score >= 6) return "#65a30d";
  if (score >= 4) return "#d97706";
  return "#dc2626";
}

export function downloadJson(obj, filename = "hunterctr-package.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
