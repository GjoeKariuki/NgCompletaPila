/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
      'bg-part': "url(frontend/src/assets/Landingpage.gif)"}
    },
  },
  plugins: [],
}

