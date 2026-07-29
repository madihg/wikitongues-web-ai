// Long-form copy for the dedicated /research page. Kept out of JSX (like the
// rest of the site's content) so it stays translatable and reviewable. Diagram
// labels are data too, so the SVG/stepper components render from this file.
// House style: no em dashes (use " - "), no emojis.

export interface Step {
  title: string;
  detail: string;
}

export interface NamedDetail {
  name: string;
  detail: string;
}

export interface ResearchPageContent {
  meta: { title: string; description: string };
  hero: { overline: string; title: string; intro: string };
  why: {
    overline: string;
    title: string;
    lead: string;
    body: string[];
    statLabel: string;
    statCaption: string;
  };
  who: {
    overline: string;
    title: string;
    intro: string;
    groups: Array<{ name: string; role: string; detail: string }>;
  };
  how: {
    overline: string;
    title: string;
    intro: string;
    episode: { title: string; caption: string; steps: Step[] };
    flywheel: { title: string; caption: string; stages: NamedDetail[] };
    ladder: {
      title: string;
      caption: string;
      rungs: NamedDetail[];
      heldOut: { title: string; detail: string };
    };
  };
  learned: {
    overline: string;
    title: string;
    intro: string;
    findings: Array<{ title: string; body: string }>;
  };
  next: {
    overline: string;
    title: string;
    intro: string;
    items: Step[];
  };
  furtherReading: { overline: string; title: string; intro: string };
  // Last recorded pilot snapshot, shown only if the live fetch cannot reach the
  // stats API. Real measured values from the pilot record, not invented.
  fallbackStats: {
    caption: string;
    bothInadequateRate: number;
    promptsTotal: number;
    heldOut: number;
    goldTotal: number;
    pairwiseTotal: number;
    activeAnnotators: number;
    purity: { before: number; after: number };
  };
}

