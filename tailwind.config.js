/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              darkBackground: '#1a2837',
              primary: '#522bc2',
          },
      },
  },
  plugins: [],
}
