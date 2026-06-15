import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Hero from '../components/Hero'

const reviews = [
  {
    name: 'TerraSeeker Pro X',
    category: 'Best Overall',
    rating: 4.8,
    blurb: 'Balanced depth, intuitive tones and an all-day-comfortable build.',
  },
  {
    name: 'GroundHawk 200',
    category: 'Best Value',
    rating: 4.5,
    blurb: 'Punches well above its price for parks and fields.',
  },
  {
    name: 'TideRunner WS',
    category: 'Best for Beaches',
    rating: 4.6,
    blurb: 'Multi-frequency performance that shrugs off salt and minerals.',
  },
  {
    name: 'PinPoint Mini',
    category: 'Best Pinpointer',
    rating: 4.7,
    blurb: 'Fast, waterproof and precise — pinpoints in seconds.',
  },
]

const Stars = ({ rating }) => (
  <span className="text-gold" aria-label={`${rating} out of 5`}>
    {'★'.repeat(Math.round(rating))}
    <span className="text-parchment-dark">
      {'★'.repeat(5 - Math.round(rating))}
    </span>
  </span>
)

const Reviews = () => (
  <>
    <NextSeo
      title="Detector Reviews"
      description="Hands-on metal detector and pinpointer reviews across every budget."
    />

    <Hero
      eyebrow="Tested in the dirt"
      title="Detector Reviews"
      subtitle="Hands-on impressions across budget, all-rounder and beach-specialist categories."
      size="sm"
    />

    <section className="max-w-content mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <div key={r.name} className="card p-6 flex gap-5">
            <div className="photo w-28 h-28 rounded-lg flex-shrink-0" />
            <div>
              <p className="eyebrow">{r.category}</p>
              <h2 className="text-xl text-forest-dark mt-1">{r.name}</h2>
              <div className="my-1 text-sm">
                <Stars rating={r.rating} />{' '}
                <span className="text-sepia-light">{r.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm">{r.blurb}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="mb-4 text-sepia-light">
          Not sure where to start? Our guide walks you through it.
        </p>
        <Link href="/guides/choosing-your-first-detector">
          <a className="btn-primary">Read: choosing your first detector</a>
        </Link>
      </div>
    </section>
  </>
)

export default Reviews
