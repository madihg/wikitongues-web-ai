// Strings shared by every page: the header, the footer, the skip link.
// Page copy lives in home.ts (the main page), method.ts (the loop) and
// record.ts (the record).
//
// The four nav labels are the exact headings they point to, in page order.
export const ui = {
  nav: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Results", href: "/#results" },
    { label: "Take part", href: "/#take-part" },
    { label: "The record", href: "/record/" },
  ],
  skipToContent: "Skip to main content",
  backToParent: "wikitongues.org",
  menu: "Menu",

  footer: {
    tagline:
      "Wikitongues AI is a project of Wikitongues, a nonprofit working to safeguard every language in the world.",
    columns: [
      {
        title: "Wikitongues AI",
        links: [
          { label: "How it works", href: "/#how-it-works" },
          { label: "Results", href: "/#results" },
          { label: "Take part", href: "/#take-part" },
          { label: "The record", href: "/record/" },
        ],
      },
      {
        title: "Wikitongues",
        links: [
          { label: "Language Archive", href: "https://wikitongues.org" },
          { label: "Revitalization", href: "https://wikitongues.org" },
          { label: "About", href: "https://wikitongues.org" },
          { label: "Support", href: "https://wikitongues.org" },
        ],
      },
    ],
    address: "136 Madison Avenue, New York, NY 10016",
    landAcknowledgement: "On the unceded land of the Lenape.",
    nonprofit: "Wikitongues is a 501(c)(3) nonprofit.",
  },
};