export const researchPage: ResearchPageContent = {
  meta: {
    title: "Research",
    description:
      "How we are teaching AI to speak Igala with the community that speaks it: why we started, how the method fits together, and the live numbers from the pilot.",
  },

  hero: {
    overline: "How this works",
    title: "The whole project, explained",
    intro:
      "Teaching AI to speak Igala, with the people who speak it. This page lays out why we started, who is doing the work, how the method fits together, and what the pilot has shown so far. The numbers on this page update themselves from the live annotation platform.",
  },

  why: {
    overline: "Why we started",
    title: "Frontier AI fails the world's small languages",
    lead: "Ask today's best AI models to work in Igala and you get fluent-looking nonsense: wrong spelling, wrong words, the language quietly swapped for a neighbour like Yoruba.",
    body: [
      "Igala has around two million speakers in Kogi State, Nigeria. It is tonal, so a shift in pitch can change what a word means. The major models were trained with almost none of it, so they guess, and they guess confidently.",
      "We put real model output in front of native Igala speakers and asked a simple question: is either answer good enough? The figure beside this text is their verdict. It is not a rounding error. It is the size of the gap.",
      "Nobody could point to that gap before, because nobody was measuring it. That is what this project changes: it turns “the models are bad at our language” into something you can count, and hold every model accountable for.",
    ],
    statLabel: "of AI answers rejected by native speakers",
    statCaption:
      "Share of blind comparisons where speakers judged both AI attempts inadequate. Live from the pilot.",
  },

  who: {
    overline: "Who is doing this",
    title: "Led by the community that speaks the language",
    intro:
      "This is built with a community, not on one. The people who speak Igala decide what good looks like, score the models, and own what gets built. In the Wikitongues model, communities come to the archive - the opposite of extraction.",
    groups: [
      {
        name: "Wikitongues",
        role: "Convenes and builds",
        detail:
          "A nonprofit archive working to document every language in the world. Wikitongues runs the initiative and builds the annotation platform behind it.",
      },
      {
        name: "The Igala Wikimedians",
        role: "Lead the language work",
        detail:
          "A community of Igala speakers and Wikimedia contributors based in Abuja, Nigeria. They write the reference answers, correct the models, and set the standard for what counts as real Igala.",
      },
      {
        name: "Academic and industry advisors",
        role: "Guide the method",
        detail:
          "Researchers from New York University and Google Research advise on evaluation design and methods for low-resource languages, alongside an independent linguistics lead.",
      },
    ],
  },

  how: {
    overline: "How it works",
    title: "One episode, one flywheel, one ladder",
    intro:
      "The method has three moving parts: how a single judgement is made, how those judgements compound into a better model, and how we prove the model is actually improving.",
    episode: {
      title: "1. Inside one annotation episode",
      caption:
        "Every judgement follows the same four steps. Writing an answer first, before any AI is shown, is the key move: it captures how a speaker would really say it, uncontaminated by the model's phrasing.",
      steps: [
        {
          title: "Write your own answer",
          detail:
            "The speaker answers the prompt in their own Igala first, before any AI output appears.",
        },
        {
          title: "Compare two AI attempts, blind",
          detail:
            "Two model answers appear side by side with no labels, so no brand or reputation can sway the choice.",
        },
        {
          title: "Explain the choice in English",
          detail:
            "The speaker says, in plain English, why one answer is better, or why both fall short.",
        },
        {
          title: "Score the winner",
          detail:
            "A short rubric captures spelling, grammar, word choice, tone marks, meaning, and whether it is really Igala at all.",
        },
      ],
    },
    flywheel: {
      title: "2. The data flywheel",
      caption:
        "Each episode leaves behind gold: correct answers and clear judgements. That gold trains a better model, which is judged again by the community. Every turn of the wheel raises the floor.",
      stages: [
        {
          name: "Community gold",
          detail:
            "Speakers write correct Igala and correct the models. This is the raw material.",
        },
        {
          name: "Fine-tuning",
          detail:
            "That gold teaches an open model to prefer real Igala over its confident guesses.",
        },
        {
          name: "Blind arena",
          detail:
            "The new model goes back in front of speakers, unlabelled, against the others.",
        },
        {
          name: "A better model",
          detail:
            "The judgements show where it improved and where it still fails.",
        },
        {
          name: "Back to the community",
          detail:
            "The remaining gaps set the next round of prompts. The wheel turns again.",
        },
      ],
    },
    ladder: {
      title: "3. The method ladder",
      caption:
        "We climb one rung at a time, and never grade ourselves on our own homework. A frozen set of questions is locked away as the exam, so a good score cannot be faked.",
      rungs: [
        {
          name: "Benchmark",
          detail:
            "First, measure. Score today's models on Igala so there is an honest baseline to beat.",
        },
        {
          name: "SFT",
          detail:
            "Supervised fine-tuning: show an open model thousands of correct, community-written answers.",
        },
        {
          name: "DPO",
          detail:
            "Preference tuning: teach it from the community's own better-versus-worse judgements. This is the finisher, not the teacher.",
        },
      ],
      heldOut: {
        title: "The frozen exam",
        detail:
          "A held-out set of community-authored questions, sealed off from training. It is never used to teach the model, only to test it, so improvement is real and not memorised.",
      },
    },
  },

  learned: {
    overline: "What we have learned",
    title: "Early findings from the pilot",
    intro:
      "The pilot is small and honest. Here is what the data already shows. The counts below come straight from the live platform, so they move as the work continues.",
    findings: [
      {
        title: "The models almost always fail",
        body: "In blind comparisons, native speakers judged both AI answers inadequate the overwhelming majority of the time, and they were confident about it. There is no defensible winner among today's models yet. That absence is itself the finding.",
      },
      {
        title: "Models reach for the wrong language",
        body: "When a model does not know an Igala word, it does not stay silent. It borrows from Yoruba, Igbo, or Nigerian Pidgin and presents the result as Igala. A speaker caught it live: the word a model gave for “morning” was not Igala at all. A simple instruction that names and forbids this cut off-target output by roughly an order of magnitude, before any fine-tuning.",
      },
      {
        title: "Speakers agree on words, not always on spelling",
        body: "A quiet but useful surprise. Independent speakers picked the same correct word almost every time, while writing it with visibly different spelling and tone marks. So the first thing to align is not vocabulary or meaning. It is spelling conventions.",
      },
    ],
  },

  next: {
    overline: "What is next",
    title: "Where this goes",
    intro: "The pilot runs toward a public launch this autumn.",
    items: [
      {
        title: "A community-tuned model in blind testing",
        detail:
          "The first model fine-tuned on community gold goes back into the blind arena, judged against the frontier models on the frozen exam.",
      },
      {
        title: "A public launch in Ghana",
        detail:
          "The initiative and the first Igala model leaderboard launch publicly at the Wikimedia Foundation conference in October 2026.",
      },
      {
        title: "A method others can reuse",
        detail:
          "A written account of what worked, so the next community can run the same playbook for their language without starting from scratch.",
      },
    ],
  },

  furtherReading: {
    overline: "The evidence",
    title: "Further reading",
    intro:
      "The thinking behind the benchmark and the methods it draws on, annotated for a general reader.",
  },

  fallbackStats: {
    caption: "Most recent pilot snapshot. Live figures are reconnecting.",
    bothInadequateRate: 0.99,
    promptsTotal: 300,
    heldOut: 43,
    goldTotal: 548,
    pairwiseTotal: 481,
    activeAnnotators: 8,
    purity: { before: 41, after: 3.1 },
  },
};
