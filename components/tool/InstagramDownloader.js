import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import MediaResult from "./MediaResult";
import { extractShortcode } from "../../lib/instagram";

// One engine drives all 3 Instagram pages. `kind` is just for the file name.
export default function InstagramDownloader({
  kind = "instagram",
  placeholder = "https://www.instagram.com/reel/XXXXXXX/",
  helper,
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");
  const [media, setMedia] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMedia([]);

    const shortcode = extractShortcode(value);
    if (!shortcode) {
      setError("Please paste a valid Instagram link.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(
        `/api/instagram?url=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      if (!res.ok || !data.media || data.media.length === 0) {
        throw new Error(data.error || "Couldn't fetch this post.");
      }
      setMedia(data.media);
      setStatus("done");
    } catch (err) {
      setError(
        err.message ||
          "Couldn't fetch this post. It may be private or unavailable."
      );
      setStatus("error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          error={status === "error" ? error : undefined}
          inputMode="url"
        />
        <Button type="submit" disabled={status === "loading"} className="sm:w-40">
          {status === "loading" ? <Spinner className="h-4 w-4" /> : "Download"}
        </Button>
      </form>
      {helper && <p className="mt-2 text-xs text-gray-500">{helper}</p>}

      {status === "loading" && (
        <p className="mt-6 text-center text-sm text-gray-500">
          Fetching media…
        </p>
      )}

      {status === "done" && media.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {media.map((item, i) => (
            <MediaResult key={i} item={item} index={i} baseName={kind} />
          ))}
        </div>
      )}
    </div>
  );
}
