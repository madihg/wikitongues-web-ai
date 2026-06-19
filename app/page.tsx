import { getContent } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Hero } from "@/components/sections/Hero";
import { Pitch } from "@/components/sections/Pitch";
import { TimelineList } from "@/components/sections/TimelineList";
import { ResearchList } from "@/components/sections/ResearchList";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Support } from "@/components/sections/Support";

export default function HomePage() {
  const { ui } = getContent();
  return (
    <>
      <Hero />
      <Pitch />

      <Section
        id="timeline"
        overline={ui.timeline.overline}
        title={ui.timeline.title}
        intro={ui.timeline.intro}
        tone="sunken"
      >
        <TimelineList />
      </Section>

      <Section
        id="research"
        overline={ui.research.overline}
        title={ui.research.title}
        intro={ui.research.intro}
        width="wide"
      >
        <ResearchList />
      </Section>

      <Section
        id="faq"
        overline={ui.faq.overline}
        title={ui.faq.title}
        intro={ui.faq.intro}
        tone="sunken"
      >
        <FaqAccordion />
      </Section>

      <Section
        id="support"
        overline={ui.support.overline}
        title={ui.support.title}
      >
        <Support />
      </Section>
    </>
  );
}
