import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";

// 48px tall, 8px radius, 600 weight (design language, section 5). The label
// wraps and is never cut.
const base =
  "inline-flex min-h-target items-center justify-center gap-2 rounded-control px-5 py-3 text-body font-semibold transition-colors duration-fast ease-wt";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed",
  secondary:
    "border border-line-control bg-surface text-ink hover:bg-sunken",
  link: "min-h-target-min px-0 py-0 font-medium text-accent underline underline-offset-4",
};

interface CTAButtonProps {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
}

// All CTAs render as anchors (no client JS). External links open safely.
export function CTAButton({
  href,
  variant = "primary",
  external,
  children,
}: CTAButtonProps) {
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;
  return (
    <a
      href={href}
      rel={rel}
      target={target}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
