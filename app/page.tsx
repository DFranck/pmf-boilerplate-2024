import FeaturesSection from "@/components/FeaturesSection";
import { HeroBanner } from "@/components/HeroBanner";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCards";
import { TypewriterEffectSmoothDemo } from "@/components/TypewriterEffectSmooth";
import Main from "@/features/layout/Main";
import Section from "@/features/layout/Section";
export default async function Home() {
  return (
    <Main>
      <Section>
        <HeroBanner />
      </Section>
      <Section>
        <FeaturesSection />
      </Section>
      <Section>
        <InfiniteMovingCardsDemo />
      </Section>
      <Section>
        <TypewriterEffectSmoothDemo />
      </Section>
    </Main>
  );
}
