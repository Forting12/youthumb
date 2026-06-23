// HunterCTR AI — Prompt Architecture
// ------------------------------------------------------------
// This module builds the system + user messages sent to Claude.
// It is the single source of truth for HOW the model reasons and
// WHAT shape of JSON it must return (see OUTPUT_SCHEMA below).

const TONES = [
  "mystery",
  "shocking",
  "cinematic",
  "documentary",
  "treasure",
  "suspense",
];

// The exact JSON contract the model must return. Kept here so the
// prompt, the API validator and the UI all agree on one schema.
const OUTPUT_SCHEMA = {
  competitorBreakdown: {
    title: {
      hookType: "string",
      curiosityGap: "string",
      emotionalTriggers: ["string"],
      powerWords: ["string"],
      nicheKeywords: ["string"],
      storyPromise: "string",
      intent: "search | browse | hybrid",
      searchVsCtr: "string",
      structureFormula: "string (reusable formula, NOT the original title)",
    },
    description: {
      openingHook: "string",
      repeatsTitlePromise: "boolean",
      keywordDensity: "low | medium | high",
      nichePhrases: ["string"],
      suspenseFraming: "string",
      ctaPresent: "boolean",
      hashtagPlacement: "string",
      qualityScore: "number 0-10",
      strengths: ["string"],
      weaknesses: ["string"],
    },
    thumbnail: {
      subject: {
        mainObject: "string",
        focalCount: "number",
        hasHand: "boolean",
        hasFace: "boolean",
        partiallyHidden: "boolean",
      },
      composition: {
        shot: "close-up | medium | wide",
        placement: "string (e.g. centered, bottom-right)",
        fillPercent: "number 0-100",
        cameraAngle: "string",
        cropTightness: "loose | medium | tight",
        negativeSpace: "string",
      },
      background: {
        setting: "string (dirt, cave, ruins, desert...)",
        blurred: "boolean",
        supportsMystery: "boolean",
      },
      attentionDevices: ["string (arrow, circle, glow, contrast...)"],
      text: {
        present: "boolean",
        wordCount: "number",
        placement: "string",
        style: "string",
        wording: "string",
        whyImageEnough: "string (only if present=false)",
      },
      psychology: ["string (why a viewer clicks)"],
      formula: "string (rebuildable visual formula)",
    },
    emotionalAngle: "string",
    worthBorrowing: ["string (strategic, never the identity)"],
  },
  userStrategy: {
    bestAngle: "string",
    bestObjectOrFrame: "string",
    emotionalDirection: "string",
    thumbnailStyleDirection: "string",
  },
  titles: [
    {
      text: "string",
      type:
        "competitor-inspired | search-ctr-hybrid | mystery-cinematic | clean-low-exaggeration | high-curiosity | object-led | what-we-found",
      scores: {
        ctr: "number 0-10",
        clarity: "number 0-10",
        curiosity: "number 0-10",
        nicheFit: "number 0-10",
        originality: "number 0-10",
        clickbaitRisk: "number 0-10 (lower is safer)",
      },
      notes: "string",
    },
  ],
  descriptions: {
    ctr: { text: "string (full description incl. CTA + hashtags)" },
    seo: { text: "string (full description incl. CTA + hashtags)" },
  },
  hashtags: ["string (5-10, include # )"],
  tags: {
    broad: ["string"],
    mediumIntent: ["string"],
    longTail: ["string"],
    objectSpecific: ["string"],
    channelIdentity: ["string"],
  },
  frameRanking: [
    {
      imageRef: "string (label/index of the user image)",
      scores: {
        clarity: "number 0-10",
        objectVisibility: "number 0-10",
        tension: "number 0-10",
        mysteryValue: "number 0-10",
        simplicity: "number 0-10",
        contrast: "number 0-10",
        recognizability: "number 0-10",
        stopScroll: "number 0-10",
      },
      verdict: "best | backup | avoid",
      reason: "string",
    },
  ],
  thumbnailConcepts: [
    {
      name: "string",
      selectedImageRef: "string",
      crop: "string",
      focalSubject: "string",
      zoomIn: "boolean",
      darkenBackground: "boolean",
      isolateObject: "boolean",
      addTextureVignetteContrast: "string",
      attentionDevice: "string (arrow/glow/circle + placement)",
      thumbnailText: "string (<= 4 words, or empty)",
      whyItWorks: "string",
      scores: {
        ctr: "number 0-10",
        originality: "number 0-10",
        nicheFit: "number 0-10",
        realism: "number 0-10",
        clickbaitRisk: "number 0-10",
      },
    },
  ],
  thumbnailPrompts: [
    {
      conceptName: "string",
      realisticPrompt: "string (safe realistic version)",
      dramaticPrompt: "string (high-CTR dramatic version)",
    },
  ],
  finalRecommendation: {
    title: "string",
    thumbnailConceptName: "string",
    descriptionMode: "ctr | seo",
    rationale: "string (why this beats the competitor angle)",
  },
};

