// All structured-content types for the site. Content lives as data, never in JSX.

export type Locale = "en"; // widen to 'en' | 'ig' | ... when translations land
export type ISODate = string; // 'YYYY-MM-DD'
export type TimelinePhase = "past" | "current" | "upcoming";

// --- Timeline ---------------------------------------------------------------
export interface TimelineItem {
  id: string; // stable slug, used as React key
  date: ISODate; // sortable
  dateLabel: string; // human label, e.g. "October 4-5, 2026"
  title: string;
  summary: string; // one sentence
  phaseOverride?: TimelinePhase; // force past/upcoming regardless of today
}

// --- Evaluation buckets (the eight dimensions) ------------------------------
export interface Bucket {
  id: string;
  index: number; // 1..8 display order
  name: string;
  gloss: string; // one-line lay explanation
}

// --- Research ---------------------------------------------------------------
export interface ResearchEntry {
  id: string;
  title: string;
  source: string; // venue / publisher
  url?: string; // canonical link (omitted for stubs)
  summary: string; // 1-2 lines, plain language
  tags?: string[];
  isStub?: boolean; // placeholder entry, rendered muted
}

export interface ResearchGroup {
  id: string;
  theme: string;
  description?: string;
  entries: ResearchEntry[];
}

// --- FAQ --------------------------------------------------------------------
export type SignOffStatus = "draft" | "approved";
export type FaqCategory = "rights" | "data" | "community" | "team" | "tech";

export interface FaqItem {
  id: string;
  order: number; // rights question = 0 (lead)
  question: string;
  answer: string; // plain text; rendered safely
  signOffStatus: SignOffStatus;
  category: FaqCategory;
}

// --- Leaderboard (feature-flagged) ------------------------------------------
export interface LeaderboardRow {
  rank: number;
  model: string;
  overall: number | null; // composite 0-100; null = not yet measured
  perBucket?: Partial<Record<string, number>>; // bucketId -> score
}

export interface LeaderboardSnapshot {
  capturedAt: ISODate;
  kind: "illustrative" | "live"; // 'illustrative' must be labelled as sample data
  note: string;
  rows: LeaderboardRow[];
}

// --- Feature flags ----------------------------------------------------------
export type FeatureFlag =
  | "leaderboard"
  | "emailCapture"
  | "researchRoute"
  | "faqRoute";
export type FlagMap = Record<FeatureFlag, boolean>;
