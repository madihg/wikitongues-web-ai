// Copy for the main page. The main page is the explanation of the project:
// what it is, how it works, what the speakers decided, what we got wrong, who
// does the work, and how to take part. The evidence in full is on /record/.
//
// House rules:
// - Say what the thing is first. One idea per sentence. Full sentences.
// - One name for each thing, used the same way everywhere: the language
//   layer, a blind comparison, the plain model, the exam, the record.
// - No em or en dashes.
// - LIVE FIGURES. A string under `live` carries {tokens} filled from
//   GET /api/public/method-metrics when the page is read. Each has a
//   `fallback` with no figure in it, shown while loading or when the feed is
//   down. No recorded figure is ever typed into this file.

export interface LiveText {
  live: string;
  fallback: string;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface TitledLiveText {
  title: string;
  live: string;
  fallback: string;
}

export interface Door {
  title: string;
  body: string;
  button: string;
  /** "email" opens a message to the contact address; "donate" goes to the
   * Wikitongues donation page; any other value is a path on this site. */
  action: "email" | "donate" | string;
}

export interface Question {
  id: string;
  question: string;
  answer: LiveText;
}

export const home = {
  meta: {
    title: "Wikitongues AI: speakers teach AI models their own language",
    description:
      "Igala speakers judge AI models without knowing which is which, and correct the mistakes. See how the method works and what it has shown so far.",
    ogTitle: "Speakers teach AI models their own language",
    ogDescription:
      "A method and a platform from Wikitongues, tested with Igala. How it works, what the speakers decided, and how to take part.",
  },

  hero: {
    label: "Wikitongues AI",
    title: "Speakers teach AI models their own language.",
    body: [
      "Wikitongues AI is a method and a platform. Speakers of a language write answers in it, judge what AI models write, and correct the mistakes. The corrections are saved, and the models use them the next time they answer.",
      "We are testing it with Igala, a language spoken by about 1.6 million people in Nigeria. When we started, we asked AI models for Igala and they answered in Yoruba, a related language.",
    ],
    result: {
      live: "Since {layerSince}, Igala speakers have compared {layerVsPlainTotal} pairs of answers without knowing which model wrote which. They preferred the answer made with their corrections {layerWins} times, and the plain model's answer {plainWins} times.",
      fallback:
        "Igala speakers compare pairs of answers without knowing which model wrote which. So far they prefer the answer made with their own corrections.",
    } as LiveText,
    primary: { label: "See how it works", href: "#how-it-works" },
    secondary: { label: "Take part", href: "#take-part" },
  },

  problem: {
    id: "problem",
    title: "Most languages are missing from AI",
    body: [
      "People speak or sign about 7,000 languages. AI models work well in fewer than 100 of them. The models learn from text collected on the web, and most languages have little text there.",
      "A model that has not learned a language still answers. What it writes can look right to anyone who does not speak the language. Only a speaker can tell that it is wrong, so the method starts with speakers.",
    ],
  },

  howItWorks: {
    id: "how-it-works",
    title: "How it works",
  },

  results: {
    id: "results",
    title: "Results",
    lead: "The result we trust most is the blind comparison. A speaker reads two answers to the same question, without knowing which model wrote which, and chooses.",
    chartTitle: "Out of every ten comparisons",
    chartCaption: {
      live: "Gemini 3.1 Pro with the Igala language layer, against the same model on its own. {layerVsPlainTotal} comparisons since {layerSince}.",
      fallback:
        "Gemini 3.1 Pro with the Igala language layer, against the same model on its own.",
    } as LiveText,
    legend: {
      layer: "preferred the answer with the language layer",
      plain: "preferred the plain model",
      draw: "called it a draw, or left no verdict",
      neither: "rejected both",
    },
    reading: {
      live: "Speakers preferred the answer with the language layer {layerWins} times and the plain model's answer {plainWins} times. They called it a draw {layerDraws} times and rejected both answers {layerNeither} times.",
      fallback:
        "Speakers prefer the answer with the language layer far more often than the plain model's answer. The current counts are unavailable right now.",
    } as LiveText,
    start:
      "When the pilot started in July 2026, speakers rejected both answers in 99 of every 100 comparisons. Those comparisons were between earlier models with no language layer, so the two figures are not a before and after of one model.",
    limits: {
      title: "What this does not show",
      live: "{annotators} speakers made these judgments, and they belong to one community. Igala is related to Yoruba, a language the models already handle, and we do not know how much that helped. We want to test the method next with two languages that are not related to any language the models handle well.",
      fallback:
        "A small group of speakers made these judgments, and they belong to one community. Igala is related to Yoruba, a language the models already handle, and we do not know how much that helped. We want to test the method next with two languages that are not related to any language the models handle well.",
    } as TitledLiveText,
    link: { label: "See every comparison, round by round", href: "/record/#verdicts" },
  },

  corrections: {
    id: "corrections",
    title: "What we got wrong",
    intro:
      "On September 1, 2026, we checked every figure we had published against the database. Three corrections changed how we work.",
    items: [
      {
        title: "Our first score rewarded missing tone marks",
        live: "We built an automatic score that compares a model's spelling with the speakers' spelling. Then we found that it gave higher marks to answers with the tone marks removed, because most speakers leave tone marks off when they type. We now treat that score as a rough check and rely on the blind comparisons.",
        fallback:
          "We built an automatic score that compares a model's spelling with the speakers' spelling. Then we found that it gave higher marks to answers with the tone marks removed, because most speakers leave tone marks off when they type. We now treat that score as a rough check and rely on the blind comparisons.",
      },
      {
        title: "Some exam questions had seen their own answers",
        live: "We keep {frozenPrompts} questions aside as an exam. On an exam question, a model is not supposed to see any speaker's answer to it. We found that on {leakedPrompts} of them it had. We now score only the other {leakFreePrompts}, and a check runs on every question.",
        fallback:
          "We keep a set of questions aside as an exam. On an exam question, a model is not supposed to see any speaker's answer to it. We found that on some of them it had. We now score only the others, and a check runs on every question.",
      },
      {
        title: "We described a permission we did not have",
        live: "Our largest source of example sentences is an Igala translation of the Bible. We wrote that we used it with the publisher's permission. Our records hold two written requests and no reply. We corrected the sentence, and the permission is still an open question.",
        fallback:
          "Our largest source of example sentences is an Igala translation of the Bible. We wrote that we used it with the publisher's permission. Our records hold two written requests and no reply. We corrected the sentence, and the permission is still an open question.",
      },
    ] as TitledLiveText[],
    link: { label: "Read the dated record of every change", href: "/record/#changelog" },
  },

  who: {
    id: "who",
    title: "Who does the work",
    groups: [
      {
        title: "Igala speakers",
        live: "{annotators} speakers judge and correct the models, and they are paid for their time. So far they have written {goldAnswers} answers and judged {pairwiseComparisons} comparisons. They are led by Agnes, who heads Igala Wikimedians, a group of Igala speakers and Wikimedia contributors in Abuja.",
        fallback:
          "A small group of Igala speakers judges and corrects the models, and they are paid for their time. They are led by Agnes, who heads Igala Wikimedians, a group of Igala speakers and Wikimedia contributors in Abuja.",
      },
      {
        title: "Linguists",
        live: "Two linguists check the grammar rules before they enter the language layer.",
        fallback:
          "Two linguists check the grammar rules before they enter the language layer.",
      },
      {
        title: "Wikitongues",
        live: "Wikitongues is a nonprofit that works with speakers to keep their languages in use. Its public archive holds recordings in more than 700 languages. Wikitongues builds the platform and runs the project.",
        fallback:
          "Wikitongues is a nonprofit that works with speakers to keep their languages in use. Its public archive holds recordings in more than 700 languages. Wikitongues builds the platform and runs the project.",
      },
      {
        title: "Advisors",
        live: "Researchers at New York University and Google Research advise on the method.",
        fallback:
          "Researchers at New York University and Google Research advise on the method.",
      },
    ] as TitledLiveText[],
    ownership: {
      title: "Who owns the data",
      body: "The community that speaks the language owns what its speakers contribute, and decides what is shared. The makers of the AI models do not own it.",
    } as TitledText,
  },

  takePart: {
    id: "take-part",
    title: "Take part",
    intro: "There are four ways to take part.",
    doors: [
      {
        title: "You speak a language that AI gets wrong",
        body: "Tell us which language, and what the models do with it. We want to run this method with two more languages in 2027, and we would like to hear from you before we choose.",
        button: "Write to us",
        action: "email",
      },
      {
        title: "You speak Igala",
        body: "We would love more Igala speakers to judge answers and record their voice. Write to us and tell us a little about yourself.",
        button: "Write to us",
        action: "email",
      },
      {
        title: "You can fund the work",
        body: "A gift pays the speakers for their time and keeps the platform running. Donations go through Wikitongues. Add a note that your gift is for the AI project.",
        button: "Donate through Wikitongues",
        action: "donate",
      },
      {
        title: "You do research",
        body: "The record holds every comparison, the exam, and the exact instructions the models receive. If you want to check our figures or work with us, write to us.",
        button: "Read the record",
        action: "/record/",
      },
    ] as Door[],
    // Shown after the email buttons, so the address can be read and copied.
    emailNote: "Our address is {email}.",
  },

  questions: {
    id: "questions",
    title: "Questions",
    items: [
      {
        id: "ownership",
        question: "Who owns the data the speakers create?",
        answer: {
          live: "The community that speaks the language. The community decides what is shared and what is made public. The written terms for Igala are being agreed with the speakers.",
          fallback:
            "The community that speaks the language. The community decides what is shared and what is made public. The written terms for Igala are being agreed with the speakers.",
        },
      },
      {
        id: "scraping",
        question: "How is this different from a company scraping a language?",
        answer: {
          live: "Scraping takes text without asking. Here the speakers decide what to contribute, they set the standard for a good answer, and what they contribute stays theirs.",
          fallback:
            "Scraping takes text without asking. Here the speakers decide what to contribute, they set the standard for a good answer, and what they contribute stays theirs.",
        },
      },
      {
        id: "retraining",
        question: "Do you retrain the AI models?",
        answer: {
          live: "No. The model stays as its maker released it. When a question comes in, the matching pieces of the language layer are placed in front of the model with the question. That is why the same layer can be used with a different model.",
          fallback:
            "No. The model stays as its maker released it. When a question comes in, the matching pieces of the language layer are placed in front of the model with the question. That is why the same layer can be used with a different model.",
        },
      },
      {
        id: "models",
        question: "Which AI models do you use, and what is sent to them?",
        answer: {
          live: "The blind comparisons today use Gemini 3.1 Pro, with and without the Igala language layer. The exam has also been run on Claude and GPT models. When a model answers with the language layer, the question and the matching pieces of the layer are sent to that model's maker.",
          fallback:
            "The blind comparisons today use Gemini 3.1 Pro, with and without the Igala language layer. The exam has also been run on Claude and GPT models. When a model answers with the language layer, the question and the matching pieces of the layer are sent to that model's maker.",
        },
      },
      {
        id: "sources",
        question: "Where does the language material come from?",
        answer: {
          live: "From the speakers and from published sources. The speakers have written {goldAnswers} answers on the platform. The dictionary has {lexEntries} entries from four sources: words lined up from the Igala Bible, a community wordlist, a wordlist from 1854, and Wiktionary. The example sentences are {parallelPairs} sentence pairs from the Igala Bible. We do not yet hold written permission for the Bible text. We have asked its publisher twice.",
          fallback:
            "From the speakers and from published sources. The speakers write answers on the platform. The dictionary draws on four sources: words lined up from the Igala Bible, a community wordlist, a wordlist from 1854, and Wiktionary. The example sentences are sentence pairs from the Igala Bible. We do not yet hold written permission for the Bible text. We have asked its publisher twice.",
        },
      },
      {
        id: "next-language",
        question: "Can my language be next?",
        answer: {
          live: "We hope so. Igala is the first language, and the method is built to be used again. Write to us and tell us which language you speak.",
          fallback:
            "We hope so. Igala is the first language, and the method is built to be used again. Write to us and tell us which language you speak.",
        },
      },
    ] as Question[],
  },

  // Shared strings for live figures on the main page.
  live: {
    loading: "loading",
    unavailable: "figure unavailable",
    unavailableNote:
      "The live figures are unavailable right now. This site shows figures only when it can fetch them fresh. Reload in a minute.",
    // {computedAt} is filled by the footer stamp.
    stamp: "Figures on this page were fetched from the project database on {computedAt}.",
  },

  notFound: {
    title: "This page does not exist",
    body: "The site has two pages. One explains how the project works. The other holds the evidence.",
    primary: { label: "How it works", href: "/#how-it-works" },
    secondary: { label: "The record", href: "/record/" },
  },

  moved: {
    title: "This page has moved",
    body: "How it works is now on the main page. The evidence is on the record.",
    primary: { label: "Go to the main page", href: "/" },
    secondary: { label: "Go to the record", href: "/record/" },
  },
};

export type HomeContent = typeof home;
