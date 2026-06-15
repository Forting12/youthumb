import Link from 'next/link'
import Logo from './Logo'
import { footerColumns } from '../lib/data'

const socials = [
  { label: 'Facebook', path: 'M13 22v-8h3l1-4h-4V8c0-1.1.4-2 2-2h2V2.1C18.3 2 17 2 16 2c-3 0-5 1.8-5 5.2V10H8v4h3v8h2z' },
  { label: 'Twitter', path: 'M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.5c0 .3 0 .6.1.9A11.4 11.4 0 0 1 3.8 5a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.8.1.5 1.6 2 2.7 3.7 2.8A8 8 0 0 1 2 18.6 11.3 11.3 0 0 0 8.1 20c7 0 10.9-5.9 10.9-11v-.5c.8-.5 1.4-1.2 2-2z' },
  { label: 'YouTube', path: 'M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5C1.6 10.4 1.6 12 1.6 12s0 1.6.4 3.5a3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-3.5.4-3.5s0-1.6-.4-3.5zM10 15V9l5 3-5 3z' },
  { label: 'Instagram', path: 'M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4zm0 7.6A3 3 0 1 1 12 9a3 3 0 0 1 0 6zm5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 7.9c0-1.6-.4-3-1.5-4.1S17 2.3 15.4 2.2C13.8 2.1 10.2 2.1 8.6 2.2 7 2.3 5.6 2.7 4.5 3.8S2.8 6.3 2.7 7.9C2.6 9.5 2.6 13.1 2.7 14.7c.1 1.6.5 3 1.6 4.1s2.5 1.5 4.1 1.6c1.6.1 5.2.1 6.8 0 1.6-.1 3-.5 4.1-1.6s1.5-2.5 1.6-4.1c.1-1.6.1-5.2 0-6.8z' },
]

const Footer = () => (
  <footer className="bg-forest-darker text-parchment/90 mt-16">
    <div className="max-w-content mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Logo light />
          <p className="mt-3 text-sm opacity-80 max-w-xs">
            Your field companion for metal detecting, coin ID and treasure
            hunting know-how.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className="text-gold-light font-semibold mb-3">{col.heading}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <a className="opacity-80 hover:opacity-100 hover:text-gold-light transition">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-forest-dark mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} RelicQuest. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="opacity-70 hover:opacity-100 hover:text-gold-light transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
