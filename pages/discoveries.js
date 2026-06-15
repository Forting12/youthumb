import { NextSeo } from 'next-seo'
import Hero from '../components/Hero'
import { discoveries } from '../lib/data'

// A few extra entries so the gallery feels populated.
const gallery = [
  ...discoveries,
  { title: 'Bronze-age axe head in plough soil', meta: 'Field find · Yorkshire' },
  { title: 'Silver three-cent piece at the schoolhouse', meta: 'Coin hunt · Ohio' },
  { title: 'Trade token from a vanished saloon', meta: 'Relic hunt · Montana' },
  { title: 'Worn gold band beneath the boardwalk', meta: 'Beach hunt · New Jersey' },
]

const Discoveries = () => (
  <>
    <NextSeo
      title="Discoveries"
      description="A gallery of recent finds shared by the RelicQuest community."
    />

    <Hero
      eyebrow="From the field"
      title="Latest Discoveries"
      subtitle="Recent finds shared by the community — coins, relics and the occasional glint of gold."
      size="sm"
    />

    <section className="max-w-content mx-auto px-4 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((d, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="photo h-44" />
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
    </section>
  </>
)

export default Discoveries
