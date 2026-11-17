// Further reading, shown on the record. Only entries with a link that was
// opened and checked belong here (last checked 2026-11-13). No placeholders.

export interface ReadingEntry {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
}

export const reading: ReadingEntry[] = [
  {
    id: "zhang-2024",
    title: "Teaching Large Language Models an Unseen Language on the Fly",
    source: "Zhang, Liu, Lin and Feng, 2024",
    url: "https://arxiv.org/abs/2402.19167",
    summary:
      "A model is taught Zhuang, a language it had never seen, from a dictionary and 5,000 sentence pairs placed in front of it. Our method rests on the same idea, with speakers supplying and checking the material.",
  },
  {
    id: "nekoto-2020",
    title:
      "Participatory Research for Low-resourced Machine Translation: A Case Study in African Languages",
    source: "Nekoto and others (Masakhane), EMNLP Findings 2020",
    url: "https://aclanthology.org/2020.findings-emnlp.195/",
    summary:
      "Speakers of more than 30 African languages build translation datasets and benchmarks themselves. It shows that the people who speak a language can lead the research on it.",
  },
  {
    id: "bird-2020",
    title: "Decolonising Speech and Language Technology",
    source: "Steven Bird, COLING 2020",
    url: "https://aclanthology.org/2020.coling-main.313/",
    summary:
      "An argument that treating a community's knowledge as data to collect can weaken the people who hold it, and what to do differently.",
  },
  {
    id: "waxal",
    title:
      "WAXAL: A large-scale open resource for African language speech technology",
    source: "Google Research",
    url: "https://research.google/blog/waxal-a-large-scale-open-resource-for-african-language-speech-technology/",
    summary:
      "An openly licensed speech collection covering 27 African languages, with recordings for speech recognition and for speech synthesis.",
  },
];
