// Long-form copy for the public /how-it-works page: the Igala pilot end to
// end, for funders, allies, and community members - written for readers who
// have never touched machine learning. Kept out of JSX (house rule) so it
// stays translatable and reviewable.
// House style: plain short sentences, no em dashes, every term of art named
// once and explained in normal words; institutions and roles rather than
// individual annotators' names.
//
// LIVE NUMBERS. Strings under `live` templates carry {tokens} that the page
// fills from GET /api/public/method-metrics at view time. Where a sentence
// needs a number, it comes in TWO forms: `live` (with tokens) and `fallback`
// (readable with no numbers at all). The fallback NEVER contains a recorded
// score or count - if the endpoint is unreachable the page says "live numbers
// unavailable" rather than presenting yesterday's figures as today's.

export interface JourneyStage {
  name: string;
  sub: string;
  fixed: string;
  missing: string;
}

export interface AssemblyStep {
  title: string;
  why: string;
  guarded: boolean;
}

export interface ExplainerBlock {
  title: string;
  /** Template with {tokens}, used when live metrics are available. */
  live: string;
  /** No-numbers variant, used while loading or when the feed is down. */
  fallback: string;
}

export interface DiagramBox {
  title: string;
  line1?: string;
  line2?: string;
  /** Small italic footnote rendered inside the box. */
  aside?: string;
}

export interface ChangelogEntry {
  date: string; // fixed history, e.g. "Aug 17, 2026"
  text: string;
}

