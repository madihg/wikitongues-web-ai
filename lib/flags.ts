import { flags } from "@/content/config";
import type { FeatureFlag } from "@/content/types";

// Build-time feature flags. An env var NEXT_PUBLIC_FLAG_<NAME> (true|false)
// overrides the default in content/config.ts without a code change.
export function isEnabled(flag: FeatureFlag): boolean {
  const env = process.env[`NEXT_PUBLIC_FLAG_${flag.toUpperCase()}`];
  if (env === "true") return true;
  if (env === "false") return false;
  return flags[flag];
}
