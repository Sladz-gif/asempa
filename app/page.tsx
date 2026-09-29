import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeStatBar } from "@/components/sections/HomeStatBar";
import { HomePracticeAreas } from "@/components/sections/HomePracticeAreas";
import { HomeAttorneys } from "@/components/sections/HomeAttorneys";
import { HomeResults } from "@/components/sections/HomeResults";
import { HomeAsFeaturedIn } from "@/components/sections/HomeAsFeaturedIn";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { HomeInsights } from "@/components/sections/HomeInsights";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Accra Law Firm · Corporate, Dispute, Property, Family & Regulatory",
  description:
    "[FIRM NAME] is an Accra-based Ghanaian law firm specialising in corporate & commercial law, dispute resolution & arbitration, property & real estate, family & succession, employment, and regulatory compliance.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeStatBar />
      <HomePracticeAreas />
      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />
      <HomeAttorneys />
      <HomeResults />
      <HomeAsFeaturedIn />
      <HomeTestimonials />
      <HomeInsights />
      <CTABand />
      <BreadcrumbListJSONLD
        items={[{ name: "Home", url: "/" }]}
      />
    </>
  );
}
