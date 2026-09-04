// Long-form copy for the public /how-it-works page: the Igala pilot end to
// end, for funders, allies, and community members - written for readers who
// have never touched machine learning. Kept out of JSX (house rule) so it
// stays translatable and reviewable.
// House style: plain short sentences, no em dashes, every term of art named
// once and explained in normal words; institutions and roles rather than
// individual annotators' names.
//
// 2026-09-01: rewritten after an adversarial audit of every public number
// (tasks/project-audit-2026-09-01.md in the app repo). Nothing on this page
// may state a claim the audit could not reproduce; the Sep 1 changelog entry
// records what was corrected and why.
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
      "Igala speakers are teaching AI models their language. This page shows how: who writes the answers, how each answer is built, the exact instructions the models receive, an honestly measured scoreboard, and what an audit of our own numbers corrected.",
  },

  hero: {
    overline: "The whole machine",
    title: "How it works",
    intro:
      "Ask most AI models a question in Igala and they answer in Yoruba or English instead. So Igala speakers are teaching the models their own language: they write answers, compare model answers without knowing which model wrote what, and fix mistakes by hand. This page shows the whole thing, in plain words, including the parts we got wrong.",
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
        {
          title: "Answers by speakers",
          line1: "some written cold, most written after rejecting a model's attempt",
        },
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
          line2: "four sources: words lined up from the Bible, a community wordlist, an 1854 wordlist, and Wiktionary",
        },
        {
          title: "Example sentences",
          line1: "{parallelPairs} Igala-English pairs",
          line2: "how sentences are built",
        },
        {
          title: "Grammar rules",
          line1: "read out of all the evidence",
          line2: "four rules stand on two sources; the rest are the community's own spelling choices",
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
        "3  corrections speakers made to earlier answers",
        "4  example sentences: how Igala is built",
        "5  dictionary lines for this question's words",
        "6  the question, plus one closing rule",
      ],
      modelBox: { title: "Model", line1: "any of them" } as DiagramBox,
      answerBox: { title: "Answer", line1: "in Igala" } as DiagramBox,
      judgmentLabel: "Judgment, the only measure that finally counts",
      judgmentBox: {
        title: "Native judgment",
        line1: "blind pairs + corrections on the models in the pool",
        line2: "what speakers fix becomes tomorrow's rules",
      } as DiagramBox,
      judgmentCountLive: "{poolComparisons} strong-pair judgments so far",
      judgmentCountCollecting: "collecting now",
      examBox: {
        title: "Frozen exam",
        line1: "{frozenPrompts} questions no model retrieves on",
        line2: "scored leak-free only",
      } as DiagramBox,
      scoreBox: {
        title: "Agreement Score",
        line1: "100 = two native speakers' agreement with each other",
        line2: "bars past 100 are partly built in; see below",
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
    title: "Six versions of the same idea",
    intro:
      "None of these models learns Igala the way a person does. Each version changes what real Igala the model gets to see at the moment it answers, and how it is told to use it. Each fix exposed the next problem.",
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
        fixed: "Pronouns, negation and word order arrive as rules. Speakers prefer this version to the plain model when judging blind.",
        missing:
          "The same rules made Claude worse, not better. And on the exam, v3 is not measurably ahead of the plain model.",
      },
      {
        name: "v4 - translate the meaning",
        sub: "The instructions rewritten around one rule from the community's review",
        fixed:
          "Whole-sentence meaning instead of word by word. Speakers' own corrections are now packed into the prompt too.",
        missing:
          "Long, cultural, open-ended questions still collapse. No speaker has judged this version yet.",
      },
      {
        name: "v4.1 - the rules the failures taught us",
        sub: "v4 plus rules mined from every judged failure, and a repair round",
        fixed:
          "Undoes the damage v3 did to Claude. Beats v3 on the exam in a paired test, the only step between versions that does.",
        missing:
          "The gain over v4 is mostly fewer tone marks, which the community rarely writes. No speaker has judged this version yet.",
      },
    ] as JourneyStage[],
  },

  assembly: {
    id: "assembly",
    overline: "Zooming in",
    title: "How one answer is built today",
    intro:
      "When someone asks a question, the system packs a bundle around it, in this order, and sends the whole bundle to the model. Today's version is v4.1. It uses the same bundle as v4 and changes only the rules on top, so any difference between the two comes from the rules and from the repair round described below.",
    intro2:
      "One more thing happens first. On exam questions, every piece passes the leak guard: if a piece contains that question's own community answer, it is dropped and the drop is recorded. Otherwise the test would hand the model its answer key.",
    guardBadge: "passes the leak guard",
    steps: [
      {
        title: "The rules (system prompt)",
        why: "A numbered procedure telling the model how to use everything below: the dictionary for word forms, the examples for sentence shape, and, since v4, one rule above all others: translate the meaning of the whole sentence, never word by word.",
        guarded: false,
      },
      {
        title: "Real answers by speakers",
        why: "Question-and-answer pairs written by Igala speakers, shown as example exchanges. The model sees what a good answer looks and sounds like: short, in Igala, spelled the community's way.",
        guarded: true,
      },
      {
        title: "Corrections speakers made",
        why: "Since v4: a few cases where a model wrote something, a speaker fixed it, and the speaker said why. The model sees the mistake and the fix side by side, which teaches more than the fix alone.",
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
        title: "One closing rule, then a repair round",
        why: "A single line under the question restating the output rule: answer in Igala only, nothing else. Then, on v4.1 only, a check of the finished answer. If it uses letters Igala does not have, or is crowded with tone marks the community would not write, the model is asked once to rewrite it. So a v4.1 answer can be the model's second attempt, and its exam score is scored that way.",
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
      "The v3 prompt is the same skeleton plus the grammar. Four of its rules stand on two independent sources; the others describe how the community spells, which only the community's own writing can confirm.",
    v3Label: "System prompt, v3 (the method + the grammar)",
    v4Intro:
      "The v4 prompt rewrote the method around one instruction from the community's review: translate what the sentence means, never one word at a time, and leave out what the examples leave out.",
    v4Label: "System prompt, v4 (meaning first)",
    v41Intro:
      "The v4.1 prompt is v4 plus what the judged failures taught us: rules for serial verbs, wishes, the dative, and a few small words; an instruction to perform a greeting rather than describe one; a rule against inventing dialect facts; and a list of the invented words this model kept producing. This is the version serving today.",
    v41Label: "System prompt, v4.1 (the method + the mined rules)",
    terminalIntro: "And the one line appended below every question:",
    terminalLabel: "The closing rule",
  },

  benchmark: {
    id: "benchmark",
    overline: "Honest measurement",
    title: "The scoreboard: Community Agreement Score",
    intro: {
      live: "Every model takes the same exam: {frozenPrompts} frozen questions that no model retrieves community answers for. Each answer is compared with what Igala speakers wrote for the same question. A longer bar means closer to how the community actually writes. The yardstick is this one community's writing, on Igala questions only. A high bar here claims nothing beyond Igala, and a bar past the 100 line is partly built in, which the notes below explain.",
      fallback:
        "Every model takes the same exam: a set of frozen questions that no model retrieves community answers for. Each answer is compared with what Igala speakers wrote for the same question. A longer bar means closer to how the community actually writes. The yardstick is this one community's writing, on Igala questions only. A high bar here claims nothing beyond Igala, and a bar past the 100 line is partly built in, which the notes below explain.",
    },
    chart: {
      referenceLineLabel: "native speaker agreement",
      showAllLabel: "Show all {count} models",
      underpoweredMark:
        "* too few leak-free answers for an uncertainty range - single estimate only.",
      footnote:
        "100 = one native speaker's agreement with another (chrF {ceilingChrf} on the same questions, one answer per speaker). Scored on the {leakFreePrompts} leak-free frozen questions. The whiskers show the uncertainty: re-draw the exam questions and the score lands inside them 95 times out of 100. A bar past the 100 line does not mean the model beat the speakers. The model is scored against every community answer for a question, while each speaker is scored against the other speakers only, and that gives models a built-in advantage that grows with the number of answers per question. Scored like-for-like, the best system sits at speaker level. This score is being replaced with one that cannot pass 100 by construction; until then, read a bar past 100 as \"at speaker level\", not above it.",
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
        title: "Why a bar could pass 100, what we fixed, and what it revealed.",
        live: "We first wrote that a bar past 100 meant the model matched the community more closely than one speaker matches another. That was mostly built in, and it has now been fixed: a model is scored against the same answers a held-out speaker is scored against, so the two numbers are finally comparable. The old figure is kept beside the new one so you can see what moved. But fixing it exposed something larger. We built a control that takes a plain model's answers and simply deletes the tone marks, with no method involved, and it scores higher than every system we have built. Roughly three quarters of the community's exam answers carry no tone marks, so a measure built on letter overlap rewards a model for leaving them off. The number below is therefore a measure of resemblance, and part of that resemblance is punctuation habits rather than language. That is why the blind judgments of native speakers, not this chart, are what the project treats as the result.",
        fallback:
          "We first wrote that a bar past 100 meant the model matched the community more closely than one speaker matches another. That was mostly built in, and it has now been fixed: a model is scored against the same answers a held-out speaker is scored against, so the two numbers are finally comparable. The old figure is kept beside the new one so you can see what moved. But fixing it exposed something larger. We built a control that takes a plain model's answers and simply deletes the tone marks, with no method involved, and it scores higher than every system we have built. Roughly three quarters of the community's exam answers carry no tone marks, so a measure built on letter overlap rewards a model for leaving them off. The number below is therefore a measure of resemblance, and part of that resemblance is punctuation habits rather than language. That is why the blind judgments of native speakers, not this chart, are what the project treats as the result.",
      },
      {
        title: "Why it is measured on the leak-free subset, and who wrote the answers.",
        live: "{leakedPrompts} of {frozenPrompts} frozen questions once had one of their own community answers slip into the material served to the models. On those questions a high score measures copying, not competence. So the score uses only the {leakFreePrompts} questions where that never happened, and its 100 line is computed on those same questions with one answer per speaker: someone re-submitting their own answer does not count as two people agreeing. One more thing we got wrong: we called the exam answers cold, written before seeing any model. More than half were written by a speaker after seeing and rejecting a model's attempt. That is still a native speaker's answer, but it is not untouched by the models, and a version of the score using only the cold answers is on the way.",
        fallback:
          "During an early audit, some frozen questions were found to have had one of their own community answers slip into the material served to the models. On those questions a high score measures copying, not competence. So the score uses only the questions where that never happened, and its 100 line is computed with one answer per speaker: someone re-submitting their own answer does not count as two people agreeing. One more thing we got wrong: we called the exam answers cold, written before seeing any model. More than half were written by a speaker after seeing and rejecting a model's attempt. That is still a native speaker's answer, but it is not untouched by the models, and a version of the score using only the cold answers is on the way.",
      },
      {
        title: 'Why we do not call it "% fluent".',
        live: "The score measures resemblance to how the community writes. Only native judgment measures fluency. In {pairwiseComparisons} blind comparisons to date, speakers found both answers inadequate {noPreferencePct} of the time. That rate has fallen since August, but mostly because the models being compared changed, not because the method improved: the early comparisons were between weaker models. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
        fallback:
          "The score measures resemblance to how the community writes. Only native judgment measures fluency. In blind comparisons to date, speakers have most often found both answers inadequate. That rate has fallen since August, but mostly because the models being compared changed, not because the method improved: the early comparisons were between weaker models. So these bars chart progress from does-not-speak-Igala toward speaks-it-badly, and the speakers judge the rest.",
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
        "These are the raw chrF values the agreement score is rescaled from. Where a provider quota cut a run short, the n column shows fewer answers. Where a provider returned nothing, an empty answer is currently scored as zero; those rows are being separated out.",
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
        title: "The blind test so far belongs to one pairing.",
        live: "Every blind judgment on the strong systems to date, {poolComparisons} of them, compares Gemini with our v3 package against the same Gemini with nothing added. When speakers preferred one answer, they preferred ours about four times in five, and every one of the six annotators leans that way. Counted once per question rather than once per judgment, it is still a clear win. What no speaker has judged yet: v4 and v4.1, the versions that top the exam. That is the next test, and it comes before any further prompt engineering.",
        fallback:
          "Every blind judgment on the strong systems to date compares Gemini with our v3 package against the same Gemini with nothing added. When speakers preferred one answer, they preferred ours about four times in five, and every one of the six annotators leans that way. Counted once per question rather than once per judgment, it is still a clear win. What no speaker has judged yet: v4 and v4.1, the versions that top the exam. That is the next test, and it comes before any further prompt engineering.",
      },
      {
        title: "Two grammar questions only speakers can settle.",
        live: "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) beside the dictionary's plain forms (eji, eta). And three separate corrections closed a yes-or-no question with a small final word our deduced grammar says does not exist. Both are plausible. Neither is confirmed, so neither goes into the rules until the linguists and the speakers have looked.",
        fallback:
          "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) beside the dictionary's plain forms (eji, eta). And three separate corrections closed a yes-or-no question with a small final word our deduced grammar says does not exist. Both are plausible. Neither is confirmed, so neither goes into the rules until the linguists and the speakers have looked.",
      },
      {
        title: "Pending unlocks.",
        live: "A score that cannot pass 100 by construction, and a version of it that ignores tone marks, so that a gain in tone-mark habits cannot pass for a gain in grammar. Written permission on file for every text source we use: today only one is, and the Bible corpus, our largest, is not. A published Igala dictionary of roughly 5,000 headwords, against the {lexEntries} dictionary lines the system serves from today. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' corrections into rules with a second source behind them.",
        fallback:
          "A score that cannot pass 100 by construction, and a version of it that ignores tone marks, so that a gain in tone-mark habits cannot pass for a gain in grammar. Written permission on file for every text source we use: today only one is, and the Bible corpus, our largest, is not. A published Igala dictionary of roughly 5,000 headwords, several times what the system serves from today. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' corrections into rules with a second source behind them.",
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
        text: "The Bible parallel corpus - 30,907 Igala-English sentence pairs from the Bible Society of Nigeria's Igala Bible - plus a 2,104-entry lexicon, powering retrieval v2 and THE METHOD. Corrected Sep 1: this entry said the pairs were ingested under BSN permission. Our records hold two written requests to the Society and no reply, so no permission is on file. What that means for the corpus is an open item recorded in the Sep 1 entry.",
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
      {
        date: "Aug 31, 2026",
        text: "METHOD v4 and v4.1. v4 rewrote the instructions around one rule from the community's review: translate the meaning of the whole sentence, never word by word. v4.1 added eight grammar rules mined from 132 judged failures, a step that tells the model to perform a greeting rather than describe one, a rule against inventing dialect facts, and a repair round: when an answer uses letters Igala does not have or is saturated with tone marks, the model is asked once to rewrite it. On the frozen exam Gemini v4.1 scored 120 and v4 102; Claude v4.1 scored 93 against 55 for Claude v3, so the rules that had hurt Claude at v3 no longer do. Nine grammar entries were added to the knowledge store, but the v4 retrieval path does not read them, so they contribute nothing to these scores.",
      },
      {
        date: "Sep 1, 2026",
        text: "An adversarial audit of every public number, run against the live database. What it corrected. A bar past the 100 line is mostly built in: a model is scored against every community answer for a question while a speaker is scored against the other speakers only. Scored like-for-like the best system sits at about 103, level with the speakers, and the score is being replaced by one that cannot pass 100 by construction. The v4 to v4.1 gain is mostly fewer tone marks, which the community rarely writes; with tone marks ignored the two versions are level. The sentence \"the grammar lifts Gemini measurably\" was not supported and has been removed. The blind preference belongs to one pairing only, Gemini with the v3 package against the same Gemini with nothing added: 54 to 14, with ties and double rejections counted separately, or 25 to 7 when each question is counted once. No speaker has yet judged v4 or v4.1. The fall in \"both answers inadequate\" from 99% to about half came with a change of models, not from the method. 131 of the 238 exam answers were written after a speaker saw and rejected a model's attempt, so \"written before seeing any model\" was wrong for more than half of them. And the Bible corpus had been described as used under a BSN permission that our records do not contain. What held: speakers prefer the v3 package to nothing, every one of the six annotators; v4.1 undid the regression v3 caused for Claude; and v4.1 beats v3 on the exam in a paired test, the only step between Gemini versions that does.",
      },
        {
        date: "Sep 3, 2026",
        text: "The score was rebuilt so that a model is judged the way a speaker is judged: against the same answers, with the same one left out. The old construction stays beside it, marked deprecated, so the change is visible rather than silent. Then a control settled what the score has actually been measuring. Taking bare Gemini's answers and deleting the tone marks, with no model and no method involved at all, scores higher than every real system we have built. The community writes tone marks on about a quarter of its answers, so a measure built on letter overlap rewards leaving them off. Read plainly: the scoreboard has been ranking tone-mark habits as much as Igala. A tone-insensitive column now sits beside the main one, and it presses every system into a narrow band with the order scrambled. The repair round, which asks a model to rewrite an answer that breaks the spelling rules, turns out to be worth little to Gemini and a great deal to Claude. None of this touches the human result: speakers judging blind still prefer the v3 package to the plain model.",
      },
  ] as ChangelogEntry[],
  },
};

export type HowItWorksContent = typeof howItWorks;
