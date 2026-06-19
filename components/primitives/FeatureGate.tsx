import type { ReactNode } from "react";
import { isEnabled } from "@/lib/flags";
import type { FeatureFlag } from "@/content/types";

// Renders children only when the flag is on. When off, emits zero HTML/JS.
export function FeatureGate({
  flag,
  children,
}: {
  flag: FeatureFlag;
  children: ReactNode;
}) {
  if (!isEnabled(flag)) return null;
  return <>{children}</>;
}
