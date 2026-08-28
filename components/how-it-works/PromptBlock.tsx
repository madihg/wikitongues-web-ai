import type { PromptSnapshot } from "@/content/en/igalaPrompts";
import { promptsCopiedOn } from "@/content/en/igalaPrompts";
import { howItWorks } from "@/content/en/howItWorks";
import { fill } from "./format";

// One verbatim prompt, with its provenance stated right above it: which file
// in the app repo, which commit, and when the copy was taken. The site cannot
// import the serving code (static export), so honesty here means labelling
// the copy, not pretending it is live.

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
    <figure className="mt-6">
      <figcaption>
        <p className="overline mb-1">{label}</p>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {sourceLine}
        </p>
      </figcaption>
      <div className="mt-2 overflow-x-auto rounded-lg border border-line bg-surface-sunken p-5">
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
          {snapshot.text}
        </pre>
      </div>
    </figure>
  );
}
