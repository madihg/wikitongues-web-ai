import type { Bucket } from "../types";

// The eight dimensions where today's models fail at Igala - the evaluation
// buckets the benchmark scores models against. Glossed for a lay reader.
export const buckets: Bucket[] = [
  {
    id: "orthography",
    index: 1,
    name: "Orthography & spelling",
    gloss:
      "Are words written correctly, with the right characters and tone marks?",
  },
  {
    id: "grammar",
    index: 2,
    name: "Grammar, morphology & tone",
    gloss:
      "Does it handle Igala structure and tone, where a shift in pitch changes meaning?",
  },
  {
    id: "lexicon",
    index: 3,
    name: "Lexicon",
    gloss:
      "Are the words actually Igala, not borrowed from neighbours like Idoma?",
  },
  {
    id: "dialect",
    index: 4,
    name: "Dialectal fidelity",
    gloss:
      "Does it keep the community’s variety instead of collapsing to a prestige standard?",
  },
  {
    id: "register",
    index: 5,
    name: "Register & honorifics",
    gloss:
      "Does it use the right level of respect and formality for the moment?",
  },
  {
    id: "idioms",
    index: 6,
    name: "Idioms, metaphor & motifs",
    gloss:
      "Does it understand figures of speech, or read them flatly and literally?",
  },
  {
    id: "culture",
    index: 7,
    name: "Cultural knowledge & values",
    gloss: "Does it know the customs, beliefs, and values behind the words?",
  },
  {
    id: "authenticity",
    index: 8,
    name: "Authenticity vs translationese",
    gloss:
      "Does it sound community-written, or like text back-translated from English?",
  },
];
