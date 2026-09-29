import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadInsight } from "@/lib/mdx";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD, ArticleJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowLeft } from "lucide-react";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await loadInsight(slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: `${insight.title.replace(/[[\]]/g, "")} · ${FIRM.shortName}`,
    description: insight.excerpt.replace(/[[\]]/g, ""),
    openGraph: {
      images: [insight.heroImageUrl],
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await loadInsight(slug);

  if (!insight) {
    notFound();
  }

  const author = insight.authorAttorneyId
    ? attorneys.find((a) => a.id === insight.authorAttorneyId)
    : undefined;
  const relatedPracticeAreas = insight.relatedPracticeAreaIds
    .map((id) => practiceAreas.find((pa) => pa.id === id))
    .filter(Boolean);

  const publishedDate = new Date(insight.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-hl transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-xs text-warm-muted mb-4">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded border border-gold/30">
                {insight.category.replace(/[[\]]/g, "")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {insight.readingTimeMinutes} min read
              </span>
              <span>{publishedDate}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-warm-text mb-6">
              {insight.title.replace(/[[\]]/g, "")}
            </h1>

            <p className="text-lg text-warm-muted mb-8">
              {insight.excerpt.replace(/[[\]]/g, "")}
            </p>

            {author && (
              <div className="flex items-center gap-4 pb-8 border-b border-gold-sh/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={author.photoUrl}
                    alt={author.fullName.replace(/[[\]]/g, "")}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-warm-text">
                    {author.fullName.replace(/[[\]]/g, "")}
                  </p>
                  <p className="text-sm text-warm-muted">
                    {author.title.replace(/[[\]]/g, "")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <article className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={insight.heroImageUrl}
                alt={insight.title.replace(/[[\]]/g, "")}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg prose-stone max-w-none">
              <MDXRemote source={insight.content} />
            </div>

            {relatedPracticeAreas.length > 0 && (
              <div className="mt-12 pt-8 border-t border-stone-300">
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-4">
                  Related Practice Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedPracticeAreas.map((pa) => (
                    <Link
                      key={pa?.id}
                      href={`/practice-areas/${pa?.slug}`}
                      className="px-4 py-2 bg-stone-200 text-stone-800 hover:bg-gold hover:text-black-900 transition-colors rounded-sm text-sm"
                    >
                      {pa?.name.replace(/[[\]]/g, "")}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: insight.title.replace(/[[\]]/g, ""), url: `/insights/${insight.slug}` },
        ]}
      />
      <ArticleJSONLD
        article={insight}
        authorName={author?.fullName}
      />
    </>
  );
}
