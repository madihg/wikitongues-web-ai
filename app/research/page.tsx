import type { Metadata } from "next";
import { home } from "@/content/en/home";
import { MovedPage } from "@/components/primitives/MovedPage";

// A retired path. It forwards to where its content lives now and keeps old
// "#anchor" links working. See lib/legacy.ts.
export const metadata: Metadata = {
  title: home.moved.title,
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <MovedPage path="/research/" />;
}
