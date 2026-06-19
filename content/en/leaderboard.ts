import type { LeaderboardSnapshot } from "../types";

// ILLUSTRATIVE sample only. These are not real benchmark results. They exist so
// the leaderboard component can be seen and reviewed before the first real
// Igala leaderboard launches at the Wikimedia Foundation conference in October.
// Replace `rows` and set `kind: 'live'` once measured scores exist.
export const leaderboard: LeaderboardSnapshot = {
  capturedAt: "2026-06-18",
  kind: "illustrative",
  note: "Illustrative sample - not real results. The first Igala leaderboard launches in October 2026.",
  rows: [
    {
      rank: 1,
      model: "Claude",
      overall: 58,
      perBucket: {
        orthography: 62,
        grammar: 55,
        lexicon: 60,
        dialect: 48,
        register: 57,
        idioms: 52,
        culture: 64,
        authenticity: 56,
      },
    },
    {
      rank: 2,
      model: "Gemini",
      overall: 49,
      perBucket: {
        orthography: 54,
        grammar: 47,
        lexicon: 50,
        dialect: 41,
        register: 48,
        idioms: 44,
        culture: 55,
        authenticity: 45,
      },
    },
    {
      rank: 3,
      model: "ChatGPT",
      overall: 46,
      perBucket: {
        orthography: 50,
        grammar: 44,
        lexicon: 47,
        dialect: 38,
        register: 45,
        idioms: 42,
        culture: 51,
        authenticity: 43,
      },
    },
    {
      rank: 4,
      model: "Gemma",
      overall: 31,
      perBucket: {
        orthography: 36,
        grammar: 29,
        lexicon: 32,
        dialect: 24,
        register: 30,
        idioms: 27,
        culture: 35,
        authenticity: 28,
      },
    },
  ],
};
