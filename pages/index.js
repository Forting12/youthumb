import Link from "next/link";
import Layout from "../components/layout/Layout";
import Seo, { faqJsonLd } from "../components/seo/Seo";
import FaqAccordion from "../components/ui/FaqAccordion";
import { TOOLS, SITE_DESCRIPTION } from "../lib/constants";
import { COMMON_FAQS } from "../lib/faqs";

export default function Home() {
  return (
    <Layout>
      <Seo
        title="Free Instagram & YouTube Downloader"
        description={SITE_DESCRIPTION}
        path="/"
        jsonLd={faqJsonLd(COMMON_FAQS)}
      />

      <section className="container-tight py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Free Instagram &amp; YouTube Downloader
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Paste a link, get the file. Reels, photos, carousels, and YouTube
          thumbnails — no login, no watermark, no nonsense.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span>Free forever</span>
          <span>·</span>
          <span>No account needed</span>
          <span>·</span>
          <span>Works on mobile</span>
          <span>·</span>
          <span>We don&apos;t store your files</span>
        </div>
      </section>

      <section className="container-wide">
        <div className="grid gap-4 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href}>
              <a className="block rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-400">
                <h2 className="font-semibold text-gray-900">{t.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{t.short}</p>
                <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                  Open tool →
                </span>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-tight py-16">
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          How it works
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Copy the link", "Tap Share on Instagram and copy the link."],
            ["2", "Paste it", "Drop the link into the tool above."],
            ["3", "Download", "Save the original file to your device."],
          ].map(([n, t, d]) => (
            <li
              key={n}
              className="rounded-lg border border-gray-200 bg-white p-5 text-center"
            >
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {n}
              </div>
              <p className="mt-3 font-medium text-gray-900">{t}</p>
              <p className="mt-1 text-sm text-gray-500">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-tight pb-16">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900">
          Frequently asked questions
        </h2>
        <FaqAccordion items={COMMON_FAQS} />
      </section>
    </Layout>
  );
}
