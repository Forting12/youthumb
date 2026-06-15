// Banner used at the top of most pages. Uses a CSS "vintage photo"
// placeholder so the site renders fully without bundled imagery.
const Hero = ({ eyebrow, title, subtitle, children, size = 'lg' }) => (
  <section
    className={`photo ${size === 'sm' ? 'py-14' : 'py-20 md:py-28'}`}
  >
    <div className="absolute inset-0 bg-forest-darker opacity-50" />
    <div className="relative max-w-content mx-auto px-4 text-center text-parchment-light">
      {eyebrow && (
        <p className="uppercase tracking-widest text-xs font-semibold text-gold-light mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
)

export default Hero
