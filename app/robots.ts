import type { MetadataRoute } from "next";

const SITE_URL = "https://novagraphy.com"; // TODO: [INSERT_SITE_URL] — Replace with your production URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/success/", "/cancel/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
