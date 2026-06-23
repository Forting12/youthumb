// HunterCTR AI — Analysis + generation endpoint.
// POST a brief (competitor + user video + optional base64 images),
// returns the structured HunterCTR package (see lib/prompt.js schema).
//
// If ANTHROPIC_API_KEY is set it calls Claude; otherwise it returns a
// personalised demo result so the whole product is explorable offline.

const { buildMessages } = require("../../lib/prompt");
const { buildMockResult } = require("../../lib/mock");

export const config = {
  api: { bodyParser: { sizeLimit: "25mb" } }, // room for base64 images
};

const MODEL = process.env.HUNTER_MODEL || "claude-opus-4-8";
const MAX_TOKENS = Number(process.env.HUNTER_MAX_TOKENS || 8000);

// Extract the first balanced JSON object from a model response.
function extractJson(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < candidate.length; i++) {
    const c = candidate[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(candidate.slice(start, i + 1));
        } catch (_) {
          return null;
        }
      }
    }
  }
  return null;
}

async function callClaude(payload) {
  // Lazy require so the app still builds/runs without the SDK installed.
  let Anthropic;
  try {
    Anthropic = require("@anthropic-ai/sdk");
  } catch (_) {
    throw new Error("SDK_MISSING");
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const { system, messages } = buildMessages(payload);

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system,
    messages,
  });

  const text = (resp.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const parsed = extractJson(text);
  if (!parsed) throw new Error("PARSE_FAILED");
  return parsed;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body || {};

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(200).json({ result: buildMockResult(payload), mode: "demo" });
  }

  try {
    const result = await callClaude(payload);
    return res.status(200).json({ result, mode: "live", model: MODEL });
  } catch (err) {
    const reason = err && err.message;
    // Graceful degradation: still return a usable package, flag the reason.
    return res.status(200).json({
      result: buildMockResult(payload),
      mode: "demo-fallback",
      warning:
        reason === "SDK_MISSING"
          ? "@anthropic-ai/sdk is not installed — run `npm install`. Returned demo output."
          : reason === "PARSE_FAILED"
          ? "Model response could not be parsed as JSON. Returned demo output."
          : `Live call failed (${reason}). Returned demo output.`,
    });
  }
}
