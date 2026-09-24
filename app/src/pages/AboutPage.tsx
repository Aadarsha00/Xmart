import { Team } from "@/sections/Team";
import { Statistics } from "@/sections/Statistics";
import { AboutHeroBlock } from "@/components/about-page/AboutHeroBlock";
import { AboutValuesBlock } from "@/components/about-page/AboutValuesBlock";
import { AboutTimelineBlock } from "@/components/about-page/AboutTimelineBlock";
import { AboutCTASection } from "@/components/about-page/AboutCTASection";

export function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <AboutHeroBlock />
      <Statistics />
      <AboutValuesBlock />
      <AboutTimelineBlock />
      <Team />
      <AboutCTASection />
    </div>
  );
}
