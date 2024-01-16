/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '320px',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      colors: {
        primary: '#00FF8F',
        secondary: '#00A1FF',
        dark: {
          50: '#282828',
          100: '#101010',
          200: '#0e0e0e',
          300: '#0d0d0d',
          400: '#0b0b0b',
          500: '#0a0a0a',
          600: '#080808',
          700: '#060606',
          800: '#050505',
          900: '#030303',
        },
        slightlyDark: '#1d1d1d',
        lighterDark: '#2a2a2a',
        lighter: '#505050',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
}
