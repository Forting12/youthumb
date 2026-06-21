import Head from "next/head";
import { NextSeo } from "next-seo";
import { SITE_URL, SITE_NAME } from "../../lib/constants";

// Per-page SEO + optional JSON-LD. Pass `path` (e.g. "/privacy") for canonical.
export default function Seo({ title, description, path = "/", jsonLd }) {
  const canonical = `${SITE_URL}${path}`;
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title,
          description,
          site_name: SITE_NAME,
        }}
      />
      {blocks.length > 0 && (
        <Head>
          {blocks.map((block, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
            />
          ))}
        </Head>
      )}
    </>
  );
}

// Reusable JSON-LD builders.
export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function softwareAppJsonLd(name) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
