import { home } from "@/content/en/home";
import { legacyScript } from "@/lib/legacy";
import { CTAButton } from "@/components/primitives/CTAButton";

// What a retired path serves: a script that forwards the reader (anchor
// included), and two plain links for a browser where the script does not run.
export function MovedPage({ path }: { path: string }) {
  const m = home.moved;
  return (
    <div className="mx-auto max-w-container px-4 py-24 sm:px-6">
      <script dangerouslySetInnerHTML={{ __html: legacyScript(path) }} />
      <h1 className="text-h2 font-semibold md:text-h1">{m.title}</h1>
      <p className="mt-4 max-w-measure text-title text-ink-2">{m.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton href={m.primary.href}>{m.primary.label}</CTAButton>
        <CTAButton href={m.secondary.href} variant="secondary">
          {m.secondary.label}
        </CTAButton>
      </div>
    </div>
  );
}