export const howItWorks = {
  meta: {
    title: "How it works",
    description:
      "Igala speakers are teaching AI models their language. This page shows how: who writes the answers, how each answer is built, the exact instructions the models receive, and an honestly measured scoreboard.",
  },

  hero: {
    overline: "The whole machine",
    title: "How it works",
    intro:
      "Ask most AI models a question in Igala and they answer in Yoruba or English instead. So Igala speakers are teaching the models their own language: they write answers, compare model answers without knowing which model wrote what, and fix mistakes by hand. This page shows the whole thing, in plain words.",
    intro2:
      "Every number on this page is fetched from the project database while you read. Nothing is typed in by hand, so nothing can quietly go stale. And when the live feed is down, the page says so instead of showing old numbers as current.",
  },

  // Shared strings for every live-data state on the page.
  live: {
    loadingLabel: "loading",
    unavailableShort: "live numbers unavailable",
    unavailableNote:
      "Live numbers unavailable right now. This page shows figures only when it can fetch them fresh from the project database, never from a saved copy. Reload in a minute to try again.",
    computedPrefix: "Computed from the live project database,",
    statsFootnote:
      "Counts exclude demo sessions; the annotator count also excludes seed test accounts.",
    stats: [
      { key: "goldAnswers", label: "answers written by speakers" },
      { key: "pairwiseComparisons", label: "blind comparisons judged" },
      { key: "parallelPairs", label: "Igala-English sentence pairs" },
      { key: "lexEntries", label: "dictionary entries served" },
      { key: "annotators", label: "community annotators" },
      { key: "frozenPrompts", label: "questions in the frozen exam" },
    ] as Array<{ key: string; label: string }>,
  },

  system: {
    id: "system",
    overline: "One picture",
    title: "The whole system",
    intro:
      "Four layers, read top to bottom. The community produces the knowledge. The knowledge is packed around each question. A model answers. And every answer goes back to the community for judgment, which becomes new knowledge. The loop on the left is the whole idea.",
    diagram: {
      communityTitle: "The Igala community",
      communityTitleCounted: "The Igala community - {annotators} annotators",
      communityBoxes: [
        { title: "Cold answers", line1: "written before seeing any model" },
        { title: "Blind comparisons", line1: "which of two answers is better" },
        {
          title: "Corrections + reasons",
          line1: "what was wrong, fixed by a speaker",
        },
      ] as DiagramBox[],
      knowledgeLabel: "The knowledge, growing every session",
      knowledgeBoxes: [
        {
          title: "Community answers",
          line1: "{goldAnswers} question-answer pairs",
          line2: "how the community actually writes",
        },
        {
          title: "Dictionary",
          line1: "{lexEntries} word-meaning entries",
          line2: "hand-checked, plus words learned from the Bible corpus",
        },
        {
          title: "Example sentences",
          line1: "{parallelPairs} Igala-English pairs",
          line2: "how sentences are built",
        },
        {
          title: "Grammar rules",
          line1: "read out of all the evidence",
          line2: "only rules confirmed by two sources ship",
          aside: "the rules travel as instructions, not as pasted text",
        },
      ] as DiagramBox[],
      servingLabel: "Answering one question, packed fresh every time",
      questionBox: { title: "Question", line1: "from a person" } as DiagramBox,
      retrievalBox: {
        title: "Retrieval",
        line1: "best-matching pieces",
      } as DiagramBox,
      leakGuardLabel: "leak guard",
      leakGuardNote:
        "the leak guard checks every retrieved piece, so no exam question is ever handed its own answer",
      contextTitle: "The packed prompt",
      contextLines: [
        "1  the rules: how to use everything below",
        "2  real answers by speakers: what good sounds like",
        "3  example sentences: how Igala is built",
        "4  dictionary lines for this question's words",
        "5  the question, plus one closing rule",
      ],
      modelBox: { title: "Model", line1: "any of them" } as DiagramBox,
      answerBox: { title: "Answer", line1: "in Igala" } as DiagramBox,
      judgmentLabel: "Judgment, the only measure that finally counts",
      judgmentBox: {
        title: "Native judgment",
        line1: "blind pairs + corrections on the strongest models",
        line2: "what speakers fix becomes tomorrow's rules",
      } as DiagramBox,
      judgmentCountLive: "{poolComparisons} strong-pair judgments so far",
      judgmentCountCollecting: "collecting now",
      examBox: {
        title: "Frozen exam",
        line1: "{frozenPrompts} questions no model ever trains or retrieves on",
        line2: "scored leak-free only",
      } as DiagramBox,
      scoreBox: {
        title: "Agreement Score",
        line1: "100 = two native speakers' agreement with each other",
        line2: "the bars below",
      } as DiagramBox,
      returnLabel: "answers become new knowledge",
      mobileReturnLabel: "and everything loops back to the top",
      flywheelLines: [
        "Every judgment and every correction re-enters the knowledge,",
        "the grammar, and the next round of models. The community is not",
        "labeling data for a system. The community IS the system.",
      ],
    },
    caption:
      "Counts in the picture are fetched live, from the same computation as the numbers above. The red funnel is the leak guard: every retrieved piece is checked, so no exam question is ever handed its own answer. That check is the reason the scores below can be believed.",
  },

  journey: {
    id: "journey",
    overline: "The story so far",
    title: "Four versions of the same idea",
    intro:
      "None of these models learns Igala the way a person does. Each version changes what real Igala the model gets to see at the moment it answers. And each fix exposed the next problem.",
    fixedLabel: "What it fixed",
    missingLabel: "What it did not",
    stages: [
      {
        name: "v0 - plain models",
        sub: "Ask a top model, nothing added",
        fixed: "Nothing yet. This is the baseline.",
        missing:
          "Asked for Igala, the models answer in Yoruba or English, with invented words in between.",
      },
      {
        name: "v1 - show it real answers",
        sub: "Community answers pasted into the prompt",
        fixed: "Real Igala words start appearing.",
        missing:
          "Words without sentence structure. A community reviewer put it plainly: the first sentence is saying three different things.",
      },
      {
        name: "v2 - give it a method",
        sub: "A dictionary, example sentences, and a step-by-step procedure",
        fixed: "Correct spellings, and sentence shapes copied from real ones.",
        missing: "Still copying, not speaking.",
      },
      {
        name: "v3 - teach it the grammar",
        sub: "Everything in v2, plus grammar rules read out of the evidence",
        fixed: "Pronouns, negation and word order arrive as rules.",
        missing:
          "Only rules confirmed by two independent sources ship. Speakers still judge the structure.",
      },
    ] as JourneyStage[],
  },

  assembly: {
    id: "assembly",
    overline: "Zooming in",
    title: "How one answer is built today",
    intro:
      "When someone asks a question, the system packs a bundle around it, in this order, and sends the whole bundle to the model. v3 uses the exact same bundle and changes only the first piece, the rules. So any difference between v2 and v3 comes from that one change.",
    intro2:
      "One more thing happens first. On exam questions, every piece passes the leak guard: if a piece contains that question's own community answer, it is dropped and the drop is recorded. Otherwise the test would hand the model its answer key.",
    guardBadge: "passes the leak guard",
    steps: [
      {
        title: "The rules (system prompt)",
        why: "A numbered procedure telling the model how to use everything below: the dictionary for word forms, the examples for sentence shape. Without it, a model can hold all the material and still not know what to do with it.",
        guarded: false,
      },
      {
        title: "Real answers by speakers",
        why: "Question-and-answer pairs written by Igala speakers, shown as example exchanges. The model sees what a good answer looks and sounds like: short, in Igala, spelled the community's way.",
        guarded: true,
      },
      {
        title: "Example sentences (Igala-English pairs)",
        why: "Sentence pairs that show how Igala sentences are built. Served only when the question asks the model to build something, a sentence or a story or a greeting, because word-lookup questions were measurably hurt by them.",
        guarded: true,
      },
      {
        title: "Dictionary lines for this question's words",
        why: "One line per meaningful word of the question, with the exact attested Igala form. Placed right above the question because in Igala spelling is meaning: a changed letter is a different word, not a typo.",
        guarded: true,
      },
      {
        title: "The question",
        why: "The person's actual question, unchanged.",
        guarded: false,
      },
      {
        title: "One closing rule",
        why: "A single line under the question restating the output rule: answer in Igala only, nothing else. Instructions at both ends of a long prompt hold better than instructions at one end.",
        guarded: false,
      },
    ] as AssemblyStep[],
  },

  prompts: {
    id: "prompts",
    overline: "No secrets",
    title: "The exact instructions the models receive",
    intro:
      "These are the real system prompts, word for word, not a summary. Publishing them is deliberate: a community should be able to read every instruction issued in its language's name. Each one opens with a click.",
    provenance:
      "This site is a static page and cannot run the annotation app's code, so the prompts below are byte-for-byte copies taken from the serving code on {copiedOn}, each labelled with its source file and commit. If a serving prompt changes after that date, the copy here lags until the site is rebuilt; the app itself always shows the version actually in service.",
    snapshotLine: "{file} at commit {commit} ({commitDate}) - copied {copiedOn}",
    expandHint: "click to read the full text",
    v2Label: "System prompt, v2 (the method)",
    v3Intro:
      "The v3 prompt is the same skeleton plus the grammar: every added line traces to a rule confirmed by at least two independent sources in the evidence the community produced.",
    v3Label: "System prompt, v3 (the method + the grammar)",
    terminalIntro: "And the one line appended below every question:",
    terminalLabel: "The closing rule",
  },

  benchmark: {
    id: "benchmark",
    overline: "Honest measurement",
    title: "The scoreboard: Community Agreement Score",
    intro: {
      live: "Every model takes the same exam: {frozenPrompts} frozen questions that no model ever saw during teaching. Each answer is compared with what Igala speakers wrote for the same question. A longer bar means closer to how the community actually writes. The yardstick is this one community's writing, on Igala questions only. A high bar here claims nothing beyond Igala.",
      fallback:
        "Every model takes the same exam: a set of frozen questions that no model ever saw during teaching. Each answer is compared with what Igala speakers wrote for the same question. A longer bar means closer to how the community actually writes. The yardstick is this one community's writing, on Igala questions only. A high bar here claims nothing beyond Igala.",
    },
    chart: {
      referenceLineLabel: "native speaker agreement",
      showAllLabel: "Show all {count} models",
      underpoweredMark:
        "* too few leak-free answers for an uncertainty range - single estimate only.",
      footnote:
        "100 = one native speaker's agreement with another (chrF {ceilingChrf} on the same questions, one answer per speaker). Scored on the {leakFreePrompts} leak-free frozen questions. The whiskers show the uncertainty: re-draw the exam questions and the score lands inside them 95 times out of 100. A bar past the 100 line means the model matched the community's writing more closely than one speaker matches another; it is shown as measured, never capped.",
      loadingNote:
        "Fetching the scoreboard from the project database. Values on this chart are only ever shown live.",
      emptyNote:
        "The Community Agreement Score cannot be drawn yet: it needs at least one leak-free exam question answered by two different native speakers to anchor its 100 line. Until then, no scale. Not a made-up one either.",
    },
    explainer: [
      {
        title: "What the score means.",
        live: "Underneath is chrF, the standard overlap score used to grade machine translation: 0 to 100 for how much an answer's letters and letter-pairs overlap with the community's answers, measured on the answer itself so an English preamble cannot inflate it. We then rescale it so that the agreement between two native speakers reads exactly 100. A score of 85 means: this model's answers are 85% as close to the community's writing as one speaker's answers are to another's.",
        fallback:
          "Underneath is chrF, the standard overlap score used to grade machine translation: 0 to 100 for how much an answer's letters and letter-pairs overlap with the community's answers, measured on the answer itself so an English preamble cannot inflate it. We then rescale it so that the agreement between two native speakers reads exactly 100. A score of 85 means: this model's answers are 85% as close to the community's writing as one speaker's answers are to another's.",
      },
      {
        title: "A worked example.",
        live: "Say a question asks for one word, and two speakers wrote the same five letters with one accent mark different. Their overlap is high but not perfect, and that speaker-to-speaker overlap is what the 100 line is anchored to. A model that shares four of those five letters lands near the line. A model that answers in English shares almost nothing and lands near zero.",
        fallback:
          "Say a question asks for one word, and two speakers wrote the same five letters with one accent mark different. Their overlap is high but not perfect, and that speaker-to-speaker overlap is what the 100 line is anchored to. A model that shares four of those five letters lands near the line. A model that answers in English shares almost nothing and lands near zero.",
      },
      {
        title: "Why 100 is native agreement, not perfection.",
        live: "Two Igala speakers answering the same question rarely write the identical string. Spelling varies, tone marks vary, phrasing varies. So the honest yardstick is not a single answer key (there is none). It is how much the community agrees with itself. That is also why a bar can pass 100: matching the pooled community answers more closely than one speaker matches another is possible, and when it happens the chart shows it rather than hiding it.",
        fallback:
          "Two Igala speakers answering the same question rarely write the identical string. Spelling varies, tone marks vary, phrasing varies. So the honest yardstick is not a single answer key (there is none). It is how much the community agrees with itself. That is also why a bar can pass 100: matching the pooled community answers more closely than one speaker matches another is possible, and when it happens the chart shows it rather than hiding it.",
      },
      {
        title: "Why it is measured on the leak-free subset.",
        live: "{leakedPrompts} of {frozenPrompts} frozen questions once had one of their own community answers slip into the material served to the models. On those questions a high score measures copying, not competence. So the score uses only the {leakFreePrompts} questions where that never happened, and its 100 line is computed on those same questions with one answer per speaker: someone re-submitting their own answer does not count as two people agreeing.",
        fallback:
          "During an early audit, some frozen questions were found to have had one of their own community answers slip into the material served to the models. On those questions a high score measures copying, not competence. So the score uses only the questions where that never happened, and its 100 line is computed with one answer per speaker: someone re-submitting their own answer does not count as two people agreeing.",
      },
      {
        title: 'Why we do not call it "% fluent".',
        live: "The score measures resemblance to how the community writes. Only native judgment measures fluency. In {pairwiseComparisons} blind comparisons to date, speakers found both answers inadequate {noPreferencePct} of the time. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
        fallback:
          "The score measures resemblance to how the community writes. Only native judgment measures fluency. In blind comparisons to date, speakers have most often found both answers inadequate. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
      },
    ] as ExplainerBlock[],
    poolSentence: {
      /** Appended to the "% fluent" block when strong-pair judgments exist. */
      live: "On the strongest current systems specifically, the no-preference rate so far is {poolBothInadequatePct} of {poolComparisons} comparisons.",
      /** Appended when the strong-pair count is zero. */
      zero: "None of those comparisons involved the strongest systems on this chart, whose blind test is only beginning.",
    },
    table: {
      summaryLabel:
        "Full data: the raw chrF table, both ceilings, all prompts vs leak-free",
      headers: {
        candidate: "Candidate",
        approach: "Approach",
        n: "n",
        all: "All {frozenPrompts} prompts",
        clean: "Leak-free ({leakFreePrompts})",
      },
      ceilingHonest: {
        label: "Human agreement ceiling - one answer per speaker",
        note: "the honest ceiling",
      },
      ceilingShipped: {
        label: "Human agreement ceiling - as first shipped",
        note: "inflated: counts repeat submissions by the same person as agreement",
      },
      ceilingApproach: "speakers vs speakers",
      note1:
        "These are the raw chrF values the agreement score is rescaled from. Where a provider quota cut a run short, the n column shows fewer answers.",
      note2: {
        live: "Why the ceiling is about {honestCeilingChrfAll}, not 100. Two Igala speakers answering the same question rarely write the identical string, so even a perfect model cannot score 100 in raw chrF. We first published a ceiling of {shippedCeilingChrfAll}, but that number counted people re-submitting their own answer as two speakers agreeing. One answer per speaker gives the honest limit, and both versions stay above so the correction stays visible.",
        fallback:
          "Why the ceiling sits well below 100. Two Igala speakers answering the same question rarely write the identical string, so even a perfect model cannot score 100 in raw chrF. The first published ceiling counted people re-submitting their own answer as two speakers agreeing. One answer per speaker gives the honest limit, and both versions stay above so the correction stays visible.",
      },
    },
  },

  testedNow: {
    id: "tested-now",
    overline: "Open questions",
    title: "What is being tested now",
    items: [
      {
        title: "The blind test: best recipe per model, against a bare control.",
        live: "Right now speakers judge blind pairs drawn from three systems: Gemini with the grammar (v3), Claude with community examples (v1), and plain Gemini with nothing added, as the control. Each model family keeps its own best recipe, because the evidence says they want different help: the grammar that lifts Gemini measurably hurts Claude, and Claude does best when shown real community answers instead. The speakers never know which system wrote which answer.",
        fallback:
          "Right now speakers judge blind pairs drawn from three systems: Gemini with the grammar (v3), Claude with community examples (v1), and plain Gemini with nothing added, as the control. Each model family keeps its own best recipe, because the evidence says they want different help: the grammar that lifts Gemini measurably hurts Claude, and Claude does best when shown real community answers instead. The speakers never know which system wrote which answer.",
      },
      {
        title: "The me- numeral question.",
        live: "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) alongside the dictionary's plain forms (eji, eta). The reference grammar makes a special counting form plausible. But plausible is not confirmed, so the question goes to speakers before the corpus teaches the model a pattern the community has not signed off on.",
        fallback:
          "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) alongside the dictionary's plain forms (eji, eta). The reference grammar makes a special counting form plausible. But plausible is not confirmed, so the question goes to speakers before the corpus teaches the model a pattern the community has not signed off on.",
      },
      {
        title: "Pending unlocks.",
        live: "A published Igala dictionary of roughly 5,000 headwords, against the {lexEntries} dictionary lines the system serves from today. Word coverage, not model cleverness, is the current limit. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' structural review into teachable rules.",
        fallback:
          "A published Igala dictionary of roughly 5,000 headwords, several times what the system serves from today. Word coverage, not model cleverness, is the current limit. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' structural review into teachable rules.",
      },
    ] as ExplainerBlock[],
  },

  changelog: {
    id: "changelog",
    overline: "The record",
    title: "What changed, when",
    intro:
      "The dates are fixed history: what each day added and what it corrected. Every live number they produced is recomputed above, not repeated here.",
    // VERBATIM from the annotation app's CHANGELOG constant
    // (web/src/app/how-it-works/page.tsx). The record is shared history; the
    // two pages must tell it in the same words. When the app's changelog gains
    // or corrects an entry, copy the exact text here - never paraphrase, never
    // add a claim (especially about permissions) beyond what the app states.
    entries: [
      {
        date: "Aug 9, 2026",
        text: "The automatic eval harness, the honest human ceiling, and the leak guard. The audit that day found the benchmark had served 15+ of its 43 frozen questions their own community answers - those scores measured copying, so every number since is reported on the leak-free subset.",
      },
      {
        date: "Aug 12, 2026",
        text: "The Bible parallel corpus - 30,907 Igala-English sentence pairs ingested under BSN permission - plus a 2,104-entry lexicon, powering retrieval v2 and THE METHOD.",
      },
      {
        date: "Aug 13, 2026",
        text: "The frontier arms joined the board. Gemini 3.1 Pro topped it untouched; Claude Opus 5 gained +22 from community retrieval - a clean read on knowledge versus skill. This page was made public and the cost ledger rebuilt.",
      },
      {
        date: "Aug 14, 2026",
        text: "A working grammar deduced from all the evidence (tasks/igala-grammar-deduced.md) and METHOD v3, which enshrines only its A- and B-grade rules in the system prompt.",
      },
      {
        date: "Aug 17, 2026",
        text: "The benchmark visual and the Community Agreement Score: leak-free stripped chrF rescaled so the deduplicated native-speaker ceiling reads 100, drawn LLM-benchmark style with confidence whiskers. The raw chrF table moved under the chart; nothing was removed and no score is capped.",
      },
      {
        date: "Aug 29, 2026",
        text: "Global Recordings Network signed a copyright agreement (Aug 27) covering their “Words of Life” Igala recording, and the audio (45:38, the only usable Igala speech asset) was acquired, along with six Bible-for-Children booklets as raw assets; the booklets' fonts silently strip the ẹ/ọ subdots on extraction, so nothing from them may enter the corpus until that is solved. Outreach to other rights holders (the JWAL papers, Egbunu's proverbs study, PanLex) is in progress, with a call with the JWAL author scheduled; none of their text enters the corpus before written permission is on file, so the corpus counters above are unchanged.",
      },
    ] as ChangelogEntry[],
  },
};

export type HowItWorksContent = typeof howItWorks;
