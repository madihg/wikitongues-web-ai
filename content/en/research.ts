import type { ResearchGroup } from "../types";

// Annotated research, grouped by theme. Each entry: title, source, link, and a
// plain-language note on why it matters. Stubs are placeholders to be filled.
export const research: ResearchGroup[] = [
  {
    id: "evaluation",
    theme: "Evaluation & the floating-motifs problem",
    description:
      "How do you measure whether a model truly speaks a language, rather than producing fluent-looking text? This is the question the benchmark answers.",
    entries: [
      {
        id: "eval-buckets",
        title: "The eight evaluation dimensions",
        source: "Wikitongues AI",
        summary:
          "A working framework for where models fail at Igala - from orthography to authenticity - turned into a rubric the community can score against.",
        tags: ["framework", "benchmark"],
      },
      {
        id: "open-question",
        title:
          "Open question: does community-written Igala beat translated text?",
        source: "Wikitongues AI",
        summary:
          "A live research question for the pilot: whether text written by speakers outperforms text back-translated from English when teaching and testing a model.",
        tags: ["research question"],
        isStub: true,
      },
    ],
  },
  {
    id: "low-resource",
    theme: "Methods for low-resource & oral languages",
    description:
      "Techniques for building language technology where there is little written data and a strong oral tradition.",
    entries: [
      {
        id: "waxal",
        title:
          "Waxal: a large-scale open resource for African-language speech technology",
        source: "Google Research (with the Gates Foundation)",
        url: "https://research.google/blog/waxal-a-large-scale-open-resource-for-african-language-speech-technology/",
        summary:
          "An openly licensed (CC-BY-4.0) speech dataset spanning many African languages - the kind of community-rooted resource that makes underserved-language AI possible.",
        tags: ["dataset", "CC-BY-4.0", "speech"],
      },
      {
        id: "low-resource-methods",
        title: "Adapting models to low-resource languages",
        source: "To be annotated",
        summary:
          "A placeholder for the methods literature on fine-tuning, retrieval, and corpus-building for languages with limited written data.",
        isStub: true,
      },
    ],
  },
  {
    id: "community-rooted",
    theme: "Community-rooted language AI",
    description:
      "Peers and analogs building language technology with, not on, communities.",
    entries: [
      {
        id: "community-analogs",
        title: "Community-led language technology: peers and analogs",
        source: "To be annotated",
        summary:
          "A placeholder for projects that put communities in charge of what gets built and how their language is represented.",
        isStub: true,
      },
    ],
  },
  {
    id: "igala-corpus",
    theme: "Igala & the corpus",
    description:
      "Sources on the Igala language and the corpus feeding the pilot.",
    entries: [
      {
        id: "igala-wikipedia",
        title: "The Igala Wikipedia corpus",
        source: "Ikala Wikimedians",
        summary:
          "Community-written Igala from the Igala Wikipedia, fed into the models as a first corpus for the pilot.",
        tags: ["corpus"],
        isStub: true,
      },
    ],
  },
];
