import { useState } from "react";
import { CompetitorPanel, UserVideoPanel } from "../components/Panels";
import Results from "../components/Results";

const EMPTY_COMPETITOR = {
  title: "",
  description: "",
  hashtags: "",
  thumbnailDescription: "",
  timestamps: "",
  transcript: "",
};

const EMPTY_USER = {
  title: "",
  description: "",
  language: "English",
  country: "",
  audience: "",
  tone: "mystery",
  realism: 60,
  clickbait: 50,
  timestamps: "",
  transcript: "",
};

export default function Home() {
  const [competitor, setCompetitor] = useState(EMPTY_COMPETITOR);
  const [user, setUser] = useState(EMPTY_USER);
  const [compThumb, setCompThumb] = useState([]); // [{...image}]
  const [frames, setFrames] = useState([]); // [{...image}]

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null); // { result, mode, warning, model }

  const canRun = competitor.title.trim() || competitor.description.trim() || compThumb.length;

  async function run() {
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const payload = {
        competitor,
        user,
        competitorThumbnail: compThumb[0] && compThumb[0].data ? compThumb[0] : null,
        userImages: frames.map((f) => ({ label: f.label, mediaType: f.mediaType, data: f.data })),
      };
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      setResponse(json);
      // smooth scroll to results
      setTimeout(() => document.getElementById("hc-results-anchor")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResponse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="hc-app">
      <header className="hc-header">
        <div className="hc-logo">⛏️ HunterCTR <span>AI</span></div>
        <p className="hc-tagline">
          Reverse-engineer a competitor. Rebuild the winning hook with <em>your</em> footage.
          Publish-ready titles, descriptions, tags &amp; thumbnail concepts for treasure / mystery / discovery videos.
        </p>
      </header>

      <main className="hc-main">
        <div className="hc-panels">
          <CompetitorPanel value={competitor} onChange={setCompetitor} thumb={compThumb} setThumb={setCompThumb} />
          <UserVideoPanel value={user} onChange={setUser} frames={frames} setFrames={setFrames} />
        </div>

        <div className="hc-runbar">
          <button className="hc-btn-primary" onClick={run} disabled={loading || !canRun}>
            {loading ? "Analyzing competitor & generating…" : "Reverse-engineer & generate package →"}
          </button>
          {!canRun && <span className="hc-hint">Add at least a competitor title, description, or thumbnail to begin.</span>}
          {error && <span className="hc-error">{error}</span>}
        </div>

        <div id="hc-results-anchor" />
        {response && (
          <Results
            data={response.result}
            mode={response.mode}
            warning={response.warning}
            model={response.model}
            frames={frames}
            onReset={reset}
          />
        )}
      </main>

      <footer className="hc-footer">
        HunterCTR AI · competitor-inspired, never cloned · built for long-form treasure &amp; mystery content
      </footer>
    </div>
  );
}
