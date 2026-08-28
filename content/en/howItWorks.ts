// Long-form copy for the public /how-it-works page: the Igala pilot end to
// end, for funders, allies, and community members. Content parity with the
// annotation app's researcher-facing How-it-works page, retold in this site's
// voice. Kept out of JSX (house rule) so it stays translatable and reviewable.
// House style: no em dashes (use " - "), no emojis, institutions and roles
// rather than individual annotators' names.
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
}

export interface ChangelogEntry {
  date: string; // fixed history, e.g. "Aug 17, 2026"
  text: string;
}

export const howItWorks = {
  meta: {
    title: "How it works",
    description:
      "The Igala pilot end to end: who teaches the models, how every answer is assembled, the exact prompts the models receive, and an honestly measured scoreboard - with numbers fetched live from the project database.",
  },

  hero: {
    overline: "The whole machine",
    title: "How it works",
    intro:
      "Ask most AI models a question in Igala and they answer in Yoruba or English instead. This project has Igala speakers teach the models their language - by writing answers, judging outputs blind, and correcting mistakes - and measures honestly how far that teaching has gotten.",
    intro2:
      "Every figure on this page is fetched from the project database while you read, computed by the same code the research harness uses. Nothing numeric is saved into this page, so nothing here can go stale: when the live feed is unreachable, the page says so instead of showing old numbers as current.",
  },

  // Shared strings for every live-data state on the page.
  live: {
    loadingLabel: "loading",
    unavailableShort: "live numbers unavailable",
    unavailableNote:
      "Live numbers unavailable right now. This page shows figures only when it can fetch them fresh from the project database - never from a saved copy. Reload in a minute to try again.",
    computedPrefix: "Computed from the live project database,",
    statsFootnote:
      "Counts exclude demo sessions; the annotator count also excludes seed test accounts.",
    stats: [
      { key: "goldAnswers", label: "gold answers written by speakers" },
      { key: "pairwiseComparisons", label: "blind comparisons judged" },
      { key: "parallelPairs", label: "parallel Igala-English sentences" },
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
      "Four layers, read top to bottom: the community produces the knowledge, the knowledge is assembled around each question, a model answers, and every answer flows back to the community for judgment - which becomes new knowledge. The dashed loop on the left is the whole idea.",
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
      knowledgeLabel: "KNOWLEDGE - the standing corpus, growing every session",
      knowledgeBoxes: [
        {
          title: "Community gold",
          line1: "{goldAnswers} question-answer pairs",
          line2: "the register anchor",
        },
        {
          title: "Dictionary",
          line1: "{lexEntries} word-meaning entries",
          line2: "curated + induced from the Bible",
        },
        {
          title: "Parallel sentences",
          line1: "{parallelPairs} Igala-English pairs",
          line2: "how sentences are built",
        },
      ] as DiagramBox[],
      grammarBox: {
        title: "Deduced grammar > system prompt",
        line1: "rules read out of all the evidence,",
        line2: "only two-source-verified rules ship",
      } as DiagramBox,
      grammarAside: "rules travel as instructions, not retrieved prose",
      servingLabel: "PER QUESTION - assembled fresh every time",
      questionBox: { title: "Question", line1: "from a person" } as DiagramBox,
      retrievalBox: {
        title: "Retrieval",
        line1: "best-matching pieces",
      } as DiagramBox,
      leakGuardNote: "leak guard: no exam question is ever handed its own answer",
      contextTitle: "Assembled context",
      contextLines: [
        "1  THE METHOD (system prompt: the rules)",
        "2  gold Q&A exemplars (register)",
        "3  parallel sentences (structure prompts only)",
        "4  dictionary lines for this question's words",
        "5  the question + one-line output contract",
      ],
      modelBox: { title: "Model", line1: "any of them" } as DiagramBox,
      answerBox: { title: "Answer", line1: "in Igala" } as DiagramBox,
      judgmentLabel: "JUDGMENT - the only measure that finally counts",
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
      flywheelLines: [
        "The flywheel: every judgment and correction re-enters the",
        "knowledge, the grammar, and the next round of models. The",
        "community is not labeling for the system - the community IS the system.",
      ],
    },
    caption:
      "Counts in the diagram are fetched live, from the same computation as the numbers above. The red filter is the leak guard: every retrieved piece is checked so no benchmark question is ever served its own answer - the reason the scores below can be believed.",
  },

  journey: {
    id: "journey",
    overline: "The journey",
    title: "Four versions of the same idea",
    intro:
      "The models never learn Igala the way a person does. Each version of the system changes what real Igala the model gets to see at the moment it answers, and each fix exposed the next problem.",
    fixedLabel: "What it fixed",
    missingLabel: "What it did not",
    stages: [
      {
        name: "v0 - plain models",
        sub: "Ask a frontier model, nothing added",
        fixed: "Nothing yet: this is the baseline.",
        missing:
          "Asked for Igala, models answer in Yoruba or English - invented words, wrong language.",
      },
      {
        name: "v1 - retrieval",
        sub: "Paste community answers into the prompt",
        fixed: "Real Igala words appear in answers.",
        missing:
          "Words without sentence structure. A community reviewer put it plainly: the first sentence is saying three different things.",
      },
      {
        name: "v2 - a method",
        sub: "Dictionary + parallel Bible sentences + a procedure",
        fixed: "Attested spellings, copied sentence shape.",
        missing:
          "Still copying, not speaking. v1 and v2 both stay live in chat for native structural review.",
      },
      {
        name: "v3 - a grammar",
        sub: "v2's package + a grammar deduced from the evidence",
        fixed: "Pronouns, negation, word order as rules.",
        missing:
          "Only rules verified across two independent source classes are enshrined; greetings stay retrieval-served. Speakers still judge structure.",
      },
    ] as JourneyStage[],
  },

  assembly: {
    id: "assembly",
    overline: "Zooming in",
    title: "How one answer is built today",
    intro:
      "When someone asks a question, the system assembles a package around it, in this order, and sends the whole package to the model. v3 uses this exact same package and changes only the first piece - its system prompt adds the deduced grammar - so any difference between v2 and v3 scores is attributable to that one change.",
    intro2:
      "Every piece retrieved for a benchmark question first passes a leak guard: if a piece contains that question's own community answer, it is dropped and the drop is recorded - otherwise the test would hand the model its answer key.",
    guardBadge: "passes the leak guard",
    steps: [
      {
        title: "THE METHOD (system prompt)",
        why: "A numbered procedure telling the model how to use the material below - dictionary for word forms, examples for sentence shape - because the failure mode is a model that has the material and does not know what to do with it.",
        guarded: false,
      },
      {
        title: "Community gold Q&A exemplars",
        why: "Real question-and-answer pairs written by Igala speakers, shown as example exchanges, so the model sees what a good answer looks and sounds like - terse, in Igala, spelled the community's way.",
        guarded: true,
      },
      {
        title: "Parallel example sentences (Igala-English pairs)",
        why: "Bible-corpus sentence pairs that show how Igala sentences are built. Served only for questions that ask the model to build something - a sentence, a story, a greeting - because word-lookup questions were measurably hurt by them.",
        guarded: true,
      },
      {
        title: "Per-word dictionary lines",
        why: "One line per content word of the question that the dictionary attests, with the exact attested Igala form. Placed immediately above the question because spelling is meaning in Igala - a changed letter is a different word, not a typo.",
        guarded: true,
      },
      {
        title: "The question",
        why: "The user's actual question, unchanged.",
        guarded: false,
      },
      {
        title: "Terminal contract",
        why: "One closing line under the question restating the output rule - answer in Igala only, nothing else - because instructions at both ends of a long prompt hold better than instructions at one.",
        guarded: false,
      },
    ] as AssemblyStep[],
  },

  prompts: {
    id: "prompts",
    overline: "No secrets",
    title: "The exact instructions the models receive",
    intro:
      "This is the v2 system prompt, reproduced verbatim - not a paraphrase and not a summary. Publishing it is deliberate: a community should be able to read every instruction issued in its language's name.",
    provenance:
      "This site is a static page and cannot execute the annotation app's code, so the prompts below are byte-for-byte copies taken from the serving code on {copiedOn}, each labelled with its source file and commit. If a serving prompt changes after that date, the copy here lags until the site is rebuilt - the app itself always renders the version actually in service.",
    snapshotLine: "{file} at commit {commit} ({commitDate}) - copied {copiedOn}",
    v2Label: "System prompt, v2 (the method)",
    v3Intro:
      "And the v3 system prompt - the same skeleton plus closed-class grammar and register sections, every line traced to a rule verified across at least two independent source classes in the grammar deduced from the community's evidence:",
    v3Label: "System prompt, v3 (the method + the grammar)",
    terminalIntro: "And the one line appended below every question:",
    terminalLabel: "Terminal contract",
  },

  benchmark: {
    id: "benchmark",
    overline: "Honest measurement",
    title: "The benchmark: Community Agreement Score",
    intro: {
      live: "Every model faces the same {frozenPrompts}-question frozen exam - questions the models never saw during any adaptation step - and each answer is compared with what Igala speakers wrote for that question. The chart borrows the familiar benchmark layout - longer bar, closer to how the community actually writes - but the yardstick is agreement with this one community's writing, on Igala questions only. It is not comparable to general-knowledge benchmarks, and a high bar here claims nothing beyond Igala.",
      fallback:
        "Every model faces the same frozen exam - questions the models never saw during any adaptation step - and each answer is compared with what Igala speakers wrote for that question. The chart borrows the familiar benchmark layout - longer bar, closer to how the community actually writes - but the yardstick is agreement with this one community's writing, on Igala questions only. It is not comparable to general-knowledge benchmarks, and a high bar here claims nothing beyond Igala.",
    },
    chart: {
      referenceLineLabel: "native speaker agreement",
      showAllLabel: "Show all {count} models",
      underpoweredMark:
        "* too few leak-free answers for an interval - point estimate only.",
      footnote:
        "100 = one native speaker's agreement with another (chrF {ceilingChrf} on the same questions, one answer per speaker). Scored on the {leakFreePrompts} leak-free frozen questions; whiskers are 95% bootstrap intervals over per-question scores. A bar past the 100 line means the model matched the community's writing more closely than one speaker matches another - shown as measured, never capped.",
      loadingNote:
        "Fetching the scoreboard from the project database. Values on this chart are only ever shown live.",
      emptyNote:
        "The Community Agreement Score cannot be drawn yet: it needs at least one leak-free test question answered by two different native speakers to anchor its 100 line. Until then, no scale - not a made-up one.",
    },
    explainer: [
      {
        title: "What the score means.",
        live: "Underneath is chrF, the standard character-overlap metric machine translation systems are scored with: 0-100 for how much an answer's characters overlap with the community's answers, computed on the stripped answer so an English preamble cannot inflate it. We then rescale it so that the agreement between two native speakers reads exactly 100. A score of 85 means: this model's answers are 85% as close to the community's writing as one native speaker's answers are to another's.",
        fallback:
          "Underneath is chrF, the standard character-overlap metric machine translation systems are scored with: 0-100 for how much an answer's characters overlap with the community's answers, computed on the stripped answer so an English preamble cannot inflate it. We then rescale it so that the agreement between two native speakers reads exactly 100. A score of 85 means: this model's answers are 85% as close to the community's writing as one native speaker's answers are to another's.",
      },
      {
        title: "A worked example.",
        live: "Suppose a test question asks for a word and two speakers wrote the same five letters, differing only in one accent mark - their overlap is high but not perfect, and that speaker-to-speaker overlap is what the 100 line is anchored to. A model whose answer shares four of those five letters in order lands near the line; a model that answers in English shares almost no characters and lands near zero.",
        fallback:
          "Suppose a test question asks for a word and two speakers wrote the same five letters, differing only in one accent mark - their overlap is high but not perfect, and that speaker-to-speaker overlap is what the 100 line is anchored to. A model whose answer shares four of those five letters in order lands near the line; a model that answers in English shares almost no characters and lands near zero.",
      },
      {
        title: "Why 100 is native agreement, not perfection.",
        live: 'Two Igala speakers answering the same question rarely write the identical string - spelling varies, tone marks vary, phrasing varies. So the honest yardstick is not "matched the answer key" (there is no single answer key) but "agreed with the community as much as its own members agree with each other". That is also why a bar can pass 100: matching the pooled community answers more closely than one speaker matches another is possible, and when it happens the chart shows it rather than clamping it.',
        fallback:
          'Two Igala speakers answering the same question rarely write the identical string - spelling varies, tone marks vary, phrasing varies. So the honest yardstick is not "matched the answer key" (there is no single answer key) but "agreed with the community as much as its own members agree with each other". That is also why a bar can pass 100: matching the pooled community answers more closely than one speaker matches another is possible, and when it happens the chart shows it rather than clamping it.',
      },
      {
        title: "Why it is measured on the leak-free subset.",
        live: "{leakedPrompts} of {frozenPrompts} frozen questions once had one of their own community answers included in material served to the models; on those, a high score measures copying, not competence. The score therefore uses only the {leakFreePrompts} questions where that never happened, and its ceiling is computed on those same questions with one answer per speaker - repeat submissions by the same person do not count as agreement.",
        fallback:
          "During an early audit, some frozen questions were found to have had one of their own community answers included in material served to the models; on those, a high score measures copying, not competence. The score therefore uses only the questions where that never happened, and its ceiling is computed on those same questions with one answer per speaker - repeat submissions by the same person do not count as agreement.",
      },
      {
        title: 'Why we do not call it "% fluent".',
        live: "chrF measures resemblance to how the community writes; only native judgment measures fluency. In {pairwiseComparisons} blind comparisons to date, speakers found both answers inadequate {noPreferencePct} of the time. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
        fallback:
          "chrF measures resemblance to how the community writes; only native judgment measures fluency. In blind comparisons to date, speakers have most often found both answers inadequate. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
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
        "These are the raw chrF values the agreement score is rescaled from - where a provider quota cut a run short, the n column shows fewer answers.",
      note2: {
        live: "Why the ceiling is about {honestCeilingChrfAll}, not 100. Two Igala speakers answering the same question rarely write the identical string, so even a perfect model cannot score 100 in raw chrF. We first published a ceiling of {shippedCeilingChrfAll}, but that number counted people re-submitting their own answer as two speakers agreeing. One answer per speaker gives the honest limit, and both versions are shown above so the correction stays visible.",
        fallback:
          "Why the ceiling sits well below 100. Two Igala speakers answering the same question rarely write the identical string, so even a perfect model cannot score 100 in raw chrF. The first published ceiling counted people re-submitting their own answer as two speakers agreeing; one answer per speaker gives the honest limit, and both versions are shown above so the correction stays visible.",
      },
    },
  },

  testedNow: {
    id: "tested-now",
    overline: "Open questions",
    title: "What is being tested now",
    items: [
      {
        title: "v1 versus v2, judged by the community.",
        live: "The scoreboard cannot see sentence structure - character overlap treats a coherent sentence and a word salad with the same words alike, and because the frozen questions are mostly single-word lookups, v1 can outrank v2 there even where v2's sentences are better built. Both versions stay live in the chat so the community's review team can judge, side by side, exactly the thing the benchmark cannot measure.",
        fallback:
          "The scoreboard cannot see sentence structure - character overlap treats a coherent sentence and a word salad with the same words alike, and because the frozen questions are mostly single-word lookups, v1 can outrank v2 there even where v2's sentences are better built. Both versions stay live in the chat so the community's review team can judge, side by side, exactly the thing the benchmark cannot measure.",
      },
      {
        title: "The me- numeral question.",
        live: "Aligning the Bible parallel corpus surfaced numeral forms with a me- prefix (meji, meta) alongside the dictionary's plain citation forms (eji, eta). The reference grammar says Igala agreement is governed by number, which makes a numeral concord form plausible - but plausible is not confirmed, so the question goes to speakers before the corpus teaches the model a pattern the community has not confirmed.",
        fallback:
          "Aligning the Bible parallel corpus surfaced numeral forms with a me- prefix (meji, meta) alongside the dictionary's plain citation forms (eji, eta). The reference grammar says Igala agreement is governed by number, which makes a numeral concord form plausible - but plausible is not confirmed, so the question goes to speakers before the corpus teaches the model a pattern the community has not confirmed.",
      },
      {
        title: "Pending unlocks.",
        live: "The Idakwoji lexicon, a published dictionary of roughly 5,000 headwords, against the {lexEntries} dictionary lines the system serves from today - lexical coverage, not model architecture, is the binding constraint. And a collaborating linguist's syntax write-up, to turn structural review into data.",
        fallback:
          "The Idakwoji lexicon, a published dictionary of roughly 5,000 headwords, several times the dictionary the system serves from today - lexical coverage, not model architecture, is the binding constraint. And a collaborating linguist's syntax write-up, to turn structural review into data.",
      },
    ] as ExplainerBlock[],
  },

  changelog: {
    id: "changelog",
    overline: "The record",
    title: "What changed, when",
    intro:
      "The dates are fixed history - what each day added and what it corrected. Every live number they produced is recomputed above, not repeated here.",
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
        text: "The frontier arms joined the board. Gemini 3.1 Pro topped it untouched; Claude Opus 5 gained +22 from community retrieval - a clean read on knowledge versus skill. The internal method page was opened to the whole team and the cost ledger rebuilt.",
      },
      {
        date: "Aug 14, 2026",
        text: "A working grammar deduced from all the evidence, and METHOD v3, which enshrines only its strongest-graded rules in the system prompt.",
      },
      {
        date: "Aug 17, 2026",
        text: "The benchmark visual and the Community Agreement Score: leak-free stripped chrF rescaled so the deduplicated native-speaker ceiling reads 100, drawn LLM-benchmark style with confidence whiskers. The raw chrF table moved under the chart; nothing was removed and no score is capped.",
      },
      {
        date: "Aug 29, 2026",
        text: "Permission arrived for previously restricted sources - PanLex, GRN's “Words of Life” recording (signed agreement, Aug 27), the JWAL papers, Egbunu's proverbs study, and Arokoyo's phonology - granted on calls with the rights holders, written terms held by Wikitongues. The GRN audio (45:38, the only usable Igala speech asset) and six Bible-for-Children booklets were acquired as raw assets; the booklets' fonts silently strip the ẹ/ọ subdots on extraction, so nothing from them may enter the corpus until that is solved. No text was ingested under any of these grants yet - the corpus counters above are unchanged, and any future ingestion happens only after the written terms are confirmed.",
      },
    ] as ChangelogEntry[],
  },
};

export type HowItWorksContent = typeof howItWorks;
