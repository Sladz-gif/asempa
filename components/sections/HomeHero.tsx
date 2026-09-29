import React from "react";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { GoldSpan } from "@/components/ui/Divider";
import { FIRM } from "@/lib/config";
import { AskAssistantButton } from "@/components/sections/AskAssistantButton";

const HERO_IMG =
  "/images/hero.jpg";

function HeroImage() {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={HERO_IMG}
        alt="Portrait of the firm's legal team in the Accra head-office boardroom"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-center"
      />

    </div>
  );
}

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-4 sm:pt-6 md:pt-8 lg:pt-14 pb-12 sm:pb-16 md:pb-20 lg:pb-32"
    >
      <HeroImage />
      <div className="container-page relative grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center min-h-[55vh] sm:min-h-[60vh] md:min-h-[68vh] lg:min-h-[76vh]">
        <div className="lg:col-span-7 max-w-2xl animate-fade-in-up">
          <span className="eyebrow text-white text-[10px] sm:text-xs md:text-sm">Accra · Ghana</span>
          <h1 id="hero-heading" className="text-balance text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Considered counsel for individuals, families, and businesses across{" "}
            <GoldSpan>Ghana and the region.</GoldSpan>
          </h1>
          <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
            {FIRM.positioning.replace(/[[\]]/g, "")}
          </p>

          <div className="gold-divider-short my-4 sm:my-6 md:my-8" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 sm:items-center">
            <LinkButton
              href="/book"
              variant="primary"
              size="md"
              leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Book a Consultation
            </LinkButton>
            <AskAssistantButton />
          </div>

          <p className="mt-4 sm:mt-6 md:mt-8 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widgold text-white/80">
            Initial consultation · ₵{FIRM.consultationFeeGHS.toLocaleString("en-GH")} GHS ·{" "}
            In person, by phone, or by video
          </p>
        </div>
        <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
