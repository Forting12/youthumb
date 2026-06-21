import Link from "next/link";
import Layout from "../layout/Layout";
import Seo, { faqJsonLd, softwareAppJsonLd } from "../seo/Seo";
import FaqAccordion from "../ui/FaqAccordion";
import { TOOLS } from "../../lib/constants";

// Shared template for every tool + SEO landing page.
export default function ToolPage({
  title,
  description,
  path,
  heading,
  subheading,
  body,
  faqs = [],
  currentHref,
  children,
}) {
  const related = TOOLS.filter((t) => t.href !== currentHref);
  const jsonLd = [softwareAppJsonLd(heading)];
  if (faqs.length) jsonLd.push(faqJsonLd(faqs));

  return (
    <Layout>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
      <div className="container-tight py-12">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          {heading}
        </h1>
        {subheading && (
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
            {subheading}
          </p>
        )}

        <div className="mt-8">{children}</div>

        {body && (
          <div className="mt-12 space-y-4 text-sm leading-relaxed text-gray-600">
            {body}
          </div>
        )}

        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Related tools
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {related.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>
                  <a className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-400">
                    <span className="font-medium text-gray-900">{t.title}</span>
                    <span className="mt-1 block text-sm text-gray-500">
                      {t.short}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
