import { HeroBanner } from "@/components/HeroBanner";
import HomeFeaturesPreview from "@/components/HomeFeaturesPreview";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCards";
import Main from "@/features/layout/Main";
import Section from "@/features/layout/Section";
export default async function Home() {
  return (
    <Main>
      <Section>
        <HeroBanner />
      </Section>
      <Section>
        <HomeFeaturesPreview />
      </Section>
      <Section>
        <InfiniteMovingCardsDemo />
      </Section>
    </Main>
  );
}
