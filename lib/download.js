// Client helper: force a real "Save as" for a (cross-origin) media URL by
// streaming it through our same-origin proxy, then saving the blob.
export async function downloadFile(url, filename) {
  const proxy = `/api/download?url=${encodeURIComponent(
    url
  )}&name=${encodeURIComponent(filename)}`;

  const res = await fetch(proxy);
  if (!res.ok) throw new Error("Download failed");

  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}
