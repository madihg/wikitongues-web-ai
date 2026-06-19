import type { FaqItem } from "../types";

// FAQ as structured data. Each answer carries a sign-off status. Items marked
// 'draft' are still pending sign-off (from Daniel and the community) and are
// shown with a visible "draft" tag; flip to 'approved' once wording is final.
// The lead question is language rights.
export const faq: FaqItem[] = [
  {
    id: "rights",
    order: 0,
    category: "rights",
    question:
      "What about language rights? Who owns the data the community creates?",
    answer:
      "The community does. Igala speakers decide what good Igala looks like, score the models, and own what we build together. We are working with the community on a clear menu of data-ownership options, so the value, the consent, and the rights stay with the people who speak the language rather than being extracted from them. This wording is still being finalized with the community and our team.",
    signOffStatus: "draft",
  },
  {
    id: "scraping",
    order: 1,
    category: "rights",
    question: "How is this different from a company scraping our language?",
    answer:
      "Scraping takes language without asking. This is the opposite: the community comes first, decides what is shared, sets the standard for what counts as good, and stays in control of the result. Nothing is built about a community without that community leading it.",
    signOffStatus: "draft",
  },
  {
    id: "open-source",
    order: 2,
    category: "data",
    question: "Is the data open source or proprietary?",
    answer:
      "That decision is still open and we are making it with the community, not for them. We are weighing open and proprietary options and will publish a clear menu of choices. The principle is fixed even though the mechanism is not: the community decides.",
    signOffStatus: "draft",
  },
  {
    id: "who-decides",
    order: 3,
    category: "community",
    question: "Who decides what good Igala looks like?",
    answer:
      "Native speakers. The community defines the standard, reviews the models, and corrects them. We build the tools; the community is the authority on the language.",
    signOffStatus: "approved",
  },
  {
    id: "get-involved",
    order: 4,
    category: "community",
    question: "Can my community get involved or be next?",
    answer:
      "Yes. Igala is the pilot, and the benchmark is built to be reused for the next language and the one after that. If your community wants to take part, reach out to us at hello@wikitongues.org.",
    signOffStatus: "approved",
  },
  {
    id: "who-is-behind",
    order: 5,
    category: "team",
    question: "Who is behind this and who funds it?",
    answer:
      "Wikitongues, the open archive working to document every language in the world, in partnership with the Igala community. The work is community-led by design and supported by early funders backing the first phase of the Igala pilot.",
    signOffStatus: "approved",
  },
  {
    id: "models-data",
    order: 6,
    category: "tech",
    question: "What models does it use, and does it send our data to them?",
    answer:
      "The benchmark measures the major models - including ChatGPT, Gemini, and Claude - and the tutor currently runs on a swappable backend. How community data is handled is part of the data-ownership conversation underway with the community, and we will state the specifics plainly once they are settled.",
    signOffStatus: "draft",
  },
];
