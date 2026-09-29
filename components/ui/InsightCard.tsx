import type { InsightArticle, Attorney, PracticeArea } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

interface InsightCardProps {
  insight: InsightArticle;
  author?: Attorney;
  relatedPracticeAreas?: PracticeArea[];
}

export function InsightCard({ insight, author, relatedPracticeAreas }: InsightCardProps) {
  const publishedDate = new Date(insight.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/insights/${insight.slug}`} className="group block">
      <div className="bg-white overflow-hidden border border-gray-200 hover:border-gold/40 transition-colors h-full flex flex-col">
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={insight.heroImageUrl}
            alt={insight.title.replace(/[[\]]/g, "")}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-warm-muted mb-3">
            <span className="bg-gold/10 text-gold px-2 py-1 rounded border border-gold/30">
              {insight.category.replace(/[[\]]/g, "")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {insight.readingTimeMinutes} min read
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-warm-text mb-3 group-hover:text-gold transition-colors line-clamp-2">
            {insight.title.replace(/[[\]]/g, "")}
          </h3>
          <p className="text-warm-muted text-sm mb-4 line-clamp-3 flex-1">
            {insight.excerpt.replace(/[[\]]/g, "")}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gold-sh/20">
            {author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold" />
                <span className="text-sm text-warm-text">
                  {author.fullName.replace(/[[\]]/g, "")}
                </span>
              </div>
            )}
            <span className="text-xs text-warm-muted">{publishedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
