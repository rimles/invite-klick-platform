/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // System A — Invite Klick platform identity (stable, never
        // recolored by individual event themes). Event colors are applied
        // dynamically via --event-* CSS variables instead — see
        // src/theme/tokens.ts.
        burgundy: '#482337',
        ivory: '#FBF8F5',
        cream: '#F4EFE9',
        charcoal: '#241A1C',
        'text-secondary': '#6F6467',
        'text-muted': '#9A8F91',
        'soft-border': '#E9E1D8',
        blush: '#F1D9DD',
        champagne: '#EADFCF',
      },
    },
  },
  plugins: [],
};
