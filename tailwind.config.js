/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              darkBackground: '#1a2837',
              lightBackground: '#223548',
              primary: '#522bc2',
          },
      },
  },
  plugins: [],
}
