import type { PromptSnapshot } from "@/content/en/igalaPrompts";
import { promptsCopiedOn } from "@/content/en/igalaPrompts";
import { howItWorks } from "@/content/en/howItWorks";
import { fill } from "./format";

// One verbatim prompt, collapsed by default behind a native <details> so the
// page stays readable for people who came for the story, not the source. The
// provenance stays visible on the closed summary: which file in the app repo,
// which commit, and when the copy was taken. The site cannot import the
// serving code (static export), so honesty here means labelling the copy, not
// pretending it is live. Native disclosure = keyboard and screen-reader
// support for free, and the full text still ships in the HTML for search.

export function PromptBlock({
  label,
  snapshot,
}: {
  label: string;
  snapshot: PromptSnapshot;
}) {
  const sourceLine = fill(howItWorks.prompts.snapshotLine, {
    file: snapshot.sourceFile,
    commit: snapshot.sourceCommit.slice(0, 12),
    commitDate: snapshot.sourceCommitDate,
    copiedOn: promptsCopiedOn,
  });
  return (
    <details className="group mt-6 rounded-lg border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="overline block">{label}</span>
          <span className="mt-1 block break-words font-mono text-xs leading-relaxed text-muted">
            {sourceLine}
          </span>
          <span className="mt-1 block text-xs text-accent group-open:hidden">
            {howItWorks.prompts.expandHint}
          </span>
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="overflow-x-auto border-t border-line bg-surface-sunken p-5">
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
          {snapshot.text}
        </pre>
      </div>
    </details>
  );
}
