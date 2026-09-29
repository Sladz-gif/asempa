import { MetadataRoute } from "next";
import { FIRM } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/static/"],
    },
    sitemap: `${FIRM.siteUrl}/sitemap.xml`,
  };
}
