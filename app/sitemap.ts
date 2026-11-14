import type { MetadataRoute } from "next";
import { site } from "@/content/config";

export const dynamic = "force-static";

// Two pages. /how-it-works/ and /research/ are redirect stubs and stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/record/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
