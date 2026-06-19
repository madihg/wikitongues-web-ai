import { getContent } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { BucketGrid } from "@/components/sections/BucketGrid";
import { FeatureGate } from "@/components/primitives/FeatureGate";
import { LeaderboardTable } from "@/components/sections/LeaderboardTable";

// The pitch: problem made concrete, the two tracks, the eight dimensions,
// community-led principle, and the flagged leaderboard embed.
export function Pitch() {
  const { ui } = getContent();
  const p = ui.project;
  return (
    <Section id="project" overline={p.overline} title={p.title} width="wide">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="max-w-measure">
          <h3 className="text-xl font-semibold">{p.problemTitle}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{p.problem}</p>
        </div>
        <div className="grid content-start gap-5">
          <div className="rounded-lg border border-line bg-surface p-5">
            <p className="overline mb-1">Track one</p>
            <h3 className="text-lg font-semibold">{p.trackTutorTitle}</h3>
            <p className="mt-2 leading-relaxed text-muted">{p.trackTutor}</p>
          </div>
          <div className="rounded-lg border border-accent bg-accent-subtle p-5">
            <p className="overline mb-1 text-accent">Track two</p>
            <h3 className="text-lg font-semibold">{p.trackBenchmarkTitle}</h3>
            <p className="mt-2 leading-relaxed text-ink">{p.trackBenchmark}</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold">{p.bucketsTitle}</h3>
        <p className="mb-6 mt-2 max-w-measure text-muted">{p.bucketsIntro}</p>
        <BucketGrid />
      </div>

      <div className="mt-16 max-w-measure">
        <h3 className="text-xl font-semibold">{p.communityTitle}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted">{p.community}</p>
      </div>

      <FeatureGate flag="leaderboard">
        <div className="mt-16">
          <LeaderboardTable />
        </div>
      </FeatureGate>
    </Section>
  );
}
