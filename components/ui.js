import { useState } from "react";
import copy from "copy-to-clipboard";
import { fileToImage, scoreColor } from "../lib/clientUtils";

export function Field({ label, hint, children }) {
  return (
    <label className="hc-field">
      <span className="hc-field-label">
        {label}
        {hint ? <em className="hc-field-hint"> {hint}</em> : null}
      </span>
      {children}
    </label>
  );
}

export function Text({ value, onChange, placeholder }) {
  return (
    <input
      className="hc-input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Area({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      className="hc-input hc-textarea"
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Slider({ value, onChange, leftLabel, rightLabel }) {
  return (
    <div className="hc-slider-wrap">
      <input
        className="hc-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="hc-slider-labels">
        <span>{leftLabel}</span>
        <strong>{value}</strong>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function ImageGrid({ images, onAdd, onRemove, max = 20, single = false }) {
  async function handleFiles(fileList) {
    const files = Array.from(fileList).slice(0, max - images.length);
    const imgs = await Promise.all(files.map(fileToImage));
    onAdd(single ? imgs.slice(0, 1) : imgs);
  }
  return (
    <div>
      <label className="hc-dropzone">
        <input
          type="file"
          accept="image/*"
          multiple={!single}
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span>+ {single ? "Upload image" : `Upload images (up to ${max})`}</span>
      </label>
      {images.length > 0 && (
        <div className="hc-thumbs">
          {images.map((img, i) => (
            <div className="hc-thumb" key={i}>
              <img src={img.preview} alt={img.label} />
              <button className="hc-thumb-x" onClick={() => onRemove(i)} title="Remove">
                ×
              </button>
              <span className="hc-thumb-label">{img.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CopyButton({ text, label = "Copy" }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="hc-copy"
      onClick={() => {
        copy(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

export function ScoreBar({ label, value }) {
  return (
    <div className="hc-score">
      <span className="hc-score-label">{label}</span>
      <span className="hc-score-track">
        <span
          className="hc-score-fill"
          style={{ width: `${(value / 10) * 100}%`, background: scoreColor(value) }}
        />
      </span>
      <span className="hc-score-num">{value}/10</span>
    </div>
  );
}

export function Pill({ children, tone }) {
  return <span className={`hc-pill hc-pill-${tone || "neutral"}`}>{children}</span>;
}

export function TagChips({ items, prefix = "" }) {
  if (!items || !items.length) return null;
  return (
    <div className="hc-chips">
      {items.map((t, i) => (
        <span className="hc-chip" key={i}>
          {prefix}
          {t}
        </span>
      ))}
    </div>
  );
}
