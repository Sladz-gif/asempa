import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { StatCounter } from "@/components/ui/StatCounter";
import { FIRM } from "@/lib/config";
import { attorneys } from "@/content/attorneys";
import { practiceAreas } from "@/content/practice-areas";
import { CalendarCheck, Award, BookOpen, Users, Scale, Building2 } from "lucide-react";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "About the firm",
  description: `Learn about ${FIRM.shortName.replace(/[[\]]/g, "")}, an Accra-based law firm: our story, values, credentials, and the attorneys who make up our practice.`,
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: Scale,
    title: "[Excellence and rigour]",
    body: "[We combine deep Ghanaian legal knowledge with disciplined preparation and clear, commercial advice.]",
  },
  {
    icon: Users,
    title: "[Long-term relationships]",
    body: "[We act for multi-generational families, growing businesses, and multinationals — often for decades.]",
  },
  {
    icon: BookOpen,
    title: "[Clear, plain language]",
    body: "[We write and speak in plain terms, and we keep clients informed at every stage of a matter.]",
  },
  {
    icon: Building2,
    title: "[Rooted in Accra]",
    body: "[Our roots are in Ghana. We know the regulators, the courts, and the market from the inside.]",
  },
];

const CREDENTIALS = [
  "[Member, Ghana Bar Association]",
  "[Notaries Public — admitted partners]",
  "[Registered with the Registrar General for company and land practice]",
  "[Arbitrators on the GADRC and CIArb panels]",
  "[Data Protection Act compliance advisors]",
];

