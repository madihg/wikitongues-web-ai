// Long-form copy for the public /record/ page: the evidence behind the main
// page, for funders, researchers and anyone who wants to check our work. Until
// 2026-11-13 this was the /how-it-works/ page; the explanation of the method
// now lives on the main page (content/en/home.ts, content/en/method.ts). Kept out of JSX (house rule) so it
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

export interface ChangelogEntry {
  date: string; // fixed history, e.g. "Aug 17, 2026"
  text: string;
}

export const record = {
  meta: {
    title: "The record",
    description:
      "The evidence behind Wikitongues AI: every blind comparison, the exam, each version of the Igala language layer, the models' instructions, and a dated log.",
  },

  hero: {
    title: "The record",
    intro:
      "This page holds the evidence behind the main page. It is long, and it is written for people who want to check our work. The short version is on the main page.",
    intro2:
      "The figures here are fetched from the project database when you open the page. If the feed is down, the page says so and shows no figures.",
    indexHeading: "On this page",
    mainPageLink: { label: "Go to the main page", href: "/" },
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
  },

  journey: {
    id: "versions",
    title: "Each version of the language layer",
    intro:
      "No model here is trained on Igala. Each version changes what Igala material the model is given when it answers, and how it is told to use it. Each fix exposed the next problem.",
    fixedLabel: "What it fixed",
    missingLabel: "What it did not",
    stages: [
      {
        name: "v0, plain models",
        sub: "Ask a model, nothing added",
        fixed: "Nothing. This is the starting point.",
        missing:
          "Asked for Igala, the models answer in Yoruba or English, with invented words in between.",
      },
      {
        name: "v1, real answers",
        sub: "Speakers' answers placed in front of the model",
        fixed: "Real Igala words start to appear.",
        missing:
          "Words without sentence structure. A community reviewer put it plainly: the first sentence is saying three different things.",
      },
      {
        name: "v2, a method",
        sub: "A dictionary, example sentences, and a step-by-step procedure",
        fixed: "Correct spellings, and sentence shapes copied from real ones.",
        missing: "The model copies. It does not compose.",
      },
      {
        name: "v3, the grammar",
        sub: "Version 2 plus grammar rules read from the evidence",
        fixed:
          "Pronouns, negation and word order arrive as rules. Speakers prefer this version to the plain model when judging blind.",
        missing:
          "The same rules made Claude worse. On the exam, version 3 is not measurably ahead of the plain model.",
      },
      {
        name: "v4, meaning first",
        sub: "The instructions rewritten around one rule from the speakers' review",
        fixed:
          "The model translates the meaning of the whole sentence, and it now sees the speakers' corrections.",
        missing:
          "Long, cultural, open-ended questions still fail. Speakers never judged this version.",
      },
      {
        name: "v4.1, rules from the failures",
        sub: "Version 4 plus rules drawn from every judged failure, and one chance to rewrite",
        fixed:
          "Undoes the harm version 3 did to Claude. Beats version 3 on the exam in a paired test.",
        missing:
          "The gain over version 4 is mostly fewer tone marks. Speakers never judged this version.",
      },
      {
        name: "v4.2, names kept",
        sub: "Names are copied letter for letter",
        fixed:
          "The model stops respelling people, places and schools, and stops dropping a fact it has no Igala word for.",
        missing: "Speakers never judged this version.",
      },
      {
        name: "v4.3, rules for the question",
        sub: "Up to three grammar rules chosen for the question at hand",
        fixed:
          "Forms from a 2023 paper on Igala concord, and from what the speakers taught us in September, reach the model.",
        missing: "Speakers never judged this version.",
      },
      {
        name: "v4.4, lines amended",
        sub: "Version 4.3 with instructions changed after the same corrections",
        fixed:
          "In the blind test since October 8. Speakers prefer it to the plain model and to version 3.",
        missing: "The counts are in the panels above.",
      },
      {
        name: "v4.5, tone marks left off",
        sub: "The current version, in the blind test since October 10",
        fixed:
          "It leaves tone marks off, as most speakers do. Speakers prefer it to the plain model.",
        missing:
          "On the exam its words are no better than version 4.4's. The linguists on the team want tone marks written, which this version does not do.",
      },
    ] as JourneyStage[],
  },

  assembly: {
    id: "assembly",
    title: "How one answer is built",
    intro:
      "When a question comes in, the system gathers the matching pieces of the language layer. It places them around the question in a fixed order and sends the whole bundle to the model. The current version is 4.5.",
    intro2:
      "On exam questions, every piece is checked first. If a piece contains a speaker's answer to that same question, it is dropped and the drop is recorded. Without that check the test would hand the model its answer.",
    guardBadge: "checked before exam questions",
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
        why: "A single line under the question restating the output rule: answer in Igala only, nothing else. Then, from version 4.1 on, a check of the finished answer. If it uses letters Igala does not have, or is crowded with tone marks the community would not write, the model is asked once to rewrite it. So an answer can be the model's second attempt, and its exam score is scored that way. Since version 4.3, up to three grammar rules chosen for the question are placed at its head. In version 4.5 the dictionary lines are given without tone marks, unless the question is about tone.",
        guarded: false,
      },
    ] as AssemblyStep[],
  },

  prompts: {
    id: "prompts",
    title: "The exact instructions the models receive",
    intro:
      "These are the instructions as the models receive them, word for word. A community should be able to read every instruction given in its language's name. Each one opens when pressed.",
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
      "The v4.1 prompt is v4 plus what the judged failures taught us: rules for serial verbs, wishes, the dative, and a few small words; an instruction to perform a greeting rather than describe one; a rule against inventing dialect facts; and a list of the invented words this model kept producing. The version in service today is 4.5. The instructions for versions 4.2 to 4.5 are in the platform's public code and have not been copied to this page yet.",
    v41Label: "System prompt, v4.1 (the method + the mined rules)",
    terminalIntro: "And the one line appended below every question:",
    terminalLabel: "The closing rule",
  },

  verdicts: {
    id: "verdicts",
    title: "Every blind comparison",
    intro:
      "Each panel below is one pair of systems that speakers compared without knowing which was which. Each row in a panel is one round of judging, shown as ten dots. The questions change from round to round, so read each row on its own.",
    // {ours} and {plain} are model names from the live payload, not tokens
    // from liveValues, so the content test skips this template.
    pairCaption: "{ours} against {plain}, judged blind by native speakers.",
    // {newer} and {older} are model names from the live payload.
    versionPairCaption:
      "{newer} against {older}: two versions of our package, judged blind by native speakers.",
    // {n} is the round's judgment count, filled by the chart itself.
    roundCaption: "{n} judgments",
    legend: {
      ours: "preferred ours",
      plain: "preferred the plain model",
      tie: "called it a draw, or left no verdict",
      neither: "rejected both",
    },
    // {newer} / {older} are short version names ("v4.4"), filled by the chart.
    versionLegend: {
      newer: "preferred {newer}",
      older: "preferred {older}",
    },
    // Computed from the share of decided judgments, never typed by hand.
    margin: {
      clearlyAhead: "clearly ahead",
      ahead: "ahead, not far ahead",
      level: "level",
      behind: "behind, not far behind",
      clearlyBehind: "clearly behind",
    },
    // Filled by the chart from the drawn pair; see readingFor() for the keys.
    reading: {
      twoRounds:
        "On the {latestLabel}, speakers rejected both answers {latestNeitherPerTen} times in ten, against {firstNeitherPerTen} on the {firstLabel}; the questions changed between the rounds, so read each row on its own. When they preferred one answer in the latest round, they preferred ours {latestOursOfDecided} times and the plain model {latestPlainOfDecided} times, out of {latestDecided}: {margin}.",
      oneRound:
        "So far, speakers rejected both answers {latestNeitherPerTen} times in ten. When they preferred one answer, they preferred ours {latestOursOfDecided} times and the plain model {latestPlainOfDecided} times, out of {latestDecided}: {margin}.",
      versions:
        "In the latest round, when speakers preferred one version, they preferred {newer} {newerWins} times and {older} {olderWins} times, out of {decided}: {newer} is {margin}. They rejected both answers {neitherPerTen} times in ten.",
    },
    noPairYet:
      "No blind round between a plain model and our package has been judged yet.",
    unjudgedNote:
      "Speakers can only judge the versions in the blind test. Until October 8 that was version 3 alone. Version 4.4 joined on October 8 and version 4.5 on October 10. Versions 4 to 4.3 have only taken the exam. We do not chart how often an answer was left uncorrected: speakers can only correct the answer they chose, so the answer that wins more is corrected more. A draw also covers the judgments where a speaker recorded no verdict.",
  },

  benchmark: {
    id: "benchmark",
    title: "The exam",
    chartHeading: "Community Agreement Score",
    intro: {
      live: "The exam is a set of {frozenPrompts} questions that stay the same, so that versions can be compared. Each model's answer is compared with what speakers wrote for the same question. The score is automatic and it has known faults, which this section explains. It is a rough check. The blind comparisons above are the result.",
      fallback:
        "The exam is a fixed set of questions that stay the same, so that versions can be compared. Each model's answer is compared with what speakers wrote for the same question. The score is automatic and it has known faults, which this section explains. It is a rough check. The blind comparisons above are the result.",
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
    title: "Open questions",
    items: [
      {
        title: "Four systems are in the blind test.",
        live: "They are the plain model and versions 3, 4.4 and 4.5 of the language layer. Every judgment between them, {poolComparisons} so far, is drawn in the panels at the top of this page.",
        fallback:
          "They are the plain model and versions 3, 4.4 and 4.5 of the language layer. Every judgment between them is drawn in the panels at the top of this page.",
      },
      {
        title: "Tone marks.",
        live: "Most speakers leave tone marks off when they type, and version 4.5 does the same. The linguists on the team want them written, because tone changes meaning in Igala. We plan a second pass in which tone marks are added to a sample of answers. The first version is kept beside it, so that both can be measured.",
        fallback:
          "Most speakers leave tone marks off when they type, and version 4.5 does the same. The linguists on the team want them written, because tone changes meaning in Igala. We plan a second pass in which tone marks are added to a sample of answers. The first version is kept beside it, so that both can be measured.",
      },
      {
        title: "Two grammar questions only speakers can settle.",
        live: "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) beside the dictionary's plain forms (eji, eta). And three separate corrections closed a yes-or-no question with a small final word our deduced grammar says does not exist. Both are plausible. Neither is confirmed, so neither goes into the rules until the linguists and the speakers have looked.",
        fallback:
          "Lining up the Bible sentence pairs surfaced number words with a me- prefix (meji, meta) beside the dictionary's plain forms (eji, eta). And three separate corrections closed a yes-or-no question with a small final word our deduced grammar says does not exist. Both are plausible. Neither is confirmed, so neither goes into the rules until the linguists and the speakers have looked.",
      },
      {
        title: "Words, not spelling.",
        live: "Speakers who answer the same question usually choose the same word and often spell it differently. So the first thing to agree on is spelling, not vocabulary.",
        fallback:
          "Speakers who answer the same question usually choose the same word and often spell it differently. So the first thing to agree on is spelling, not vocabulary.",
      },
      {
        title: "What we are waiting for.",
        live: "A score that cannot pass 100 by construction, and a version of it that ignores tone marks, so that a gain in tone-mark habits cannot pass for a gain in grammar. Written permission on file for every text source we use: today only one is, and the Bible corpus, our largest, is not. A published Igala dictionary of roughly 5,000 headwords, against the {lexEntries} dictionary lines the system serves from today. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' corrections into rules with a second source behind them.",
        fallback:
          "A score that cannot pass 100 by construction, and a version of it that ignores tone marks, so that a gain in tone-mark habits cannot pass for a gain in grammar. Written permission on file for every text source we use: today only one is, and the Bible corpus, our largest, is not. A published Igala dictionary of roughly 5,000 headwords, several times what the system serves from today. And a collaborating linguist's write-up of Igala sentence structure, to turn the speakers' corrections into rules with a second source behind them.",
      },
    ] as ExplainerBlock[],
  },

  areas: {
    id: "areas",
    title: "The questions, by area",
    intro: {
      // {promptsTotal} comes from the public stats feed, filled by the
      // component that draws this section.
      live: "Speakers have {promptsTotal} questions to work through. Each one tests one of eight areas.",
      fallback: "Each question tests one of eight areas.",
    },
    areaHeader: "Area",
    countHeader: "Questions",
  },

  reading: {
    id: "reading",
    title: "Further reading",
    intro: "Work this project draws on.",
    opensInNewTab: "(opens in a new tab)",
  },

  changelog: {
    id: "changelog",
    title: "What changed, when",
    intro:
      "The dates are fixed history: what each day added and what it corrected. Every live figure they produced is recomputed above, not repeated here.",
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
      {
        date: "Sep 13, 2026",
        text:
          "Names are not translated. Reviewing a live Wikipedia translation on Sep 1, Igala speakers judged the grammar good and found the failures were elsewhere: the model was respelling people, places and schools because Igala has no s, and it dropped a fact it had no Igala word for. The cause was partly ours - a serving check meant to catch invented words was flagging the copied names as illegal letters and asking the model to rewrite them. Serving v4.2 copies names letter for letter and never drops a fact for want of a word. 124 new questions went to the annotators, aimed at what is still open: the direction words the speakers themselves disagreed about, year expressions, borrowed words, and how Igala reads in an encyclopedia.",
      },
      {
        date: "Sep 23, 2026",
        text:
          "The speakers' verdict is now on this page, ten questions at a time: for each round of blind judging, how many of every ten questions went to our package, to the plain model, to a draw, or to neither. Two rounds so far, on different question batches, with the same v3 package in both, so the rows show the questions changing, not the model. A chart of how often an answer was left uncorrected was considered and dropped, because speakers can only correct the answer they chose, so the answer that wins more is corrected more. Salem's copy of Ejeba's 2023 paper on Igala concord was read line by line: 178 rules, 43 already in the prompt, 24 in abstract notes, the rest nowhere we served. Version 4.3 adds a grammar block to the question, up to three rules retrieved for the question at hand, carrying the forms the paper gives (du and kó with wa for bring, tinyo and rinyo for throw away, abọ for people only) and what the annotators taught us this month (efẹwọ before a town, lo ti before a destination, dates with the day as a plain number). Version 4.4 keeps the block and amends twelve prompt lines from the same corrections. Versions 4.3 and 4.4 sat the frozen exam the same day; their rows are in the table above, and neither has been judged by speakers yet.",
      },
      {
        date: "Oct 8, 2026",
        text:
          "Version 4.4 joined the blind test: from today speakers judge it against the plain model and against the v3 package, on the questions still in their queues, so the next round measures one version against the next directly. The human verdict above opens a third round at that moment, and now draws every pair the speakers have judged, computing its words (ahead, level, behind) from the counts. Three corrections: the scoreboard had labelled versions 4.2 to 4.4 as retrieval v1 since they were registered; the fill script would have written a pooled 4.x version's answers with the wrong prompt; and the repair round's checker, which re-asks the model when an answer breaks a writing rule, had been misreading quoted questions (a quote mark stuck to a name, and a request for English switched the letters check off for the whole answer). All three are fixed and tested, and every stored answer the old checker had wrongly re-asked was replayed through the new one.",
      },
      {
        date: "Oct 9, 2026",
        text:
          "The speakers' queues had run dry, so 108 new questions went in, built from what the speakers have told us: every judgment, every word they corrected, their own answers, and Salem and Lydia's write-up on Igala grammar. Each question aims at one thing the model still gets wrong (the linker ki, set phrases such as good night, number agreement, money, loan words, one form of each word in an answer), with control questions where the rule must not fire. Version 4.5 sat the frozen exam: 122.7 against 105.3 for version 4.4, but 94.8 against 94.7 once tone marks are set aside, so the gain is that it now leaves tone marks off, as the speakers do; its words are no better than version 4.4's on this exam. It is not in the blind test. On the chat page, a version 4.5 answer can now show a second rendering under it, every word toned and written out in full, as Salem and Lydia asked; that rendering is not stored and not scored.",
      },
      {
        date: "Oct 10, 2026",
        text:
          "Version 4.5 joined the blind test: speakers now judge it against version 4.4 and against the plain model, starting with the 108 new questions, in the round the verdict opened on Oct 9. It was meant to join on Oct 9; the job that makes the switch stopped with the machine it ran on, and the switch was made the next morning. The platform where speakers work moved to app.wikitongues.org, and the old address still works. This page is now the only telling of how the project works: the platform's own copy of it redirects here.",
      },
  ] as ChangelogEntry[],
  },
};

export type RecordContent = typeof record;
