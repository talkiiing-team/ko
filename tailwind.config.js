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
      boxShadow: {
        innerXl:
          'inset 0 3px 6px 0 rgba(0, 0, 0, 0.05), inset -1px -3px 4px 0 rgba(0, 0, 0, 0.04)',
        innerXxl:
          'inset 0 4px 6px 0 rgba(0, 0, 0, 0.08), inset -2px -4px 4px 0 rgba(0, 0, 0, 0.07)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
