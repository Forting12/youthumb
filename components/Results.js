import { useState } from "react";
import { CopyButton, ScoreBar, Pill, TagChips } from "./ui";
import { scoreColor, downloadJson } from "../lib/clientUtils";

const TABS = ["Analysis", "Titles", "Descriptions", "Tags & Hashtags", "Thumbnails", "Winner"];

function framePreview(frames, ref) {
  if (!frames) return null;
  const byLabel = frames.find((f) => f.label === ref);
  if (byLabel) return byLabel.preview;
  const m = String(ref || "").match(/(\d+)/);
  if (m) {
    const idx = Number(m[1]) - 1;
    if (frames[idx]) return frames[idx].preview;
  }
  return null;
}

export default function Results({ data, mode, warning, model, frames, onReset }) {
  const [tab, setTab] = useState("Analysis");
  if (!data) return null;

  return (
    <div className="hc-results">
      <div className="hc-results-bar">
        <div className="hc-mode">
          <Pill tone={mode === "live" ? "good" : "warn"}>
            {mode === "live" ? `Live · ${model}` : mode === "demo" ? "Demo mode" : "Demo fallback"}
          </Pill>
          {warning ? <span className="hc-warn-text">{warning}</span> : null}
        </div>
        <div className="hc-results-actions">
          <button className="hc-btn-secondary" onClick={() => downloadJson(data)}>Export JSON</button>
          <button className="hc-btn-secondary" onClick={onReset}>New analysis</button>
        </div>
      </div>

      <div className="hc-tabs">
        {TABS.map((t) => (
          <button key={t} className={`hc-tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="hc-tab-body">
        {tab === "Analysis" && <Analysis data={data} frames={frames} />}
        {tab === "Titles" && <Titles titles={data.titles} />}
        {tab === "Descriptions" && <Descriptions d={data.descriptions} />}
        {tab === "Tags & Hashtags" && <TagsTab hashtags={data.hashtags} tags={data.tags} />}
        {tab === "Thumbnails" && <Thumbnails data={data} frames={frames} />}
        {tab === "Winner" && <Winner rec={data.finalRecommendation} />}
      </div>
    </div>
  );
}

function Analysis({ data, frames }) {
  const cb = data.competitorBreakdown || {};
  const t = cb.title || {};
  const desc = cb.description || {};
  const th = cb.thumbnail || {};
  const us = data.userStrategy || {};
  return (
    <div className="hc-grid2">
      <div className="hc-card">
        <h3>Competitor title formula</h3>
        <p className="hc-formula">{t.structureFormula}</p>
        <dl className="hc-dl">
          <div><dt>Hook</dt><dd>{t.hookType}</dd></div>
          <div><dt>Curiosity gap</dt><dd>{t.curiosityGap}</dd></div>
          <div><dt>Story promise</dt><dd>{t.storyPromise}</dd></div>
          <div><dt>Intent</dt><dd><Pill tone="neutral">{t.intent}</Pill> {t.searchVsCtr}</dd></div>
        </dl>
        <TagChips items={t.powerWords} prefix="" />
      </div>

      <div className="hc-card">
        <h3>Competitor description <span className="hc-q" style={{ color: scoreColor(desc.qualityScore) }}>{desc.qualityScore}/10</span></h3>
        <p className="hc-muted">{desc.openingHook}</p>
        <div className="hc-cols">
          <div>
            <h4>Strengths</h4>
            <ul>{(desc.strengths || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div>
            <h4>Weaknesses</h4>
            <ul>{(desc.weaknesses || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="hc-card">
        <h3>Competitor thumbnail breakdown</h3>
        <p className="hc-formula">{th.formula}</p>
        <dl className="hc-dl">
          <div><dt>Main object</dt><dd>{th.subject?.mainObject}</dd></div>
          <div><dt>Composition</dt><dd>{th.composition?.shot}, {th.composition?.placement}, ~{th.composition?.fillPercent}% fill</dd></div>
          <div><dt>Background</dt><dd>{th.background?.setting}</dd></div>
        </dl>
        <TagChips items={th.attentionDevices} />
        <p className="hc-muted"><strong>Why it gets clicked:</strong> {(th.psychology || []).join(" · ")}</p>
      </div>

      <div className="hc-card hc-card-accent">
        <h3>Your video strategy</h3>
        <dl className="hc-dl">
          <div><dt>Best angle</dt><dd>{us.bestAngle}</dd></div>
          <div><dt>Hero frame</dt><dd>{us.bestObjectOrFrame}</dd></div>
          <div><dt>Emotional direction</dt><dd>{us.emotionalDirection}</dd></div>
          <div><dt>Thumbnail direction</dt><dd>{us.thumbnailStyleDirection}</dd></div>
        </dl>
        <h4>What's worth borrowing</h4>
        <ul>{(cb.worthBorrowing || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <div className="hc-card hc-span2">
        <h3>Your frame ranking</h3>
        <div className="hc-frames">
          {(data.frameRanking || []).map((f, i) => {
            const avg =
              Object.values(f.scores || {}).reduce((a, b) => a + b, 0) /
              (Object.keys(f.scores || {}).length || 1);
            const preview = framePreview(frames, f.imageRef);
            return (
              <div className={`hc-frame v-${f.verdict}`} key={i}>
                {preview ? <img src={preview} alt={f.imageRef} /> : <div className="hc-frame-noimg">{f.imageRef}</div>}
                <div className="hc-frame-meta">
                  <Pill tone={f.verdict === "best" ? "good" : f.verdict === "backup" ? "neutral" : "bad"}>{f.verdict}</Pill>
                  <strong>{avg.toFixed(1)}/10</strong>
                </div>
                <p className="hc-muted">{f.reason}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Titles({ titles }) {
  return (
    <div className="hc-list">
      {(titles || []).map((t, i) => (
        <div className="hc-card hc-title-card" key={i}>
          <div className="hc-title-head">
            <span className="hc-title-text">{t.text}</span>
            <CopyButton text={t.text} />
          </div>
          <Pill tone="neutral">{t.type}</Pill>
          <div className="hc-scores">
            {Object.entries(t.scores || {}).map(([k, v]) => (
              <ScoreBar key={k} label={k} value={v} />
            ))}
          </div>
          <p className="hc-muted">{t.notes}</p>
        </div>
      ))}
    </div>
  );
}

function Descriptions({ d }) {
  if (!d) return null;
  return (
    <div className="hc-grid2">
      {[["CTR / Entertainment", d.ctr], ["SEO / Search-friendly", d.seo]].map(([label, body], i) => (
        <div className="hc-card" key={i}>
          <div className="hc-title-head">
            <h3>{label}</h3>
            <CopyButton text={body?.text || ""} />
          </div>
          <pre className="hc-desc">{body?.text}</pre>
        </div>
      ))}
    </div>
  );
}

function TagsTab({ hashtags, tags }) {
  const allTags = []
    .concat(tags?.broad || [], tags?.mediumIntent || [], tags?.longTail || [], tags?.objectSpecific || [], tags?.channelIdentity || []);
  return (
    <div className="hc-grid2">
      <div className="hc-card">
        <div className="hc-title-head"><h3>Hashtags</h3><CopyButton text={(hashtags || []).join(" ")} /></div>
        <TagChips items={hashtags} />
      </div>
      <div className="hc-card">
        <div className="hc-title-head"><h3>YouTube tags ({allTags.length})</h3><CopyButton text={allTags.join(", ")} label="Copy all" /></div>
        {[["Broad", tags?.broad], ["Medium intent", tags?.mediumIntent], ["Long-tail", tags?.longTail], ["Object-specific", tags?.objectSpecific], ["Channel identity", tags?.channelIdentity]].map(([label, items], i) => (
          <div key={i} className="hc-taggroup">
            <h4>{label}</h4>
            <TagChips items={items} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Thumbnails({ data, frames }) {
  const prompts = data.thumbnailPrompts || [];
  return (
    <div className="hc-list">
      {(data.thumbnailConcepts || []).map((c, i) => {
        const p = prompts.find((x) => x.conceptName === c.name) || prompts[i] || {};
        const preview = framePreview(frames, c.selectedImageRef);
        return (
          <div className="hc-card hc-concept" key={i}>
            <div className="hc-concept-head">
              <h3>{c.name}</h3>
              <Pill tone="neutral">CTR {c.scores?.ctr}/10</Pill>
            </div>
            <div className="hc-concept-body">
              <div className="hc-concept-img">
                {preview ? <img src={preview} alt={c.selectedImageRef} /> : <div className="hc-frame-noimg">{c.selectedImageRef}</div>}
                <span className="hc-thumb-label">{c.selectedImageRef}</span>
              </div>
              <div className="hc-concept-specs">
                <dl className="hc-dl">
                  <div><dt>Crop</dt><dd>{c.crop}</dd></div>
                  <div><dt>Focal subject</dt><dd>{c.focalSubject}</dd></div>
                  <div><dt>Treatment</dt><dd>{[c.zoomIn && "zoom in", c.darkenBackground && "darken bg", c.isolateObject && "isolate object"].filter(Boolean).join(", ")}; {c.addTextureVignetteContrast}</dd></div>
                  <div><dt>Attention device</dt><dd>{c.attentionDevice}</dd></div>
                  <div><dt>Text</dt><dd>{c.thumbnailText ? `“${c.thumbnailText}”` : "none"}</dd></div>
                </dl>
                <p className="hc-muted"><strong>Why it works:</strong> {c.whyItWorks}</p>
              </div>
            </div>
            <div className="hc-prompts">
              <div className="hc-prompt">
                <div className="hc-title-head"><h4>Realistic prompt</h4><CopyButton text={p.realisticPrompt || ""} /></div>
                <p>{p.realisticPrompt}</p>
              </div>
              <div className="hc-prompt">
                <div className="hc-title-head"><h4>Dramatic CTR prompt</h4><CopyButton text={p.dramaticPrompt || ""} /></div>
                <p>{p.dramaticPrompt}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Winner({ rec }) {
  if (!rec) return null;
  return (
    <div className="hc-card hc-winner">
      <h3>🏆 If you only publish one version</h3>
      <div className="hc-winner-grid">
        <div><span className="hc-winner-k">Title</span><p>{rec.title}</p><CopyButton text={rec.title} /></div>
        <div><span className="hc-winner-k">Thumbnail concept</span><p>{rec.thumbnailConceptName}</p></div>
        <div><span className="hc-winner-k">Description mode</span><p>{rec.descriptionMode?.toUpperCase()}</p></div>
      </div>
      <p className="hc-muted"><strong>Why this beats the competitor:</strong> {rec.rationale}</p>
    </div>
  );
}
