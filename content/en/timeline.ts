import type { TimelineItem } from "../types";

// The project timeline. Edit an entry here and the rendered timeline updates.
// Working back from the public launch at the Wikimedia Foundation conference.
// Phase (past vs upcoming) is computed from the build date; see lib/timeline.ts.
export const timeline: TimelineItem[] = [
  {
    id: "june-kickoff",
    date: "2026-06-01",
    dateLabel: "June 2026",
    title: "Kickoff with the Igala community",
    summary:
      "Project launches with Agnes, community lead of the Ikala Wikimedians in Abuja: a live prototype, standing weekly sessions, and an evaluation framework shaped with our linguistics lead.",
  },
  {
    id: "june-22-advisory",
    date: "2026-06-22",
    dateLabel: "By June 22, 2026",
    title: "Prototype and question bank to the advisory council",
    summary:
      "A refined prototype and tightened question bank go to the research advisory council, annotators gain an inline edit tool to correct outputs directly, and the Igala Wikipedia corpus is fed into the models.",
  },
  {
    id: "july-rubric",
    date: "2026-07-01",
    dateLabel: "July 2026",
    title: "Lock the rubric, run the first benchmark",
    summary:
      "We lock the scoring rubric and prompt buckets with the community, then run a baseline benchmark of the major models - ChatGPT, Gemini, and Claude - on Igala.",
  },
  {
    id: "august-working-session",
    date: "2026-08-01",
    dateLabel: "August 2026",
    title: "Working session and dataset expansion",
    summary:
      "A heads-down working session in San Francisco expands the benchmark dataset, designs the community feedback pass, and drafts the menu of data-ownership options.",
  },
  {
    id: "september-site-live",
    date: "2026-09-01",
    dateLabel: "September 2026",
    title: "This site goes live",
    summary:
      "The initiative goes public on the web with a clear menu of data-ownership options for the community and the first funder update.",
  },
  {
    id: "october-launch",
    date: "2026-10-04",
    dateLabel: "October 4-5, 2026",
    title: "Public launch in Ghana",
    summary:
      "The initiative and the first Igala model leaderboard launch publicly at the Wikimedia Foundation conference in Ghana.",
  },
];
