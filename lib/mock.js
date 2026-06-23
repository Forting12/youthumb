// HunterCTR AI — Demo / fallback result generator.
// Used when no ANTHROPIC_API_KEY is configured so the UI is fully
// explorable offline. Lightly personalised from the user's inputs so
// the demo feels responsive. The real engine returns the same schema.

function pick(str, fallback) {
  return (str && String(str).trim()) || fallback;
}

function buildMockResult(payload = {}) {
  const competitor = payload.competitor || {};
  const user = payload.user || {};
  const userImages = payload.userImages || [];

  const object = pick(user.title, "buried artifact").split(" ").slice(0, 3).join(" ");
  const lang = pick(user.language, "English");
  const tone = pick(user.tone, "mystery");
  const cinematic = (user.realism ?? 50) < 40;

  const frameRanking = (userImages.length ? userImages : [{ label: "frame_1" }, { label: "frame_2" }, { label: "frame_3" }]).map(
    (img, i) => ({
      imageRef: img.label || `user_image_${i + 1}`,
      scores: {
        clarity: 9 - i,
        objectVisibility: 8 - i,
        tension: 7 - (i % 3),
        mysteryValue: 8 - (i % 4),
        simplicity: 7 - (i % 2),
        contrast: 8 - (i % 3),
        recognizability: 8 - i,
        stopScroll: 9 - i,
      },
      verdict: i === 0 ? "best" : i === 1 ? "backup" : "avoid",
      reason:
        i === 0
          ? "Sharpest read of the object at small size with strong foreground/background separation — instantly legible in the feed."
          : i === 1
          ? "Good object visibility but slightly busier background; ideal as the backup if the hero frame is overused."
          : "Too cluttered / low contrast to survive at thumbnail scale — skip it.",
    })
  );

  return {
    _demo: true,
    competitorBreakdown: {
      title: {
        hookType: "discovery + buried object + emotional exaggeration",
        curiosityGap: "Viewer is promised a reveal but the object's identity is withheld.",
        emotionalTriggers: ["shock", "curiosity", "forbidden discovery"],
        powerWords: ["shocked", "discovered", "buried", "world"],
        nicheKeywords: ["buried", "discovered", "treasure"],
        storyPromise: "We found something extraordinary underground and you must see the reveal.",
        intent: "browse",
        searchVsCtr: "Heavily CTR/browse-focused — built for the suggested feed, weak for search.",
        structureFormula: "[ACTION verb] + [hidden place/object] + [emotional world-scale payoff]",
      },
      description: {
        openingHook: pick(competitor.description, "In this video we dig up something unbelievable...").slice(0, 90),
        repeatsTitlePromise: true,
        keywordDensity: "medium",
        nichePhrases: ["buried treasure", "ancient discovery", "metal detecting"],
        suspenseFraming: "Teases the reveal without spoiling it, then asks the viewer to watch to the end.",
        ctaPresent: Boolean(competitor.description && /subscribe/i.test(competitor.description)),
        hashtagPlacement: "End of description",
        qualityScore: 6,
        strengths: ["Strong opening hook", "Keeps the mystery intact"],
        weaknesses: ["Thin on searchable keywords", "Generic CTA", "No timestamps/chapters"],
      },
      thumbnail: {
        subject: {
          mainObject: pick(competitor.thumbnailDescription, "partially-buried ancient object"),
          focalCount: 1,
          hasHand: true,
          hasFace: false,
          partiallyHidden: true,
        },
        composition: {
          shot: "close-up",
          placement: "centered, object slightly low",
          fillPercent: 65,
          cameraAngle: "high/top-down into the dig hole",
          cropTightness: "tight",
          negativeSpace: "rough soil framing around the object",
        },
        background: { setting: "excavated dirt / dig site", blurred: false, supportsMystery: true },
        attentionDevices: ["high contrast", "object isolation", "dirt framing", "subtle glow"],
        text: {
          present: false,
          wordCount: 0,
          placement: "",
          style: "",
          wording: "",
          whyImageEnough: "The half-buried object + hand creates the curiosity gap on its own; text would only add clutter.",
        },
        psychology: ["What is that object?", "Is this real?", "What's buried there?"],
        formula:
          "close-up half-buried object + visible hand + rough orange dirt texture + tight crop + high contrast + subtle glow + no text",
      },
      emotionalAngle: "Forbidden, world-scale discovery the viewer cannot resist verifying.",
      worthBorrowing: [
        "The half-buried 'object identity withheld' hook",
        "Hand-in-frame for scale and authenticity",
        "Tight high-contrast crop that survives the feed",
      ],
    },
    userStrategy: {
      bestAngle: `Lead with the strongest real moment from your footage and frame ${object} as a withheld reveal.`,
      bestObjectOrFrame: frameRanking[0].imageRef,
      emotionalDirection: cinematic ? "Cinematic suspense with an honest reveal" : "Grounded mystery — let the real object carry it",
      thumbnailStyleDirection: "Tight close-up on your real object + hand for scale, dirt framing, strong contrast, no clutter.",
    },
    titles: [
      {
        text: `We Dug Up ${object} And It Shouldn't Exist`,
        type: "competitor-inspired",
        scores: { ctr: 9, clarity: 7, curiosity: 9, nicheFit: 9, originality: 7, clickbaitRisk: 6 },
        notes: "Mirrors the competitor's withheld-reveal pattern without copying wording.",
      },
      {
        text: `Metal Detecting Find: What We Pulled From This Hole`,
        type: "search-ctr-hybrid",
        scores: { ctr: 7, clarity: 9, curiosity: 7, nicheFit: 9, originality: 7, clickbaitRisk: 3 },
        notes: "Leads with the searchable phrase 'metal detecting find' then adds curiosity.",
      },
      {
        text: `Something Was Buried Here For a Reason`,
        type: "mystery-cinematic",
        scores: { ctr: 8, clarity: 6, curiosity: 9, nicheFit: 8, originality: 8, clickbaitRisk: 5 },
        notes: "Pure curiosity cliffhanger; pairs best with the dramatic thumbnail.",
      },
      {
        text: `The Object We Found Buried Underground`,
        type: "clean-low-exaggeration",
        scores: { ctr: 6, clarity: 9, curiosity: 6, nicheFit: 8, originality: 6, clickbaitRisk: 2 },
        notes: "Advertiser-friendly, honest framing for a less risky upload.",
      },
      {
        text: `I Did Not Expect To Find THIS Buried Here`,
        type: "high-curiosity",
        scores: { ctr: 9, clarity: 6, curiosity: 9, nicheFit: 8, originality: 6, clickbaitRisk: 7 },
        notes: "Maximum curiosity; use only if your reveal genuinely delivers.",
      },
      {
        text: `Ancient ${object} Found While Digging`,
        type: "object-led",
        scores: { ctr: 7, clarity: 9, curiosity: 7, nicheFit: 9, originality: 7, clickbaitRisk: 3 },
        notes: "Object-first for browse + search; swap in the precise object name.",
      },
      {
        text: `What We Found Buried Changed Everything`,
        type: "what-we-found",
        scores: { ctr: 8, clarity: 7, curiosity: 8, nicheFit: 8, originality: 6, clickbaitRisk: 6 },
        notes: "Classic 'what we found' payoff structure.",
      },
    ],
    descriptions: {
      ctr: {
        text:
          `While digging at the site, we uncovered something none of us expected. In this video you'll see the full ${object} reveal exactly as it came out of the ground — no cuts, no fakes.\n\n` +
          `Watch to the end for the moment everything changed.\n\n` +
          (cinematic ? "Disclaimer: this video includes cinematic storytelling for entertainment.\n\n" : "") +
          `🔔 Subscribe for more buried discoveries and metal detecting finds.\n\n` +
          `#treasurehunting #metaldetecting #buriedtreasure #mystery #ancientartifacts`,
      },
      seo: {
        text:
          `Metal detecting and excavation video: we dig up and reveal ${object} found buried underground. This long-form treasure hunting video covers the full discovery, the dig, and a close-up of the ancient object.\n\n` +
          `Topics: metal detecting finds, buried treasure, ancient artifacts, excavation mystery, relic hunting.\n\n` +
          `Chapters and timestamps in the comments. If you love treasure hunting and buried discoveries, subscribe for a new dig every week.\n\n` +
          `#metaldetecting #treasurehunting #detectorfinds #buriedtreasure #relichunting`,
      },
    },
    hashtags: ["#treasurehunting", "#metaldetecting", "#buriedtreasure", "#ancientartifacts", "#mystery", "#detectorfinds", "#excavation"],
    tags: {
      broad: ["treasure hunting", "metal detecting", "buried treasure", "mystery"],
      mediumIntent: ["metal detecting finds", "excavation mystery", "ancient artifacts", "treasure hunter", "relic hunting"],
      longTail: ["what we found buried underground", "ancient object found while digging", "metal detecting find reveal", "buried discovery caught on camera"],
      objectSpecific: [object.toLowerCase(), `ancient ${object.toLowerCase()}`, `buried ${object.toLowerCase()}`],
      channelIdentity: ["hunterctr", "buried discoveries", "treasure channel"],
    },
    frameRanking,
    thumbnailConcepts: [
      {
        name: "Honest Reveal (safe)",
        selectedImageRef: frameRanking[0].imageRef,
        crop: "Tight square-ish crop centered on the object with your hand in frame for scale.",
        focalSubject: "Your real object, half emerging from the soil.",
        zoomIn: true,
        darkenBackground: true,
        isolateObject: true,
        addTextureVignetteContrast: "Subtle vignette + moderate contrast; keep dirt texture realistic.",
        attentionDevice: "Soft glow ring around the object (no arrow).",
        thumbnailText: "",
        whyItWorks: "Recreates the competitor's withheld-object hook using your own footage while staying believable.",
        scores: { ctr: 8, originality: 8, nicheFit: 9, realism: 9, clickbaitRisk: 3 },
      },
      {
        name: "High-CTR Dramatic",
        selectedImageRef: frameRanking[0].imageRef,
        crop: "Extreme close-up, object filling ~70% of the frame, slightly off-center.",
        focalSubject: "The object with exaggerated separation from the background.",
        zoomIn: true,
        darkenBackground: true,
        isolateObject: true,
        addTextureVignetteContrast: "Strong contrast, warm dramatic grade, heavier vignette.",
        attentionDevice: "Yellow circle/arrow pointing at the object, top-right.",
        thumbnailText: cinematic ? "REAL?" : "",
        whyItWorks: "Pushes scroll-stopping contrast and a directional cue for maximum browse CTR.",
        scores: { ctr: 9, originality: 7, nicheFit: 8, realism: cinematic ? 6 : 7, clickbaitRisk: 6 },
      },
    ],
    thumbnailPrompts: [
      {
        conceptName: "Honest Reveal (safe)",
        realisticPrompt:
          "Using the uploaded user image as the base, keep the real object exactly as photographed. Tighten the crop on the half-buried object and the hand for scale. Increase object clarity and micro-detail, gently darken and blur the surrounding soil to isolate the subject, apply a subtle vignette and natural contrast, and remove any distracting background clutter. Preserve full realism — it must look like a genuine, unedited discovery photo and stay legible as a small YouTube thumbnail.",
        dramaticPrompt:
          "Using the uploaded user image as the base, keep the real object. Push a cinematic warm-amber grade, increase contrast and clarity on the object, darken and vignette the background heavily to spotlight the find, and add a soft glow rim around the object. Keep it coherent and not obviously fake; readable at 320px wide.",
      },
      {
        conceptName: "High-CTR Dramatic",
        realisticPrompt:
          "Using the uploaded user image as the base, extreme close-up on the real object filling most of the frame. Boost clarity and contrast, darken the soil background, isolate the object with a subtle glow, keep realism high, thumbnail-legible.",
        dramaticPrompt:
          "Using the uploaded user image as the base, dramatic extreme close-up of the real object filling ~70% of the frame slightly off-center. Strong cinematic contrast and saturation, heavy background darkening and vignette, a bright glow around the object, optional small yellow circle highlighting it. Maximum scroll-stopping impact while keeping the real object intact and the thumbnail readable at small size.",
      },
    ],
    finalRecommendation: {
      title: `We Dug Up ${object} And It Shouldn't Exist`,
      thumbnailConceptName: "Honest Reveal (safe)",
      descriptionMode: "ctr",
      rationale:
        "This pairing reuses the competitor's proven withheld-reveal hook but is built entirely from your own footage and a truthful object, so it out-converts the competitor on browse without the credibility risk of pure clickbait.",
    },
  };
}

module.exports = { buildMockResult };
