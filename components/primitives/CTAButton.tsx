import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-on hover:bg-accent-hover active:bg-accent-pressed",
  secondary:
    "border border-line-strong text-ink hover:border-accent hover:bg-surface-sunken",
  link: "px-0 py-0 text-accent underline-offset-4 hover:underline",
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
