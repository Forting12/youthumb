import { useState, useRef } from 'react'
import { NextSeo } from 'next-seo'
import { coinResults } from '../lib/data'

const STATUS = { IDLE: 'idle', ANALYZING: 'analyzing', DONE: 'done' }

const CoinIdentifier = () => {
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [visible, setVisible] = useState(3)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setStatus(STATUS.ANALYZING)
    setVisible(3)
    // Simulated AI analysis — a real build would POST the image to a model.
    setTimeout(() => setStatus(STATUS.DONE), 1600)
  }

  const onInputChange = (e) => handleFile(e.target.files && e.target.files[0])

  const onDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0])
  }

  const reset = () => {
    setPreview(null)
    setStatus(STATUS.IDLE)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <NextSeo
        title="Coin Identifier"
        description="Upload a photo of a coin and our identifier matches it to an era, type and rough value."
      />

      {/* Upload hero */}
      <section className="photo py-20 md:py-24">
        <div className="absolute inset-0 bg-forest-darker opacity-50" />
        <div className="relative max-w-content mx-auto px-4 text-center text-parchment-light">
          <p className="uppercase tracking-widest text-xs font-semibold text-gold-light mb-3">
            Instant coin ID
          </p>
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">
            Coin Identifier
          </h1>
          <p className="mt-3 opacity-90">
            Upload a photo of your coin and let the identifier do the rest.
          </p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="mt-8 max-w-xl mx-auto"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />

            {!preview ? (
              <button
                onClick={() => inputRef.current && inputRef.current.click()}
                className="w-full border-2 border-dashed border-parchment-light/70 rounded-xl py-12 px-6 bg-forest-darker/40 hover:bg-forest-darker/60 transition flex flex-col items-center gap-3"
              >
                <span className="w-14 h-14 rounded-full bg-forest flex items-center justify-center">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#faf6ec" strokeWidth="1.8">
                    <path d="M3 9a2 2 0 012-2h2l1.5-2h7L18 7h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </span>
                <span className="text-lg font-semibold">+ Choose photo</span>
                <span className="text-sm opacity-80">
                  or drag &amp; drop · JPG or PNG
                </span>
              </button>
            ) : (
              <div className="bg-forest-darker/50 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Coin to identify"
                  className="w-32 h-32 object-cover rounded-lg border border-parchment-light/40"
                />
                <div className="flex-grow text-left">
                  {status === STATUS.ANALYZING ? (
                    <p className="font-semibold flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-gold-light border-t-transparent rounded-full animate-spin" />
                      Analyzing your coin…
                    </p>
                  ) : (
                    <p className="font-semibold text-gold-light">
                      Match found — see results below
                    </p>
                  )}
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => inputRef.current && inputRef.current.click()}
                      className="btn-gold text-sm py-2 px-4"
                    >
                      Try another
                    </button>
                    <button onClick={reset} className="btn-outline text-sm py-2 px-4">
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works (shown before any upload) */}
      {status === STATUS.IDLE && (
        <section className="max-w-content mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[
              { n: '1', t: 'Snap a picture', d: 'Photograph the coin on a plain background in good light.' },
              { n: '2', t: 'Upload it', d: 'Drop the photo in above — both sides help accuracy.' },
              { n: '3', t: 'Get results', d: 'See likely matches with era, metal and rough value.' },
            ].map((s) => (
              <div key={s.n}>
                <div className="coin w-12 h-12 mx-auto flex items-center justify-center font-serif font-bold text-sepia-dark text-lg">
                  {s.n}
                </div>
                <h3 className="text-lg text-forest-dark mt-4 mb-1">{s.t}</h3>
                <p className="text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {status === STATUS.DONE && (
        <section className="max-w-content mx-auto px-4 py-16">
          <h2 className="text-3xl text-forest-dark mb-2">Coin ID Results</h2>
          <p className="text-sepia-light mb-8">
            Ranked by match confidence. Always verify high-value coins with an
            expert.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coinResults.slice(0, visible).map((coin) => (
              <div key={coin.name} className="card overflow-hidden">
                <div className="photo h-40 flex items-center justify-center">
                  <div className="coin w-24 h-24 relative z-10 shadow-lg" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg text-forest-dark leading-tight">
                      {coin.name}
                    </h3>
                    <span className="text-xs font-semibold bg-forest text-parchment-light rounded-full px-2 py-0.5 whitespace-nowrap">
                      {Math.round(coin.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-sm text-sepia-light mt-1">{coin.detail}</p>
                  <p className="text-sm mt-2">{coin.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          {visible < coinResults.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisible((v) => v + 3)}
                className="btn-primary"
              >
                View more results →
              </button>
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default CoinIdentifier
