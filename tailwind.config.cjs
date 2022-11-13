/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a2837',
        lightBackground: '#223548',
        primary: '#522bc2',
        primaryDark: '#4926AE',
      },
    },
  },
  plugins: [],
}
