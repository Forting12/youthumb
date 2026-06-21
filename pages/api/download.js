// Same-origin proxy so the browser can force-save a cross-origin media file
// with a clean filename. Host allowlist prevents this becoming an open proxy.
const ALLOWED_HOSTS = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
  "ytimg.com",
  "img.youtube.com",
];

function isAllowed(hostname) {
  return ALLOWED_HOSTS.some(
    (h) => hostname === h || hostname.endsWith(`.${h}`)
  );
}

export default async function handler(req, res) {
  const { url, name } = req.query;

  let target;
  try {
    target = new URL(url);
  } catch {
    return res.status(400).send("Invalid url");
  }

  if (target.protocol !== "https:" || !isAllowed(target.hostname)) {
    return res.status(400).send("Host not allowed");
  }

  try {
    const upstream = await fetch(target.toString());
    if (!upstream.ok) return res.status(502).send("Upstream error");

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";
    const filename = (name || "download").replace(/[^a-zA-Z0-9._-]/g, "_");

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    const buffer = Buffer.from(await upstream.arrayBuffer());
    return res.status(200).send(buffer);
  } catch {
    return res.status(502).send("Fetch failed");
  }
}
