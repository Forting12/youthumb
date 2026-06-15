// Compass-style mark used in the header and footer.
const Logo = ({ className = '', light = false }) => (
  <span className={`inline-flex items-center ${className}`}>
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="20" cy="20" r="18" fill="#3d4a2c" stroke="#c19a4b" strokeWidth="2" />
      <path d="M20 8 L24 20 L20 32 L16 20 Z" fill="#c19a4b" />
      <path d="M8 20 L20 16 L32 20 L20 24 Z" fill="#e7dcc7" opacity="0.85" />
      <circle cx="20" cy="20" r="2.5" fill="#3d4a2c" />
    </svg>
    <span
      className={`ml-2 font-serif font-bold text-lg tracking-wide ${
        light ? 'text-parchment-light' : 'text-forest-dark'
      }`}
    >
      RelicQuest
    </span>
  </span>
)

export default Logo
