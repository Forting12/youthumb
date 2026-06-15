import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './Logo'
import { navItems } from '../lib/data'

const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)

  return (
    <header className="bg-forest-dark sticky top-0 z-50 shadow-md">
      <div className="max-w-content mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center" aria-label="RelicQuest home">
              <Logo light />
            </a>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`nav-link ${
                    isActive(item.href)
                      ? 'opacity-100 border-b-2 border-gold pb-0.5'
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/coin-identifier">
              <a className="btn-gold text-sm py-2 px-4">Join free</a>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-parchment-light p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-forest-darker px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`block py-2 nav-link ${
                  isActive(item.href) ? 'opacity-100 text-gold-light' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </Link>
          ))}
          <Link href="/coin-identifier">
            <a className="btn-gold w-full mt-2" onClick={() => setOpen(false)}>
              Join free
            </a>
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
