import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { guides, discoveries } from '../../lib/data'

export async function getStaticPaths() {
  return {
    paths: guides.map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const guide = guides.find((g) => g.slug === params.slug)
  const related = guides.filter((g) => g.slug !== params.slug).slice(0, 2)
  return { props: { guide, related } }
}

const Block = ({ block }) => {
  if (block.type === 'h2') return <h2>{block.text}</h2>
  if (block.type === 'h3') return <h3>{block.text}</h3>
  if (block.type === 'ul')
    return (
      <ul>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  return <p>{block.text}</p>
}

const socials = ['F', 'X', 'Y', 'in', 'P']

const Article = ({ guide, related }) => (
  <>
    <NextSeo
      title={guide.title}
      description={guide.excerpt}
      openGraph={{ title: guide.title, description: guide.excerpt }}
    />

    {/* Article banner */}
    <section className="photo py-16 md:py-24">
      <div className="absolute inset-0 bg-forest-darker opacity-50" />
      <div className="relative max-w-content mx-auto px-4 text-parchment-light">
        <p className="uppercase tracking-widest text-xs font-semibold text-gold-light mb-3">
          {guide.category}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl drop-shadow-md">
          {guide.title}
        </h1>
        <p className="mt-4 opacity-90 text-sm">
          By {guide.author} · {guide.date} · {guide.readTime}
        </p>
      </div>
    </section>

    <div className="max-w-content mx-auto px-4 py-12 grid gap-12 lg:grid-cols-3">
      {/* Article body */}
      <article className="lg:col-span-2">
        <p className="text-sm text-sepia-light mb-6">
          <Link href="/">
            <a className="hover:text-forest">Home</a>
          </Link>{' '}
          / {' '}
          <Link href="/guides">
            <a className="hover:text-forest">Guides</a>
          </Link>{' '}
          / <span>{guide.title}</span>
        </p>

        <div className="prose-treasure">
          {guide.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Share */}
        <div className="mt-10 pt-6 border-t border-parchment-dark flex items-center gap-3">
          <span className="text-sm font-semibold text-sepia-dark">Share:</span>
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              aria-label={`Share on ${s}`}
              className="w-9 h-9 rounded-full bg-forest text-parchment-light flex items-center justify-center text-sm hover:bg-forest-dark transition"
            >
              {s}
            </a>
          ))}
        </div>
      </article>

      {/* Sidebar */}
      <aside className="space-y-10">
        <div>
          <h3 className="text-lg text-forest-dark mb-4 pb-2 border-b border-parchment-dark">
            Latest Discoveries
          </h3>
          <ul className="space-y-4">
            {discoveries.slice(0, 3).map((d) => (
              <li key={d.title} className="flex gap-3">
                <div className="photo w-16 h-16 rounded flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-sepia-dark leading-snug">
                    {d.title}
                  </p>
                  <p className="text-xs text-sepia-light">{d.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-forest-dark mb-4 pb-2 border-b border-parchment-dark">
            Related articles
          </h3>
          <ul className="space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/guides/${r.slug}`}>
                  <a className="flex gap-3 group">
                    <div className="photo w-16 h-16 rounded flex-shrink-0" />
                    <p className="text-sm font-semibold text-sepia-dark leading-snug group-hover:text-forest">
                      {r.title}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 bg-forest text-parchment-light">
          <h3 className="text-lg text-parchment-light mb-2">Identify your finds</h3>
          <p className="text-sm opacity-90 mb-4">
            Snap a photo of a coin and get an instant ID and rough value.
          </p>
          <Link href="/coin-identifier">
            <a className="btn-gold w-full text-sm">Open Coin Identifier</a>
          </Link>
        </div>
      </aside>
    </div>
  </>
)

export default Article
