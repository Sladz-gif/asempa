import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GoldSpan } from "@/components/ui/Divider";
import { listInsights } from "@/lib/mdx";
import { attorneys } from "@/content/attorneys";
import { formatDateShort } from "@/lib/utils/format-date";

export async function HomeInsights() {
  const all = await listInsights();
  const latest = all.slice(0, 3);

  return (
    <section id="insights" aria-labelledby="ins-heading" className="section bg-gray-100/30 border-y border-gray-200">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-end mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">Insights & publications</span>
            <h2 id="ins-heading" className="mb-4 sm:mb-5">
              Commentary, analysis, and <GoldSpan>reading for our clients.</GoldSpan>
            </h2>
            <p className="text-warm-muted max-w-xl leading-relaxed text-sm sm:text-base">
              Practical briefings on the Ghanaian legal and regulatory landscape, written by our
              attorneys for our clients, friends of the firm, and the wider business community.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-hl"
            >
              Read all insights
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {latest.length === 0 && (
            <div className="col-span-full text-center text-warm-muted py-12">
              Insight articles are being prepared. Please check back shortly.
            </div>
          )}
          {latest.map((art) => {
            const author = art.authorAttorneyId
              ? attorneys.find((a) => a.id === art.authorAttorneyId)
              : null;
            return (
              <article
                key={art.slug}
                className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-gold/30 transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/insights/${art.slug}`}
                  className="relative aspect-[4/3] block overflow-hidden"
                  aria-label={art.title.replace(/[[\]]/g, "")}
                >
                  <Image
                    src={art.heroImageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">{art.category.replace(/[[\]]/g, "")}</Badge>
                  </div>
                </Link>
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-warm-muted mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {formatDateShort(art.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {art.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-[22px] leading-snug mb-2 sm:mb-3">
                    <Link
                      href={`/insights/${art.slug}`}
                      className="hover:text-gold transition-colors text-warm-text"
                    >
                      {art.title.replace(/[[\]]/g, "")}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-muted leading-relaxed mb-3 sm:mb-4 flex-1">
                    {art.excerpt.replace(/[[\]]/g, "")}
                  </p>
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-black-700">
                    <span className="text-xs text-warm-muted">
                      {author ? author.fullName.replace(/[[\]]/g, "") : "The Firm"}
                    </span>
                    <Link
                      href={`/insights/${art.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widgold text-gold hover:text-gold-hl"
                    >
                      Read <ArrowRight aria-hidden="true" className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
