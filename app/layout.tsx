import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/primitives/SkipLink";
import { getContent, getApprovedFaq } from "@/lib/content";
import { site } from "@/content/config";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Teaching AI to speak the world’s underserved languages, one community at a time. A tutor and the first public benchmark of how well AI models speak Igala - led by the community that speaks it.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Wikitongues AI - the Igala pilot",
    template: "%s - Wikitongues AI",
  },
  description,
  openGraph: {
    type: "website",
    title: "Wikitongues AI - the Igala pilot",
    description,
    url: site.url,
    siteName: "Wikitongues AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikitongues AI - the Igala pilot",
    description,
  },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ui, faq } = getContent();

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
        mainEntity: getApprovedFaq(faq).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
