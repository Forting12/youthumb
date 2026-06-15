import { useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Hero from '../components/Hero'
import { forumCategories } from '../lib/data'

const Forum = () => {
  const [query, setQuery] = useState('')

  const sections = forumCategories
    .map((section) => ({
      ...section,
      boards: section.boards.filter((b) =>
        (b.title + b.description).toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.boards.length > 0)

  return (
    <>
      <NextSeo
        title="Treasure Hunting Forum"
        description="Ask questions, share finds and trade tips with the treasure hunting community."
      />

      <Hero
        eyebrow="Community"
        title="Treasure Hunting Forum"
        subtitle="Join the conversation — ask questions, share your finds and learn from hunters near you."
        size="sm"
      />

      <div className="max-w-content mx-auto px-4 py-10">
        {/* Breadcrumb + search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <p className="text-sm text-sepia-light">
            <Link href="/" className="hover:text-forest">
              Home
            </Link>{' '}
            <span className="mx-1">/</span> Forums
          </p>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search forums…"
              className="flex-grow md:w-72 px-4 py-2 rounded border border-parchment-dark bg-parchment-light focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <button className="btn-primary py-2">New post</button>
          </div>
        </div>

        {/* Category sections */}
        <div className="space-y-8">
          {sections.length === 0 && (
            <p className="text-center text-sepia-light py-12">
              No boards match “{query}”.
            </p>
          )}
          {sections.map((section) => (
            <div key={section.section} className="card overflow-hidden">
              <div className="bg-forest text-parchment-light px-5 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{section.section}</h2>
                <span className="text-xs uppercase tracking-wider opacity-80 hidden sm:flex gap-8">
                  <span className="w-24 text-center">Topics / Posts</span>
                  <span className="w-40 text-right">Last post</span>
                </span>
              </div>
              <ul className="divide-y divide-parchment-dark">
                {section.boards.map((board) => (
                  <li
                    key={board.title}
                    className="px-5 py-4 flex items-center gap-4 hover:bg-parchment-dark/40 transition"
                  >
                    <div className="coin w-10 h-10 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <Link
                        href="/forum"
                        className="font-semibold text-forest-dark hover:text-forest"
                      >
                        {board.title}
                      </Link>
                      <p className="text-sm text-sepia-light truncate">
                        {board.description}
                      </p>
                    </div>
                    <div className="hidden sm:block w-24 text-center text-sm">
                      <div className="font-semibold text-sepia-dark">
                        {board.topics.toLocaleString()}
                      </div>
                      <div className="text-xs text-sepia-light">
                        {board.posts.toLocaleString()} posts
                      </div>
                    </div>
                    <div className="hidden sm:block w-40 text-right text-sm">
                      <div className="text-sepia-dark truncate">
                        {board.last.title}
                      </div>
                      <div className="text-xs text-sepia-light">
                        {board.last.author} · {board.last.when}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Forum
