import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/tokens.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/primitives/SkipLink";
import { AnchorKeeper } from "@/components/primitives/AnchorKeeper";
import { getContent } from "@/lib/content";
import { home } from "@/content/en/home";
import { site } from "@/content/config";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

// Inter is self-hosted as ONE file that holds Latin, Latin Extended, Latin
// Extended Additional and the combining marks together. Google's CSS splits
// Inter by unicode-range, so an Igala letter and its tone mark can come from
// two files and the mark is then not positioned (design language, section 4).
const inter = localFont({
  src: "./fonts/InterVariable-wt.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["Roboto", "Noto Sans", "system-ui", "sans-serif"],
});

const description = home.meta.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: home.meta.title,
    template: "%s - Wikitongues AI",
  },
  description,
  openGraph: {
    type: "website",
    title: home.meta.ogTitle,
    description: home.meta.ogDescription,
    url: site.url,
    siteName: "Wikitongues AI",
  },
  twitter: {
    card: "summary_large_image",
    title: home.meta.ogTitle,
    description: home.meta.ogDescription,
  },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ui } = getContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Wikitongues AI",
        url: site.url,
        parentOrganization: {
          "@type": "Organization",
          name: "Wikitongues",
          url: site.parentUrl,
        },
        description,
      },
      {
        "@type": "FAQPage",
        // Answers in their no-figure form: structured data must not carry a
        // figure that was true only on the day of the build.
        mainEntity: home.questions.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer.fallback },
        })),
      },
    ],
  };

  return (
    <html
      lang={site.defaultLocale}
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body>
        <SkipLink label={ui.skipToContent} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AnchorKeeper />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
