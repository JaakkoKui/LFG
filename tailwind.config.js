/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,ts}", "./src/App.vue"],
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
