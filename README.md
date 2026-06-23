# ⛏️ HunterCTR AI

A **competitor‑driven YouTube optimization engine** for long‑form treasure /
metal‑detecting / buried‑discovery / mystery‑excavation / ancient‑relic content.

It reverse‑engineers a competitor video, then rebuilds the winning hook using
**your own** footage and images — producing a publish‑ready package:

- 5–10 original **titles** (typed + scored)
- **CTR** and **SEO** descriptions
- 15–40 grouped **YouTube tags** + 5–10 **hashtags**
- 2–5 **thumbnail concepts** built from *your* frames
- **realistic** + **dramatic** image‑generation prompts per concept
- a **frame ranking** of your screenshots (best / backup / avoid)
- a single **final winner** recommendation

> Competitor‑inspired, never cloned. See **[BLUEPRINT.md](./BLUEPRINT.md)** for the
> full product blueprint, prompt architecture and output schema.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY for the live engine
npm run dev                  # http://localhost:3000
```

- **No API key** → fully working **demo mode** (personalised mock output).
- **With `ANTHROPIC_API_KEY`** → live, multimodal Claude analysis of the actual
  competitor thumbnail and your candidate frames.

| Env var | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Enables the live engine |
| `HUNTER_MODEL` | `claude-opus-4-8` | Model for analysis + generation |
| `HUNTER_MAX_TOKENS` | `8000` | Max output tokens |

## Stack

Next.js (pages router) · React 18 · Anthropic SDK (vision) · zero‑build CSS theme.

## How it works

1. **Competitor Input Panel** — paste title/description/hashtags and upload (or
   auto‑grab from a YouTube URL) the competitor thumbnail.
2. **Your Video Panel** — rough idea + 3–20 frames, language, tone, and the
   realism / clickbait sliders.
3. `/api/analyze` builds a multimodal prompt (`lib/prompt.js`), calls Claude, and
   returns one JSON package — or a demo package if no key is set.
4. **Analysis dashboard + output tabs** render titles, descriptions, tags,
   thumbnail concepts/prompts and the final winner, with JSON export.
