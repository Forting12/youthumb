import { useState } from "react";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { downloadFile } from "../../lib/download";

// Renders a single media item (image or video) with a real download button.
export default function MediaResult({ item, index, baseName }) {
  const [busy, setBusy] = useState(false);
  const ext = item.type === "video" ? "mp4" : "jpg";
  const filename = `${baseName}-${index + 1}.${ext}`;

  const handleDownload = async () => {
    setBusy(true);
    try {
      await downloadFile(item.url, filename);
    } catch {
      // Fallback: open the raw file in a new tab so the user can save manually.
      window.open(item.url, "_blank");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-video w-full bg-gray-100">
        {item.type === "video" ? (
          <video
            src={item.url}
            poster={item.thumbnail || undefined}
            controls
            className="h-full w-full object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnail || item.url}
            alt={`Media ${index + 1}`}
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-xs uppercase text-gray-500">
          {item.type} · #{index + 1}
        </span>
        <Button onClick={handleDownload} disabled={busy}>
          {busy ? <Spinner className="h-4 w-4" /> : "Download"}
        </Button>
      </div>
    </div>
  );
}
