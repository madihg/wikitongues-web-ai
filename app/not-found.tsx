import { home } from "@/content/en/home";
import { CTAButton } from "@/components/primitives/CTAButton";

export default function NotFound() {
  const n = home.notFound;
  return (
    <div className="mx-auto max-w-container px-4 py-24 sm:px-6">
      <h1 className="text-h2 font-semibold md:text-h1">{n.title}</h1>
      <p className="mt-4 max-w-measure text-title text-ink-2">{n.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton href={n.primary.href}>{n.primary.label}</CTAButton>
        <CTAButton href={n.secondary.href} variant="secondary">
          {n.secondary.label}
        </CTAButton>
      </div>
    </div>
  );
}
