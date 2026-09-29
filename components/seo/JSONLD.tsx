import React from "react";
import { FIRM } from "@/lib/config";
import type { Attorney, FAQItem, InsightArticle } from "@/types";
import { practiceAreas } from "@/content/practice-areas";

const Script = ({ children, id }: { children: string; id?: string }) => (
  <script
    id={id}
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

export function LegalServiceJSONLD() {
  const office = FIRM.offices[0];
  const data = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: FIRM.name,
    image: `${FIRM.siteUrl}/og-default.png`,
    url: FIRM.siteUrl,
    telephone: FIRM.phone,
    email: FIRM.email,
    description: FIRM.positioning,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    areaServed: [
      { "@type": "City", name: "Accra" },
      { "@type": "Country", name: "Ghana" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    knowsAbout: practiceAreas.map((pa) => pa.name.replace(/[[\]]/g, "")),
    sameAs: Object.values(FIRM.socials).filter((v) => v && v !== "#"),
  };
  return <Script id="jsonld-legal">{JSON.stringify(data)}</Script>;
}

export function AttorneyPersonJSONLD({ attorney }: { attorney: Attorney }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorney.fullName.replace(/[[\]]/g, ""),
    jobTitle: attorney.title.replace(/[[\]]/g, ""),
    image: attorney.photoUrl,
    worksFor: { "@type": "LegalService", name: FIRM.name.replace(/[[\]]/g, "") },
    memberOf: "Ghana Bar Association",
    alumniOf: attorney.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.replace(/[[\]]/g, ""),
    })),
    knowsLanguage: attorney.languages,
    knowsAbout: attorney.practiceAreaIds
      .map((id) => practiceAreas.find((pa) => pa.id === id)?.name.replace(/[[\]]/g, ""))
      .filter(Boolean),
    url: `${FIRM.siteUrl}/attorneys/${attorney.slug}`,
  };
  return <Script id={`jsonld-person-${attorney.id}`}>{JSON.stringify(data)}</Script>;
}

export function FAQPageJSONLD({ items }: { items: FAQItem[] }) {
  if (items.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question.replace(/[[\]]/g, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/[[\]]/g, ""),
      },
    })),
  };
  return <Script id="jsonld-faq">{JSON.stringify(data)}</Script>;
}

export function ArticleJSONLD({ article, authorName }: { article: InsightArticle; authorName?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title.replace(/[[\]]/g, ""),
    description: article.excerpt.replace(/[[\]]/g, ""),
    image: article.heroImageUrl,
    datePublished: article.publishedAt,
    author: authorName ? [{ "@type": "Person", name: authorName.replace(/[[\]]/g, "") }] : undefined,
    publisher: {
      "@type": "Organization",
      name: FIRM.name.replace(/[[\]]/g, ""),
    },
    mainEntityOfPage: `${FIRM.siteUrl}/insights/${article.slug}`,
  };
  return <Script id={`jsonld-article-${article.slug}`}>{JSON.stringify(data)}</Script>;
}

export function BreadcrumbListJSONLD({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name.replace(/[[\]]/g, ""),
      item: it.url.startsWith("http") ? it.url : `${FIRM.siteUrl}${it.url}`,
    })),
  };
  return <Script id="jsonld-breadcrumb">{JSON.stringify(data)}</Script>;
}
