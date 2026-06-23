# HunterCTR AI — Product Blueprint

A competitor‑driven YouTube optimization engine for **long‑form** videos in the
treasure‑hunting / metal‑detecting / buried‑discovery / mystery‑excavation /
ancient‑relic / cinematic‑treasure niches.

It is **not** a generic YouTube SEO generator. It is a
**competitor reverse‑engineering + creator adaptation** tool: take a competitor
video as inspiration, then produce a *stronger, original* package built from the
creator's **own** footage and images.

---

## 1. Product vision

```
Competitor video  +  your screenshots/idea  ──▶  HunterCTR AI  ──▶  publish-ready package
   (inspiration)        (your real assets)        (analyse+adapt)      title · description ·
                                                                       tags · hashtags ·
                                                                       thumbnail concept + prompt
```

Goal: in **one session**, a creator goes from "a competitor is crushing this
topic" to a publish‑ready title, description, tags, hashtags and a thumbnail
concept rebuilt from their own images.

### Non‑negotiable product rules
1. Never clone the competitor exactly — borrow **patterns**, not **identity**.
2. Always prefer the creator's own image assets for the thumbnail.
3. If the competitor's hero object is missing, adapt the visual **logic** to the
   closest object the creator *does* have.
4. If the creator's video can't honestly support the competitor's promise, don't
   force it — pick a truthful angle.
5. Stay competitive but believable; only lean dramatic/cinematic when the
   creator's realism & clickbait settings allow it.
6. Feel like a strategic growth assistant, not a text generator.

---

## 2. Feature architecture

| Layer | Module | Responsibility |
|-------|--------|----------------|
| UI | `pages/index.js` | Orchestrates state, fires `/api/analyze`, renders results |
| UI | `components/Panels.js` | Competitor Input Panel + User Video Input Panel |
| UI | `components/Results.js` | Analysis Dashboard + Output Tabs |
| UI | `components/ui.js` | Shared primitives (fields, sliders, image grid, scores, chips) |
| Client | `lib/clientUtils.js` | YouTube‑id parsing, thumbnail fetch, file→base64, export |
| Prompt | `lib/prompt.js` | **System prompt + user content builder + output schema** |
| Server | `pages/api/analyze.js` | Calls Claude (vision) or returns demo output |
| Fallback | `lib/mock.js` | Personalised demo result (same schema) for offline use |

### Data flow
```
Panels (state) ──serialize──▶ POST /api/analyze
  competitor{}, user{}, competitorThumbnail(base64), userImages[](base64)
        │
        ▼
  lib/prompt.buildMessages() ──▶ Claude messages API (text + image blocks)
        │                                   │
        │                          (no key / error)
        ▼                                   ▼
  extractJson(model text)            lib/mock.buildMockResult()
        └──────────────┬────────────────────┘
                       ▼
            { result, mode, warning } ──▶ Results tabs
```

---

## 3. Primary user flow

**Step 1 — Competitor input.** Title, description, hashtags, thumbnail
(upload *or* auto‑grab from a YouTube URL), optional screenshots/timestamps/
transcript.

**Step 2 — Your video input.** Rough title/idea, rough summary, 3–20 frames,
language, target country/audience, tone, **realism slider** (cinematic↔real),
**clickbait‑tolerance slider**, optional timestamps/transcript.

**Step 3 — Analysis.** Reverse‑engineer the competitor across metadata hook,
emotional promise, curiosity structure, thumbnail logic, audience intent,
keyword angle, and *what makes it clickable*; rank the creator's frames.

