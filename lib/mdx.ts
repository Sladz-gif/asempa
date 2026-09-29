import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { InsightArticle } from "@/types";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export interface InsightFrontmatter {
  title: string;
  category: string;
  authorAttorneyId?: string;
  publishedAt: string;
  readingTimeMinutes: number;
  excerpt: string;
  heroImageUrl: string;
  relatedPracticeAreaIds: string[] | string;
}

export async function listInsightSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(INSIGHTS_DIR);
    return entries
      .filter((e) => e.endsWith(".mdx") || e.endsWith(".md"))
      .map((e) => e.replace(/\.(mdx|md)$/, ""));
  } catch {
    return [];
  }
}

export async function loadInsight(slug: string): Promise<InsightArticle | null> {
  const candidates = [
    path.join(INSIGHTS_DIR, `${slug}.mdx`),
    path.join(INSIGHTS_DIR, `${slug}.md`),
  ];

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as InsightFrontmatter;
      return {
        slug,
        title: fm.title,
        category: fm.category,
        authorAttorneyId: fm.authorAttorneyId,
        publishedAt: fm.publishedAt,
        readingTimeMinutes: fm.readingTimeMinutes,
        excerpt: fm.excerpt,
        heroImageUrl: fm.heroImageUrl,
        relatedPracticeAreaIds: Array.isArray(fm.relatedPracticeAreaIds)
          ? fm.relatedPracticeAreaIds
          : typeof fm.relatedPracticeAreaIds === "string"
          ? [fm.relatedPracticeAreaIds]
          : [],
        content: parsed.content,
      };
    } catch {
      // try next
    }
  }
  return null;
}

export async function listInsights(): Promise<InsightArticle[]> {
  const slugs = await listInsightSlugs();
  const items = await Promise.all(slugs.map((s) => loadInsight(s)));
  return items
    .filter((v): v is InsightArticle => !!v)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}
