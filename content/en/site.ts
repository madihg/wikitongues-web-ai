// UI strings and section copy. Kept out of JSX so the site is translatable later.
export const ui = {
  nav: [
    { label: "Overview", href: "#overview" },
    { label: "The project", href: "#project" },
    { label: "Timeline", href: "#timeline" },
    { label: "Research", href: "#research" },
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "#support" },
  ],
  skipToContent: "Skip to main content",
  backToParent: "wikitongues.org",

  hero: {
    overline: "Wikitongues AI",
    headline:
      "Teaching AI to speak the world’s underserved languages, one community at a time.",
    headlineEmphasis: "Starting with Igala.",
    subhead:
      "Two tracks, one principle. A tutor that helps people learn and use Igala authentically, and the first public benchmark of how well today’s AI models actually speak it. Both led by the community that speaks the language.",
    primaryCta: { label: "Support the initiative", href: "#support" },
    secondaryCta: { label: "See the timeline", href: "#timeline" },
  },

  project: {
    overline: "What this is",
    title: "A scoreboard for languages the models keep getting wrong",
    problemTitle: "The problem, made concrete",
    problem:
      "Ask a model to work in Igala and you get fluent nonsense - wrong spelling, wrong meaning, the language confused with neighbours like Idoma. A native speaker who tried it put it plainly: everything was wrong. The failure is real, but until now it has been invisible.",
    trackTutorTitle: "The tutor",
    trackTutor:
      "A tool that helps people learn and use Igala authentically, with the community correcting it as it goes.",
    trackBenchmarkTitle: "The benchmark",
    trackBenchmark:
      'The lever. A public scoreboard that turns "the models are bad at our language" into something measurable, holds every model accountable, and is reusable for the next language.',
    bucketsTitle: "The eight dimensions we measure",
    bucketsIntro: "Where models fail at Igala, explained for a lay reader.",
    communityTitle: "Community-led by design",
    community:
      "Communities decide what good looks like, score the models, and own what is built. In the Wikitongues model, communities come to the archive - the opposite of extraction.",
  },

  timeline: {
    overline: "Where we are",
    title: "The timeline",
    intro: "Working back from the public launch in Ghana this October.",
    upcomingLabel: "Upcoming",
    pastLabel: "Done",
  },

  research: {
    overline: "The evidence",
    title: "Research",
    intro:
      "The thinking behind the benchmark and the methods it draws on - annotated for a general reader.",
  },

  leaderboard: {
    overline: "The benchmark",
    title: "The leaderboard",
    intro:
      "How the major models score across the eight dimensions. Higher is better; every score is paired with a number, not just colour.",
    overallLabel: "Overall",
    modelLabel: "Model",
  },

  faq: {
    overline: "Questions",
    title: "FAQ, including language rights",
    intro: "The questions communities, funders, and the curious ask us most.",
    draftBadge: "Draft - pending sign-off",
  },

  support: {
    overline: "Get involved",
    title: "Support the initiative",
    body: "Your gift funds the Igala pilot and the benchmark that follows. Donations run through Wikitongues - add a note to direct your gift to the AI initiative.",
    cta: { label: "Donate via Wikitongues", href: "" }, // href filled from site.donateUrl
    contactLead: "Want your community to be next? Email",
  },

  footer: {
    tagline:
      "An initiative of Wikitongues, the open archive working to document every language in the world.",
    columns: [
      {
        title: "Wikitongues AI",
        links: [
          { label: "Overview", href: "#overview" },
          { label: "The project", href: "#project" },
          { label: "Timeline", href: "#timeline" },
          { label: "Research", href: "#research" },
          { label: "FAQ", href: "#faq" },
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
