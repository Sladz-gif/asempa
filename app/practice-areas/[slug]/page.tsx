import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { practiceAreas, getPracticeAreaBySlug } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { faqs, faqsByPracticeArea } from "@/content/faqs";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbListJSONLD, FAQPageJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";
import { cn } from "@/lib/utils/cn";
import * as LucideIcons from "lucide-react";

export function generateStaticParams() {
  return practiceAreas.map((pa) => ({ slug: pa.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const pa = getPracticeAreaBySlug(params.slug);
  if (!pa) return { title: "Practice Area Not Found" };
  const cleanName = pa.name.replace(/[[\]]/g, "");
  const canonical = `/practice-areas/${pa.slug}`;
  return {
    title: cleanName,
    description: pa.shortDescription.replace(/[[\]]/g, ""),
    alternates: { canonical },
    openGraph: {
      title: `${cleanName} · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
      description: pa.shortDescription.replace(/[[\]]/g, ""),
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanName} · ${FIRM.shortName.replace(/[[\]]/g, "")}`,
      description: pa.shortDescription.replace(/[[\]]/g, ""),
    },
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Building2: (LucideIcons as any).Building2,
  Scale: (LucideIcons as any).Scale,
  Users: (LucideIcons as any).Users,
  Home: (LucideIcons as any).Home,
  Briefcase: (LucideIcons as any).Briefcase,
  Zap: (LucideIcons as any).Zap,
};

export default function PracticeAreaDetailPage({ params }: { params: { slug: string } }) {
  const pa = getPracticeAreaBySlug(params.slug);
  if (!pa) notFound();

  const relatedAttorneys = attorneys.filter((a) => a.practiceAreaIds.includes(pa.id));
  const paFaqs = faqsByPracticeArea(pa.id);
  const Icon = iconMap[pa.icon] ?? LucideIcons.CircleDot;

  const cleanName = pa.name.replace(/[[\]]/g, "");
  const canonical = `/practice-areas/${pa.slug}`;

  return (
    <>
      <section aria-labelledby="pa-detail-heading" className="section pt-20 md:pt-28 pb-10">
        <div className="container-page max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-warm-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/practice-areas" className="hover:text-gold transition-colors">Practice Areas</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-warm-text">{cleanName}</li>
            </ol>
          </nav>

          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-black-900 shadow-gold-sm">
            <Icon className="h-7 w-7" aria-hidden={true} />
          </div>

          <span className="eyebrow mt-8">Practice area</span>
          <h1 id="pa-detail-heading" className="text-balance">
            <GoldSpan>{cleanName}</GoldSpan>
          </h1>
          <p className="mt-6 text-xl text-warm-muted leading-relaxed max-w-3xl">
            {pa.shortDescription.replace(/[[\]]/g, "")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
            <LinkButton
              href={`/book?practiceArea=${pa.id}`}
              variant="primary"
              size="lg"
              leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
            >
              Book a Consultation for {cleanName}
            </LinkButton>
            <LinkButton href="/contact" variant="outline" size="lg">
              Speak with our team
            </LinkButton>
          </div>
        </div>
      </section>

      <Divider />

      <section aria-labelledby="overview-heading" className="section py-16 md:py-20">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 max-w-3xl">
            <h2 id="overview-heading" className="mb-6">
              Overview
            </h2>
            <div className="space-y-5 text-warm-muted text-lg leading-relaxed">
              {pa.overview.split("\n\n").map((para, i) => (
                <p key={i}>{para.replace(/[[\]]/g, "")}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="how-heading">
            <Card padding="lg">
              <h3 id="how-heading" className="mb-6 font-serif text-2xl text-warm-text">
                How we help
              </h3>
              <ul className="space-y-4" role="list">
                {pa.howWeHelp.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-gold mt-0.5"
                    />
                    <span className="text-warm-text leading-relaxed">{item.replace(/[[\]]/g, "")}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </section>

      <Divider />

      <section aria-labelledby="process-heading" className="section py-16 md:py-20">
        <div className="container-page max-w-5xl">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">How your matter proceeds</span>
            <h2 id="process-heading">
              Our process for <GoldSpan>{cleanName}</GoldSpan>
            </h2>
          </div>
          <ol className="relative space-y-10 before:absolute before:left-[22px] before:top-2 before:bottom-2 before:w-px before:bg-gold/50 md:before:left-[30px]" role="list">
            {pa.steps.map((step, i) => (
              <li key={i} className="relative pl-16 md:pl-20">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-gold text-black-900 font-serif font-bold text-xl shadow-gold-sm"
                >
                  {i + 1}
                </div>
                <h3 className="font-serif text-2xl text-warm-text mb-3">{step.title.replace(/[[\]]/g, "")}</h3>
                <p className="text-warm-muted leading-relaxed text-lg">
                  {step.description.replace(/[[\]]/g, "")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {relatedAttorneys.length > 0 && (
        <>
          <Divider />
          <section aria-labelledby="team-heading" className="section py-16 md:py-20">
            <div className="container-page">
              <div className="max-w-2xl mb-12">
                <span className="eyebrow">Who you&apos;ll work with</span>
                <h2 id="team-heading">Attorneys specialising in this area</h2>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {relatedAttorneys.map((a) => (
                  <li key={a.id}>
                    <Card padding="none" interactive hover asChild>
                      <Link href={`/attorneys/${a.slug}`} className="block h-full">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-white">
                          <Image
                            src={a.photoUrl}
                            alt={`${a.fullName.replace(/[[\]]/g, "")} — headshot`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black-900/80 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-xl text-warm-text">
                            {a.fullName.replace(/[[\]]/g, "")}
                          </h3>
                          <p className="text-sm text-gold mt-1">{a.title.replace(/[[\]]/g, "")}</p>
                          <p className="mt-3 text-sm text-warm-muted line-clamp-3">
                            {a.bio.replace(/[[\]]/g, "")}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 text-gold font-medium text-sm group-hover/card:gap-3 transition-all">
                            View profile
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {paFaqs.length > 0 && (
        <>
          <Divider />
          <section aria-labelledby="faq-heading" className="section py-16 md:py-20 bg-gray-100/30">
            <div className="container-page max-w-3xl">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="eyebrow">Questions</span>
                <h2 id="faq-heading">Frequently asked — {cleanName}</h2>
              </div>
              <Accordion
                items={paFaqs.map((f) => ({
                  id: f.id,
                  question: f.question.replace(/[[\]]/g, ""),
                  answer: f.answer.replace(/[[\]]/g, ""),
                }))}
              />
              <FAQPageJSONLD
                items={paFaqs.map((f, index) => ({
                  id: `faq-${index}`,
                  question: f.question.replace(/[[\]]/g, ""),
                  answer: f.answer.replace(/[[\]]/g, ""),
                }))}
              />
            </div>
          </section>
        </>
      )}

      <CTABand
        eyebrow={`${cleanName} · Next step`}
        heading={`Book a consultation to discuss your ${cleanName.toLowerCase()} matter.`}
        description={`You will meet with one of our partners specialising in ${cleanName.toLowerCase()}. The initial consultation is up to 60 minutes.`}
        primary={
          <LinkButton
            href={`/book?practiceArea=${pa.id}`}
            variant="primary"
            size="lg"
            leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
          >
            Book a Consultation · {cleanName}
          </LinkButton>
        }
      />

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Practice Areas", url: "/practice-areas" },
          { name: cleanName, url: canonical },
        ]}
      />
    </>
  );
}
