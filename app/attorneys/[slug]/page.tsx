import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  GraduationCap,
  Languages,
  Award,
  Briefcase,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react";
import { attorneys, getAttorneyBySlug } from "@/content/attorneys";
import { practiceAreas } from "@/content/practice-areas";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import {
  BreadcrumbListJSONLD,
  AttorneyPersonJSONLD,
} from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const a = getAttorneyBySlug(params.slug);
  if (!a) return { title: "Attorney Not Found" };
  const cleanName = a.fullName.replace(/[[\]]/g, "");
  const canonical = `/attorneys/${a.slug}`;
  const cleanTitle = a.title.replace(/[[\]]/g, "");
  return {
    title: `${cleanName} · ${cleanTitle}`,
    description: `${cleanName}, ${cleanTitle} at ${FIRM.name.replace(/[[\]]/g, "")} — admitted to the Ghana Bar in ${a.ghanaBarAdmissionYear}. View profile, practice areas, and book a consultation directly.`,
    alternates: { canonical },
    openGraph: {
      title: `${cleanName} · ${cleanTitle}`,
      description: `Admitted to the Ghana Bar in ${a.ghanaBarAdmissionYear}. Practice areas, education, languages, and direct booking.`,
      url: canonical,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanName} · ${cleanTitle}`,
      description: `Admitted to the Ghana Bar in ${a.ghanaBarAdmissionYear}. Practice areas, education, languages, and direct booking.`,
    },
  };
}

export default function AttorneyProfilePage({ params }: { params: { slug: string } }) {
  const a = getAttorneyBySlug(params.slug);
  if (!a) notFound();

  const cleanName = a.fullName.replace(/[[\]]/g, "");
  const cleanTitle = a.title.replace(/[[\]]/g, "");
  const canonical = `/attorneys/${a.slug}`;
  const relatedPractices = practiceAreas.filter((p) => a.practiceAreaIds.includes(p.id));

  return (
    <>
      <section aria-labelledby="profile-heading" className="section pt-20 md:pt-28 pb-6">
        <div className="container-page max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-warm-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/attorneys" className="hover:text-gold transition-colors">Attorneys</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-warm-text">{cleanName}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-gold/10 shadow-gold-lg bg-white">
                <Image
                  src={a.photoUrl}
                  alt={`${cleanName}, ${cleanTitle} — professional portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-black-900/60" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-gold/30 px-3 py-1.5 text-xs text-gold shadow-gold-sm">
                    <Award aria-hidden="true" className="h-3.5 w-3.5" />
                    Called to the Ghana Bar · {a.ghanaBarAdmissionYear}
                  </div>
                </div>
              </div>

              <Card className="mt-6">
                <h2 className="font-serif text-xl text-warm-text mb-4">Quick actions</h2>
                <div className="space-y-3">
                  <LinkButton
                    href={`/book?attorney=${a.id}`}
                    variant="primary"
                    fullWidth
                    leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
                  >
                    Book a Consultation with {cleanName.split(" ")[0]}
                  </LinkButton>
                  <div className="grid grid-cols-2 gap-3">
                    <LinkButton href={`tel:${FIRM.phone.replace(/\s/g, "")}`} variant="outline" size="md">
                      <span className="flex items-center gap-2">
                        <Phone aria-hidden="true" className="h-4 w-4" /> Call
                      </span>
                    </LinkButton>
                    <LinkButton
                      href={`https://wa.me/${FIRM.whatsapp.replace(/\D/g, "")}`}
                      variant="outline"
                      size="md"
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare aria-hidden="true" className="h-4 w-4" /> WhatsApp
                      </span>
                    </LinkButton>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="eyebrow">{cleanTitle}</span>
              <h1 id="profile-heading" className="text-balance">
                <GoldSpan>{cleanName}</GoldSpan>
              </h1>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="card-surface rounded-2xl p-5 border border-gold/10">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap aria-hidden="true" className="h-5 w-5 text-gold" />
                    <h3 className="font-medium text-warm-text">Education</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-warm-muted">
                    {a.education.map((e, i) => (
                      <li key={i}>· {e.replace(/[[\]]/g, "")}</li>
                    ))}
                  </ul>
                </div>
                <div className="card-surface rounded-2xl p-5 border border-gold/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Languages aria-hidden="true" className="h-5 w-5 text-gold" />
                    <h3 className="font-medium text-warm-text">Languages</h3>
                  </div>
                  <p className="text-sm text-warm-muted">
                    {a.languages.map((l) => l.replace(/[[\]]/g, "")).join(" · ")}
                  </p>
                </div>
              </div>

              <div className="gold-divider-short mt-10" />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section aria-labelledby="bio-heading" className="section py-16 md:py-20">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 max-w-3xl">
            <h2 id="bio-heading" className="mb-6">
              About <GoldSpan>{cleanName.split(" ")[0]}</GoldSpan>
            </h2>
            <div className="space-y-5 text-warm-muted text-lg leading-relaxed">
              {a.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para.replace(/[[\]]/g, "")}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5 space-y-6" aria-labelledby="practice-heading">
            <Card padding="lg">
              <div className="flex items-center gap-3 mb-5">
                <Briefcase aria-hidden="true" className="h-5 w-5 text-gold" />
                <h3 id="practice-heading" className="font-serif text-xl text-warm-text">
                  Practice areas
                </h3>
              </div>
              <ul className="space-y-3" role="list">
                {relatedPractices.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/practice-areas/${p.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-xl p-3 -mx-3 hover:bg-gold/5 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-warm-text group-hover:text-gold transition-colors">
                          {p.name.replace(/[[\]]/g, "")}
                        </p>
                        <p className="text-sm text-warm-muted mt-1">
                          {p.shortDescription.replace(/[[\]]/g, "")}
                        </p>
                      </div>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="lg" className="bg-gold/5 border-gold/15">
              <h3 className="font-serif text-xl text-warm-text mb-3">
                Consultation fee
              </h3>
              <p className="text-3xl font-serif font-semibold text-gold">
                ₵{FIRM.consultationFeeGHS.toLocaleString("en-GH")}
              </p>
              <p className="mt-2 text-sm text-warm-muted">
                Up to 60 minutes · In person, by phone, or by video · Africa/Accra (GMT)
              </p>
              <LinkButton
                href={`/book?attorney=${a.id}`}
                variant="outline"
                size="md"
                className="mt-5"
                leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
              >
                Book with {cleanName.split(" ")[0]}
              </LinkButton>
            </Card>
          </aside>
        </div>
      </section>

      <CTABand
        eyebrow={`Book with ${cleanName}`}
        heading={`Reserve a consultation slot with ${cleanName}.`}
        description="Meet in person at our Accra office, or connect by phone or video. Available times are shown in Africa/Accra (GMT)."
        primary={
          <LinkButton
            href={`/book?attorney=${a.id}`}
            variant="primary"
            size="lg"
            leftIcon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
          >
            Book with {cleanName}
          </LinkButton>
        }
      />

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Attorneys", url: "/attorneys" },
          { name: cleanName, url: canonical },
        ]}
      />
      <AttorneyPersonJSONLD attorney={a} />
    </>
  );
}