export default function AboutPage() {
  const founding = attorneys[0];
  return (
    <article className="pb-24">
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden pt-16 md:pt-24 pb-16 md:pb-20 border-b border-black-700/60"
      >
        <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">About the firm</span>
            <h1 id="about-heading" className="mb-6">
              A Ghanaian firm built for the long term.{" "}
              <GoldSpan>Calm, considered, commercial.</GoldSpan>
            </h1>
            <p className="text-lg md:text-xl text-warm-muted leading-relaxed max-w-2xl">
              {FIRM.positioning.replace(/[[\]]/g, "")} We are a full-service Ghanaian law firm
              advising individuals, families, and businesses — from privately-owned companies and
              family offices to multinationals and investors new to the Ghanaian market.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <LinkButton
                href="/book"
                variant="primary"
                size="lg"
                leftIcon={<CalendarCheck aria-hidden="true" className="h-4.5 w-4.5" />}
              >
                Book an introductory consultation
              </LinkButton>
              <LinkButton href="/attorneys" variant="outline" size="lg">
                Meet our attorneys
              </LinkButton>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] max-h-[620px] rounded-2xl overflow-hidden border border-gold/15 shadow-gold">
            <Image
              src="/images/pexels-muhammad-maina-2163024752-38643224.jpg"
              alt="Interior of the firm's Accra head office reception and stairwell"
              fill
              priority={false}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container-page">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCounter end={FIRM.consultationFeeGHS / 100} suffix="+" label="[Years of combined experience]" duration={2200} />
            <StatCounter end={attorneys.length} suffix="" label="Attorneys admitted in Ghana" duration={1600} />
            <StatCounter end={practiceAreas.length} suffix="" label="Practice areas" duration={1600} />
            <StatCounter end={FIRM.offices.length} suffix="+" label="Offices" duration={1400} />
          </div>
        </div>
      </section>

      <Divider className="container-page mx-auto" />

      <section aria-labelledby="story-heading" className="section">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="eyebrow">Our story</span>
            <h2 id="story-heading" className="mb-6">
              Built around <GoldSpan>the matters our clients bring us.</GoldSpan>
            </h2>
          </div>
          <div className="lg:col-span-7 text-warm-muted text-base md:text-lg leading-relaxed space-y-5">
            <p>
              [Placeholder narrative: Founded in [YEAR] by [Founding Partner Name], the firm began
              as a two-partner corporate and property practice in the [Area] district of Accra.
              Over [XX] years, we have grown steadily — always through the same mechanism: clients
              returning with their next matter, and referring family, friends, and business
              associates.]
            </p>
            <p>
              [Today we are a full-service practice with specialists across corporate law, dispute
              resolution, property & real estate, family & succession, employment, and regulatory
              compliance. Our clients range from high-net-worth individuals and family businesses
              based in Ghana and the diaspora, to international corporates and financial
              institutions entering the Ghanaian market.]
            </p>
            <p>
              [We have deliberately remained the size we are. A smaller, carefully-selected team
              means partners stay directly involved in matters, and every client receives the same
              standard of advice — consistently.]
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="section bg-gray-100/30 border-y border-gray-200">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="eyebrow">What defines us</span>
            <h2 id="values-heading" className="mb-5">
              Four values <GoldSpan>we work to every day.</GoldSpan>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="card-surface card-surface-hover rounded-2xl p-6 md:p-8 h-full"
                >
                  <div
                    aria-hidden="true"
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-gold/10 border border-gold/20 text-gold"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-warm-text mb-2">
                    {v.title.replace(/[[\]]/g, "")}
                  </h3>
                  <p className="text-warm-muted leading-relaxed">
                    {v.body.replace(/[[\]]/g, "")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="founder-heading" className="section">
        <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
          {founding && (
            <div className="lg:col-span-5 relative aspect-[4/5] max-h-[600px] rounded-2xl overflow-hidden border border-gold/15 shadow-gold">
              <Image
                src={founding.photoUrl}
                alt={`Portrait of ${founding.fullName.replace(/[[\]]/g, "")}, ${founding.title.replace(/[[\]]/g, "")}`}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="lg:col-span-7">
            <span className="eyebrow">From our founding partner</span>
            <h2 id="founder-heading" className="mb-6">
              &ldquo;[A short, dignified headline quote from the founding partner — about the firm&apos;s reason for existing.]&rdquo;
            </h2>
            <p className="text-warm-muted text-lg leading-relaxed max-w-2xl">
              [Longer attributed quote paragraph, a few sentences long, discussing the approach
              and character of the firm. Example placeholder: &ldquo;From the first day, we set out to
              build the kind of firm we would want to instruct ourselves: one where the partner
              you meet is the partner who handles your matter; where the advice is measured and
              plainly spoken; and where our commercial judgment is as much a part of the value as
              our legal knowledge.&rdquo;]
            </p>
            {founding && (
              <div className="mt-8 flex items-center gap-4">
                <div>
                  <p className="font-serif text-lg text-warm-text">
                    {founding.fullName.replace(/[[\]]/g, "")}
                  </p>
                  <p className="text-sm text-warm-muted">{founding.title.replace(/[[\]]/g, "")}</p>
                </div>
                <LinkButton
                  href={`/book?attorney=${founding.id}`}
                  variant="outline"
                  size="md"
                  leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
                >
                  Book with {founding.fullName.split(" ").slice(-1)[0].replace(/[[\]]/g, "")}
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="creds-heading" className="section bg-gray-100/30 border-y border-gray-200">
        <div className="container-page grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="eyebrow">Credentials & recognition</span>
            <h2 id="creds-heading" className="mb-6">
              Visible, verified, <GoldSpan>and accountable.</GoldSpan>
            </h2>
            <p className="text-warm-muted leading-relaxed max-w-xl">
              [Placeholders for future directories and recognition badges. All claims must be
              reviewed against General Legal Council rules on lawyer advertising before
              publication.]
            </p>
          </div>
          <div className="space-y-3">
            {CREDENTIALS.map((c) => (
              <div
                key={c}
                className="card-surface rounded-xl px-5 py-4 flex items-center gap-3"
              >
                <Award aria-hidden="true" className="h-5 w-5 text-gold shrink-0" />
                <span className="text-sm md:text-base text-warm-text leading-snug">
                  {c.replace(/[[\]]/g, "")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "About the firm", url: "/about" },
        ]}
      />
    </article>
  );
}
