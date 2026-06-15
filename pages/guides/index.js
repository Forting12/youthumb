import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Hero from '../../components/Hero'
import { guides } from '../../lib/data'

const GuidesIndex = () => (
  <>
    <NextSeo
      title="Field Guides"
      description="Research tactics, ground reading, gear setup and detector reviews from experienced treasure hunters."
    />

    <Hero
      eyebrow="Learn the craft"
      title="Field Guides"
      subtitle="Practical know-how from research to recovery — written by hunters who put in the dirt time."
      size="sm"
    />

    <section className="max-w-content mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card overflow-hidden flex flex-col hover:shadow-md transition"
          >
            <div className="photo h-44" />
            <div className="p-6 flex flex-col flex-grow">
              <p className="eyebrow">{g.category}</p>
              <h2 className="text-xl text-forest-dark mt-2 mb-2 leading-snug">
                {g.title}
              </h2>
              <p className="text-sm flex-grow">{g.excerpt}</p>
              <p className="text-xs text-sepia-light mt-4">
                {g.author} · {g.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </>
)

export default GuidesIndex
