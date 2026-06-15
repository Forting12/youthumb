import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Hero from '../components/Hero'
import { guides, discoveries } from '../lib/data'

const features = [
  {
    title: 'AI Coin Identifier',
    body: 'Snap a photo of any coin and get an instant identification, era and rough value.',
    href: '/coin-identifier',
    cta: 'Identify a coin',
    icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z',
  },
  {
    title: 'Field Guides',
    body: 'Research tactics, ground reading and gear setup from experienced hunters.',
    href: '/guides',
    cta: 'Browse guides',
    icon: 'M4 4h11a3 3 0 013 3v13a2 2 0 00-2-2H4V4zm16 0v14',
  },
  {
    title: 'Community Forum',
    body: 'Ask questions, share finds and learn the local hot spots from the community.',
    href: '/forum',
    cta: 'Join the forum',
    icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  },
]

const Home = () => (
  <>
    <NextSeo
      title="Treasure Hunting, Metal Detecting & Coin ID"
      description="Identify coins from a photo, browse field guides and detector reviews, and trade tips in the treasure hunting community."
    />

    <Hero
      eyebrow="Dig deeper"
      title="Find more. Hunt smarter."
      subtitle="Your field companion for metal detecting, coin identification and treasure hunting know-how."
    >
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/coin-identifier">
          <a className="btn-gold">Identify a coin</a>
        </Link>
        <Link href="/guides">
          <a className="btn-outline">Read the guides</a>
        </Link>
      </div>
    </Hero>

    {/* Feature cards */}
    <section className="max-w-content mx-auto px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#faf6ec" strokeWidth="1.8">
                <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl text-forest-dark mb-2">{f.title}</h3>
            <p className="mb-4 flex-grow">{f.body}</p>
            <Link href={f.href}>
              <a className="text-forest font-semibold hover:text-forest-dark">
                {f.cta} →
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* Latest discoveries strip */}
    <section className="bg-parchment-dark/60 py-16">
      <div className="max-w-content mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow">From the field</p>
            <h2 className="text-3xl text-forest-dark">Latest discoveries</h2>
          </div>
          <Link href="/discoveries">
            <a className="hidden sm:inline text-forest font-semibold hover:text-forest-dark">
              View all →
            </a>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {discoveries.map((d) => (
            <div key={d.title} className="card overflow-hidden">
              <div className="photo h-40" />
              <div className="p-4">
                <p className="text-xs text-forest font-semibold uppercase tracking-wide">
                  {d.meta}
                </p>
                <h3 className="text-base mt-1 leading-snug text-sepia-dark">
                  {d.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured guide */}
    <section className="max-w-content mx-auto px-4 py-16">
      <p className="eyebrow text-center">Editor's pick</p>
      <h2 className="text-3xl text-forest-dark text-center mb-8">Featured guide</h2>
      <Link href={`/guides/${guides[0].slug}`}>
        <a className="card grid md:grid-cols-2 overflow-hidden hover:shadow-md transition">
          <div className="photo min-h-[220px]" />
          <div className="p-8">
            <p className="eyebrow">{guides[0].category}</p>
            <h3 className="text-2xl text-forest-dark mt-2 mb-3">
              {guides[0].title}
            </h3>
            <p className="mb-4">{guides[0].excerpt}</p>
            <span className="text-forest font-semibold">Read the guide →</span>
          </div>
        </a>
      </Link>
    </section>
  </>
)

export default Home
