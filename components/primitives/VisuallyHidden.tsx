import type { ReactNode } from "react";

// Screen-reader-only content. Visually hidden but available to assistive tech.
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