**Step 4 — Generation.** 5–10 titles, 2 descriptions (CTR + SEO), 15–40 grouped
tags, 5–10 hashtags, 2–5 thumbnail concepts (built from the creator's images),
realistic + dramatic image prompts, and a single final winner.

---

## 4. Prompt architecture

Two‑part prompt, defined entirely in `lib/prompt.js`.

### System prompt (the strategist)
Encodes role, niche, the six non‑negotiable rules, the full analysis checklist
(title / description / thumbnail / frame‑ranking), the generation checklist, and
the **strict JSON output contract**. It instructs the model to honour the
creator's language, tone, realism and clickbait settings, and to keep thumbnail
text ≤ 4 words.

### User content (the brief — multimodal)
A single user turn containing:
- a JSON `brief` (competitor fields + user‑video fields + an image manifest), then
- the **competitor thumbnail** as an `image` block (real vision analysis), then
- each **user frame** as a labelled `image` block ("rank it").

This lets the model literally *see* the competitor thumbnail and the creator's
candidate frames, rather than guessing from text.

### Why JSON‑only
A fixed schema (below) lets the UI render rich, comparable widgets (score bars,
frame cards, concept cards) and makes "Export to YouTube Studio" trivial.
`pages/api/analyze.js` extracts the first balanced JSON object and falls back to
the demo generator if parsing fails — the user always gets a usable package.

---

## 5. Output schema (contract)

The single source of truth is `OUTPUT_SCHEMA` in `lib/prompt.js`. Shape:

```jsonc
{
  "competitorBreakdown": {
    "title": { "hookType","curiosityGap","emotionalTriggers[]","powerWords[]",
               "nicheKeywords[]","storyPromise","intent","searchVsCtr","structureFormula" },
    "description": { "openingHook","repeatsTitlePromise","keywordDensity","nichePhrases[]",
               "suspenseFraming","ctaPresent","hashtagPlacement","qualityScore",
               "strengths[]","weaknesses[]" },
    "thumbnail": {
      "subject": { "mainObject","focalCount","hasHand","hasFace","partiallyHidden" },
      "composition": { "shot","placement","fillPercent","cameraAngle","cropTightness","negativeSpace" },
      "background": { "setting","blurred","supportsMystery" },
      "attentionDevices[]",
      "text": { "present","wordCount","placement","style","wording","whyImageEnough" },
      "psychology[]", "formula"
    },
    "emotionalAngle", "worthBorrowing[]"
  },
  "userStrategy": { "bestAngle","bestObjectOrFrame","emotionalDirection","thumbnailStyleDirection" },
  "titles": [ { "text","type","scores":{ctr,clarity,curiosity,nicheFit,originality,clickbaitRisk},"notes" } ],
  "descriptions": { "ctr":{"text"}, "seo":{"text"} },
  "hashtags": ["#..."],
  "tags": { "broad[]","mediumIntent[]","longTail[]","objectSpecific[]","channelIdentity[]" },
  "frameRanking": [ { "imageRef","scores":{clarity,objectVisibility,tension,mysteryValue,
                       simplicity,contrast,recognizability,stopScroll},"verdict","reason" } ],
  "thumbnailConcepts": [ { "name","selectedImageRef","crop","focalSubject","zoomIn",
                       "darkenBackground","isolateObject","addTextureVignetteContrast",
                       "attentionDevice","thumbnailText","whyItWorks",
                       "scores":{ctr,originality,nicheFit,realism,clickbaitRisk} } ],
  "thumbnailPrompts": [ { "conceptName","realisticPrompt","dramaticPrompt" } ],
  "finalRecommendation": { "title","thumbnailConceptName","descriptionMode","rationale" }
}
```

### Scoring system
- **Titles:** ctr / clarity / curiosity / nicheFit / originality / clickbaitRisk (0–10).
- **Frames:** clarity / objectVisibility / tension / mysteryValue / simplicity /
  contrast / recognizability / stopScroll (0–10), with a `best | backup | avoid` verdict.
- **Thumbnail concepts:** ctr / originality / nicheFit / realism / clickbaitRisk (0–10).

---

## 6. The thumbnail recreation engine (critical)

The competitor thumbnail is analysed structurally (subject → composition →
background → attention devices → text → psychology → **rebuildable formula**).
That formula is then **mapped onto the creator's own images**:

1. Rank the user's frames by thumbnail potential.
2. Pick the best 1–3 and explain *why*.
3. Map the competitor's visual formula onto those frames.
4. Emit 2–5 concepts, each with crop / zoom / background treatment / attention
   device + placement / optional ≤4‑word text / why it works.
5. Emit a **realistic** prompt and a **dramatic CTR** prompt per concept — each
   instructed to use the *user's* image as the base, keep the real object, stay
   readable at small size, and only exaggerate when realism settings allow.

The engine never outputs "copy the competitor thumbnail" — always
"inspired by the competitor hook, rebuilt from your content".

---

## 7. UI modules (as built)

- **A · Competitor Input Panel** — title, description, hashtags, thumbnail
  upload, *grab‑from‑YouTube‑URL*, and an "optional" disclosure for thumbnail
  description / timestamps / transcript.
- **B · User Video Input Panel** — rough title, rough description, frame
  upload (3–20), language, country/audience, tone selector, realism slider,
  clickbait slider, optional timestamps/transcript.
- **C · Analysis Dashboard** — competitor title formula, description score with
  strengths/weaknesses, thumbnail formula + attention devices + psychology,
  your video strategy, and a visual **frame ranking** grid.
- **D · Output Tabs** — Titles · Descriptions · Tags & Hashtags · Thumbnails
  (concepts + prompts) · Winner. Plus **Export JSON**.

---

## 8. Running it

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY to enable the live engine
npm run dev                  # http://localhost:3000
```

- **No key →** fully‑functional **demo mode** (personalised mock, same schema).
- **With key →** live Claude (vision) analysis. Model via `HUNTER_MODEL`
  (default `claude-opus-4-8`; `claude-sonnet-4-6` for cheaper/faster volume).

---

## 9. Roadmap (advanced features)

- Side‑by‑side thumbnail preview vs. competitor + YouTube "feed preview" mockup.
- A/B title pairs and "safe / advertiser‑friendly" vs "dramatic / viral" toggles
  (the realism + clickbait sliders already drive this server‑side).
- Multi‑language output (EN / ES / FR / AR) — already honoured via the language field.
- One‑click "Export to YouTube Studio" (title/description/tags blocks).
- Saved projects per video (persist briefs + results).
- Auto frame extraction from an uploaded video file (currently: upload frames).
