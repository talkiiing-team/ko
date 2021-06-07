const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: {
        greedy: [/size-.*$/],
      },
    },
  },
  darkMode: false,
  theme: {
    container: {
      center: true,
    },
    extend: {
      inset: {
        '-full': '-100%',
      },
      gridTemplateColumns: {
        userRating: '3rem 2rem 1fr 3.5rem 4rem',
      },
      margin: {
        7.5: '1.8125rem',
      },
      boxShadow: {
        innerXl:
          'inset 0 3px 6px 0 rgba(0, 0, 0, 0.05), inset -1px -3px 4px 0 rgba(0, 0, 0, 0.04)',
        innerXxl:
          'inset 0 4px 6px 0 rgba(0, 0, 0, 0.08), inset -2px -4px 4px 0 rgba(0, 0, 0, 0.07)',
      },
      maxWidth: {
        xxs: '12rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const sizes = Object.fromEntries(
        Array.from({ length: 128 }, (_, i) => [
          `.size-${i + 1}`,
          {
            r: `${1.03125 + i * 0.03125}% !important`,
          },
        ])
      )
      return addUtilities(sizes)
    }),
  ],
}
