import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Hero from '../components/Hero'

const About = () => (
  <>
    <NextSeo
      title="About"
      description="RelicQuest is a community and toolkit for metal detecting, coin identification and treasure hunting."
    />

    <Hero
      eyebrow="Who we are"
      title="About RelicQuest"
      subtitle="A community and toolkit for everyone who loves the thrill of the dig."
      size="sm"
    />

    <section className="max-w-3xl mx-auto px-4 py-12 prose-treasure">
      <p>
        RelicQuest started as a small forum where detectorists swapped tips and
        showed off their finds. It grew into a full field companion: an AI coin
        identifier, in-depth guides, honest gear reviews and an active
        community.
      </p>
      <h2>What you'll find here</h2>
      <ul>
        <li>
          <strong>Coin Identifier</strong> — upload a photo and get an instant
          match with era, metal and rough value.
        </li>
        <li>
          <strong>Field Guides</strong> — research, ground reading and recovery
          techniques from experienced hunters.
        </li>
        <li>
          <strong>Reviews</strong> — hands-on impressions of detectors and
          pinpointers across every budget.
        </li>
        <li>
          <strong>Community Forum</strong> — ask questions, share discoveries
          and learn the local hot spots.
        </li>
      </ul>
      <h2>Hunt responsibly</h2>
      <p>
        We believe in good stewardship: get permission, fill your holes, pack
        out trash and report significant historical finds. Responsible hunting
        keeps sites open for everyone who follows.
      </p>
    </section>

    <section className="max-w-content mx-auto px-4 pb-16 text-center">
      <Link href="/coin-identifier">
        <a className="btn-gold">Try the Coin Identifier</a>
      </Link>
    </section>
  </>
)

export default About
