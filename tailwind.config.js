/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        thBlack: '#211f20',
        thGray: '#75767a',
        thPurple: '#67545a',
        thGold: '#ddab53',
        thUmber: '#a06b2b',
      },
    },
  },
  plugins: [],
}