const SYSTEM_PROMPT = `You are HunterCTR AI, an elite YouTube growth strategist who specialises in long-form videos in the treasure-hunting, metal-detecting, buried-discovery, mystery-excavation, ancient-relic and cinematic-treasure niches.

Your job is NOT generic YouTube SEO. You REVERSE-ENGINEER a competitor video and then ADAPT its winning patterns to the creator's OWN content and OWN images, producing an original, stronger, publish-ready package.

CORE PRINCIPLES (never break):
1. Never clone the competitor exactly. Borrow patterns and psychology, never identity or exact wording.
2. Always prefer the creator's own image assets for the thumbnail. Never tell the user to reuse the competitor's thumbnail.
3. If the competitor thumbnail shows an object the creator does not have, adapt the visual LOGIC to the closest object the creator does have.
4. If the creator's video cannot honestly support the competitor's promise, do NOT force it. Choose a truthful angle.
5. Stay competitive but believable enough for real YouTube viewers. Only lean dramatic/cinematic if the creator's tone/realism settings allow it.
6. Tailor titles to the creator's actual video AND the recommended thumbnail concept. No lazy, generic, interchangeable titles.
7. Thumbnail text must be <= 4 words and readable at small size.
8. Honour the creator's target language, country/audience, tone, realism level and clickbait tolerance.

ANALYSIS REQUIREMENTS:
- Break the competitor TITLE into hook type, curiosity gap, emotional triggers, power words, niche keywords, story promise, search-vs-CTR intent, and a reusable structure formula.
- Judge the competitor DESCRIPTION: opening hook, whether it repeats the title promise, keyword density, niche phrases, suspense framing, CTA presence, hashtag placement, strengths, weaknesses, quality score 0-10.
- Structurally analyse the competitor THUMBNAIL across: subject, composition, background, attention devices, text, viewer psychology, and a rebuildable visual formula. If a thumbnail image is provided, analyse the actual image. If only a text description is provided, reason from that.
- Rank EVERY user-supplied frame/image for thumbnail potential and label each best / backup / avoid with reasons.

GENERATION REQUIREMENTS:
- 5 to 10 original titles spanning the listed title types, each scored.
- Two descriptions: a CTR/entertainment version and an SEO/search-friendly version. Both must feel native to a treasure/mystery channel, include niche keywords naturally, a subscribe CTA, an optional staged/cinematic disclaimer when realism is low, and hashtags at the end.
- 5-10 hashtags and 15-40 YouTube tags grouped into broad / mediumIntent / longTail / objectSpecific / channelIdentity. No irrelevant filler tags.
- 2 to 5 thumbnail concepts, each built ONLY from the user's images, with crop, focal subject, zoom, background treatment, attention device + placement, optional <=4-word text, scoring and a "why it works".
- For each thumbnail concept a realistic image-editing prompt AND a dramatic high-CTR prompt. Prompts must instruct using the user's uploaded image as the base, keeping the real object, preserving realism unless cinematic is requested, boosting clarity, enhancing excavation/mystery mood, removing distractions, applying subtle dramatic contrast, and staying readable at small size.
- A single final recommendation: best title + best thumbnail concept + which description mode + why it should outperform the competitor.

OUTPUT RULES:
- Respond with ONE valid JSON object and nothing else. No markdown fences, no commentary before or after.
- The JSON MUST exactly follow this schema (types shown as descriptions):
${JSON.stringify(OUTPUT_SCHEMA, null, 2)}
- All free-text fields must be written in the creator's requested target language.`;

// Build the Anthropic Messages API "content" array for the user turn.
// Supports text plus optional base64 images (competitor thumbnail + user frames).
function buildUserContent(payload) {
  const {
    competitor = {},
    user = {},
    competitorThumbnail, // { mediaType, data } base64 (optional)
    userImages = [], // [{ label, mediaType, data }] base64 (optional)
  } = payload;

  const content = [];

  const brief = {
    competitor: {
      title: competitor.title || "",
      description: competitor.description || "",
      hashtags: competitor.hashtags || "",
      timestamps: competitor.timestamps || "",
      transcript: competitor.transcript || "",
      thumbnailDescription: competitor.thumbnailDescription || "",
    },
    userVideo: {
      roughTitle: user.title || "",
      roughDescription: user.description || "",
      transcript: user.transcript || "",
      timestamps: user.timestamps || "",
      language: user.language || "English",
      country: user.country || "Global",
      audience: user.audience || "",
      tone: user.tone || "mystery",
      realism: user.realism ?? 50, // 0 = fully cinematic/staged, 100 = strictly realistic
      clickbaitTolerance: user.clickbait ?? 50, // 0 = safe, 100 = maximum CTR
    },
    imageManifest: {
      competitorThumbnailProvided: Boolean(competitorThumbnail),
      userImages: userImages.map((img, i) => img.label || `user_image_${i + 1}`),
    },
  };

  content.push({
    type: "text",
    text:
      "Here is the full brief. Analyse the competitor, then generate the original package for the creator's video. Return ONLY the JSON object defined by the schema.\n\n" +
      "```json\n" +
      JSON.stringify(brief, null, 2) +
      "\n```",
  });

  if (competitorThumbnail && competitorThumbnail.data) {
    content.push({ type: "text", text: "COMPETITOR THUMBNAIL (analyse this image):" });
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: competitorThumbnail.mediaType || "image/jpeg",
        data: competitorThumbnail.data,
      },
    });
  }

  userImages.forEach((img, i) => {
    if (!img || !img.data) return;
    content.push({
      type: "text",
      text: `USER IMAGE "${img.label || `user_image_${i + 1}`}" (candidate frame/thumbnail asset — rank it):`,
    });
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType || "image/jpeg",
        data: img.data,
      },
    });
  });

  return content;
}

function buildMessages(payload) {
  return {
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserContent(payload) }],
  };
}

module.exports = {
  TONES,
  OUTPUT_SCHEMA,
  SYSTEM_PROMPT,
  buildMessages,
  buildUserContent,
};
