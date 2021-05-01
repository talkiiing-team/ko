module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        userRating: '4rem 2rem 2fr 2fr 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
