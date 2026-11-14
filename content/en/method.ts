// The loop: the eight steps of the method, as data. The animated diagram on
// the main page (components/method/MethodLoop.tsx) renders from this file, and
// so does the numbered list beside it, which is also what a screen reader, a
// browser with reduced motion, and a browser without JavaScript get.
//
// Rules, enforced by tests/method.test.ts:
// - exactly eight steps;
// - every caption is at most 15 words;
// - every step has a note and a sentence for screen readers;
// - no em or en dashes.
//
// No Igala text appears here or in the diagram. This repository is public,
// and speakers' text is never committed to it, so answers are drawn as lines.

export interface MethodStep {
  /** One verb, used as the step's name everywhere. */
  name: string;
  /** Shown under the diagram. At most 15 words. */
  caption: string;
  /** The longer explanation, shown in the numbered list. */
  note: string;
  /** What the diagram shows at the end of this step, for screen readers. */
  screenReader: string;
}

export const method = {
  intro:
    "The method is one loop. A speaker asks, two models answer, the speaker judges and corrects, and the correction is kept for the next question.",

  stillCaption: "The whole loop. Press play, or read the steps below.",
  stillScreenReader:
    "The whole loop, with its parts numbered 1 to 8. Two AI models sit at the top. The speaker sits in the middle. The language layer sits at the bottom.",

  controls: {
    previous: "Previous step",
    next: "Next step",
    play: "Play",
    playDuration: "40 seconds",
    playAria: "Play the animation, 40 seconds",
    pause: "Pause",
    pauseAria: "Pause the animation",
    again: "Play again",
    stepThrough: "Step through",
    // {n} and {total} are filled by the component.
    position: "Step {n} of {total}",
    positionStill: "The whole loop",
  },

  listHeading: "The eight steps",

  // Labels drawn inside the diagram. Kept here so they are translated with
  // the rest of the copy.
  labels: {
    speaker: "Speaker",
    modelA: "Model A",
    modelB: "Model B",
    hidden: "Hidden",
    layer: "Language layer",
    picks: "Picks",
    withLayer: "with layer",
    without: "without",
    rowAnswer: "answer",
    rowCorrection: "correction",
    rowRule: "rule",
    why: "why",
    record: "Record",
    check: "Check",
    listen: "Listen",
  },

  steps: [
    {
      name: "Ask",
      caption: "A speaker answers a question in Igala, in their own words.",
      note: "Some questions are written by speakers. Others are built by our team from what the model got wrong last time. The questions cover eight areas, from spelling and tone marks to figures of speech and forms of respect.",
      screenReader:
        "A question card and the speaker's own answer are on the table.",
    },
    {
      name: "Answer",
      caption: "Two AI models answer the same question.",
      note: "Early in the pilot these were two different models. Today it is usually one model answering twice: once on its own, and once with the speakers' earlier corrections in front of it.",
      screenReader:
        "Two answer cards are on the table, one under each model. Both contain mistakes.",
    },
    {
      name: "Judge",
      caption:
        "The speaker picks the better answer without knowing which model wrote it.",
      note: "The names are hidden so that a model's reputation cannot sway the choice. The speaker can also call it a draw or reject both answers.",
      screenReader:
        "The model names are hidden. The speaker has picked the left answer.",
    },
    {
      name: "Correct",
      caption: "The speaker corrects the mistakes by hand and says why.",
      note: "The speaker also scores the answer from 1 to 5 on language and on culture. Language covers grammar, word choice, spelling and meaning. Culture covers relevance, register, dialect and words borrowed from other languages.",
      screenReader:
        "The picked answer now shows a correction and a note that says why.",
    },
    {
      name: "Keep",
      caption:
        "The correction is saved in the language layer, next to rules that linguists have checked.",
      note: "The language layer is a collection of material in one language. It holds the speakers' answers and corrections, a dictionary, example sentences and grammar rules. It belongs to the community that wrote it.",
      screenReader:
        "The language layer now holds three rows: the speaker's answer, the correction, and a grammar rule.",
    },
    {
      name: "Ask again",
      caption:
        "The next question goes to the model with matching pieces from the language layer.",
      note: "The model reads those pieces before it answers, and the answer comes back with fewer mistakes. The model itself is not retrained, so the same layer can work with any model.",
      screenReader:
        "A new question went to one model with pieces of the language layer attached. That model's answer has fewer mistakes, and the speaker picked it.",
    },
    {
      name: "Count",
      caption:
        "Every pick is counted. The counts show how well each model writes Igala.",
      note: "This count is the benchmark: a shared test that every model takes. The speakers' judgments improve the answers and measure them at the same time. The real figures are in Results, below.",
      screenReader:
        "The pick has become one mark in a tally, in the row for answers made with the language layer.",
    },
    {
      name: "Speak",
      caption:
        "Speech uses the same loop: record a clip, check it, listen to the model.",
      note: "A speaker records a sentence. A second speaker will check that the clip is clear and matches the text. The recordings will train a first speech model, and speakers will listen to its voice and rate it. Recording started in November 2026, with one speaker.",
      screenReader:
        "The same loop with sound. A speaker records a clip, a second speaker checks it, and speakers rate the model's voice.",
    },
  ] as MethodStep[],
};

export type MethodContent = typeof method;
