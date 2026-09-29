import type { Metadata } from "next";
import { listInsights } from "@/lib/mdx";
import { practiceAreas } from "@/content/practice-areas";
import type { PracticeArea } from "@/types";
import { attorneys } from "@/content/attorneys";
import { InsightCard } from "@/components/ui/InsightCard";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  title: "Insights · Legal News & Analysis from Accra, Ghana",
  description: `Legal insights, analysis, and updates from ${FIRM.name} on corporate law, dispute resolution, property, family law, employment, and regulatory compliance in Ghana.`,
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const insights = await listInsights();
  const categories = Array.from(new Set(insights.map((i) => i.category)));

  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Insights
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Legal analysis, practical guidance, and updates from our team in Accra.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="px-4 py-2 bg-gold text-black-900 font-medium rounded-sm">
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 border border-gold-sh/30 text-warm-text hover:border-gold hover:text-gold transition-colors rounded-sm"
              >
                {category.replace(/[[\]]/g, "")}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight) => {
              const author = insight.authorAttorneyId
                ? attorneys.find((a) => a.id === insight.authorAttorneyId)
                : undefined;
              const relatedPracticeAreas = insight.relatedPracticeAreaIds
                .map((id) => practiceAreas.find((pa) => pa.id === id))
                .filter((pa): pa is PracticeArea => Boolean(pa));
              return (
                <InsightCard
                  key={insight.slug}
                  insight={insight}
                  author={author}
                  relatedPracticeAreas={relatedPracticeAreas}
                />
              );
            })}
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
        ]}
      />
    </>
  );
}
