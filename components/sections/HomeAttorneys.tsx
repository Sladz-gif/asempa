import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Divider, GoldSpan } from "@/components/ui/Divider";
import { attorneys } from "@/content/attorneys";
import { practiceAreas } from "@/content/practice-areas";
import { LinkButton } from "@/components/ui/Button";

export function HomeAttorneys() {
  const featured = attorneys.filter((a) => a.featured).slice(0, 3);
  return (
    <section id="attorneys" aria-labelledby="att-heading" className="section bg-gray-50/20 border-y border-gray-200/60">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-end mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Our attorneys</span>
            <h2 id="att-heading" className="mb-3 sm:mb-4 md:mb-5">
              Admitted in Ghana, <GoldSpan>rooted in Accra.</GoldSpan>
            </h2>
            <p className="text-warm-muted max-w-xl leading-relaxed text-sm sm:text-base md:text-base">
              Every partner and associate is admitted to practice before the Superior Courts of
              Judicature of Ghana and brings specific experience in the areas of law they practice.
              Meet some of our team below.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/attorneys"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-hl"
            >
              Meet the full team
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {featured.map((a) => (
            <article
              key={a.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-gold/30 transition-colors"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={a.photoUrl}
                  alt={`Portrait of ${a.fullName.replace(/[[\]]/g, "")}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute top-2 sm:top-2 md:top-3 left-2 sm:left-2 md:left-3">
                  <Badge variant="gold" className="text-[10px] sm:text-[10px] md:text-xs">Called {a.ghanaBarAdmissionYear}</Badge>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="font-serif text-base sm:text-lg md:text-xl text-warm-text mb-1">
                  <Link
                    href={`/attorneys/${a.slug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {a.fullName.replace(/[[\]]/g, "")}
                  </Link>
                </h3>
                <p className="text-xs sm:text-xs md:text-sm text-warm-muted mb-2 sm:mb-3 md:mb-4">{a.title.replace(/[[\]]/g, "")}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1 md:gap-1.5 mb-3 sm:mb-4 md:mb-5">
                  {a.practiceAreaIds.slice(0, 2).map((id) => {
                    const pa = practiceAreas.find((p) => p.id === id);
                    return pa ? (
                      <Badge key={id} variant="outline" className="text-[10px] sm:text-[10px] md:text-xs">
                        {pa.name.replace(/[[\]]/g, "")}
                      </Badge>
                    ) : null;
                  })}
                </div>
                <div className="flex items-center justify-between pt-2 sm:pt-3 md:pt-4 border-t border-black-700">
                  <Link
                    href={`/attorneys/${a.slug}`}
                    className="inline-flex items-center gap-1 sm:gap-1 md:gap-1.5 text-[10px] sm:text-[10px] md:text-xs uppercase tracking-widgold text-gold hover:text-gold-hl"
                  >
                    View profile <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </Link>
                  <Link
                    href={`/book?attorney=${a.id}`}
                    className="inline-flex items-center gap-1 sm:gap-1 md:gap-1.5 text-[10px] sm:text-[10px] md:text-xs uppercase tracking-widgold text-warm-muted hover:text-gold"
                  >
                    <CalendarCheck aria-hidden="true" className="h-3 w-3" />
                    Book
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-14 flex justify-center">
          <LinkButton href="/attorneys" variant="outline" size="md" className="w-full sm:w-auto">
            Meet all our attorneys
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
