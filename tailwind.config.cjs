/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "20": "repeat(20, minmax(0, 1fr))",
      }
    },
  },
  plugins: [],
}