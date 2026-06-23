import { useState } from "react";
import { Field, Text, Area, Slider, ImageGrid } from "./ui";
import { parseYouTubeId, youTubeThumbnailUrl, urlToImage } from "../lib/clientUtils";
import { TONES } from "../lib/promptTones";

export function CompetitorPanel({ value, onChange, thumb, setThumb }) {
  const [ytUrl, setYtUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (v) => onChange({ ...value, [k]: v });

  async function grabFromYouTube() {
    const id = parseYouTubeId(ytUrl);
    if (!id) return;
    setBusy(true);
    const img = await urlToImage(youTubeThumbnailUrl(id), "competitor_thumbnail.jpg");
    setThumb([img]);
    setBusy(false);
  }

  return (
    <section className="hc-panel">
      <h2 className="hc-panel-title">1 · Competitor Video</h2>
      <p className="hc-panel-sub">Paste what the winning competitor published. This is what we reverse-engineer.</p>

      <Field label="Competitor title">
        <Text value={value.title} onChange={set("title")} placeholder="What We Found Buried Shocked The World" />
      </Field>
      <Field label="Competitor description">
        <Area value={value.description} onChange={set("description")} rows={4} placeholder="Paste the competitor's full description…" />
      </Field>
      <Field label="Competitor hashtags">
        <Text value={value.hashtags} onChange={set("hashtags")} placeholder="#treasure #metaldetecting #buried" />
      </Field>

      <Field label="Competitor thumbnail" hint="(upload, or pull from a YouTube link)">
        <div className="hc-yt-grab">
          <Text value={ytUrl} onChange={setYtUrl} placeholder="Paste competitor YouTube URL…" />
          <button className="hc-btn-secondary" onClick={grabFromYouTube} disabled={busy}>
            {busy ? "Grabbing…" : "Grab thumbnail"}
          </button>
        </div>
        <ImageGrid images={thumb} onAdd={(imgs) => setThumb(imgs)} onRemove={() => setThumb([])} single max={1} />
      </Field>

      <details className="hc-more">
        <summary>Optional: screenshots, timestamps, transcript</summary>
        <Field label="Thumbnail description" hint="(if you didn't upload an image)">
          <Area value={value.thumbnailDescription} onChange={set("thumbnailDescription")} rows={2} placeholder="Describe the competitor thumbnail in words…" />
        </Field>
        <Field label="Key timestamps / moments">
          <Area value={value.timestamps} onChange={set("timestamps")} rows={2} placeholder="0:00 intro, 4:12 the reveal…" />
        </Field>
        <Field label="Transcript / summary">
          <Area value={value.transcript} onChange={set("transcript")} rows={3} placeholder="Paste transcript or a short summary…" />
        </Field>
      </details>
    </section>
  );
}

export function UserVideoPanel({ value, onChange, frames, setFrames }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });

  return (
    <section className="hc-panel">
      <h2 className="hc-panel-title">2 · Your Video</h2>
      <p className="hc-panel-sub">Your own content and assets. Everything we generate is built from these.</p>

      <Field label="Your rough title / idea">
        <Text value={value.title} onChange={set("title")} placeholder="Found a strange old jar while detecting" />
      </Field>
      <Field label="Your rough description / summary">
        <Area value={value.description} onChange={set("description")} rows={3} placeholder="What actually happens in your video…" />
      </Field>

      <Field label="Your frames / screenshots" hint="(3–20, we rank them for thumbnail use)">
        <ImageGrid images={frames} onAdd={(imgs) => setFrames([...frames, ...imgs])} onRemove={(i) => setFrames(frames.filter((_, x) => x !== i))} max={20} />
      </Field>

      <div className="hc-row">
        <Field label="Language">
          <Text value={value.language} onChange={set("language")} placeholder="English" />
        </Field>
        <Field label="Target country / audience">
          <Text value={value.country} onChange={set("country")} placeholder="USA" />
        </Field>
      </div>

      <Field label="Tone">
        <div className="hc-tones">
          {TONES.map((t) => (
            <button
              key={t}
              className={`hc-tone ${value.tone === t ? "is-active" : ""}`}
              onClick={() => set("tone")(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Realism vs Cinematic">
        <Slider value={value.realism} onChange={set("realism")} leftLabel="Cinematic / staged" rightLabel="Strictly real" />
      </Field>
      <Field label="Clickbait tolerance">
        <Slider value={value.clickbait} onChange={set("clickbait")} leftLabel="Safe / advertiser-friendly" rightLabel="Max CTR" />
      </Field>

      <details className="hc-more">
        <summary>Optional: timestamps & transcript</summary>
        <Field label="Your key moments / timestamps">
          <Area value={value.timestamps} onChange={set("timestamps")} rows={2} placeholder="1:30 first signal, 6:40 the dig…" />
        </Field>
        <Field label="Your transcript / script / storyline">
          <Area value={value.transcript} onChange={set("transcript")} rows={3} placeholder="Paste your transcript or story beats…" />
        </Field>
      </details>
    </section>
  );
}
