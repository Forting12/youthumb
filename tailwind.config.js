module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#faf6ec',
          DEFAULT: '#f3ece0',
          dark: '#e7dcc7',
        },
        forest: {
          light: '#7c8a5a',
          DEFAULT: '#5b6b3f',
          dark: '#3d4a2c',
          darker: '#2c3520',
        },
        sepia: {
          light: '#8a7656',
          DEFAULT: '#5a4a34',
          dark: '#3b3022',
        },
        gold: {
          light: '#d9b96a',
          DEFAULT: '#c19a4b',
          dark: '#9a7836',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Source Sans Pro"', 'system-ui', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
