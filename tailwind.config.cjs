/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "20": "repeat(20, minmax(0, 1fr))",
      },
      minWidth: {
        7: "1.75rem",
        45: "15rem"
      },
      maxWidth: {
        45: "15rem"
      }
    },
  },
  plugins: [],
}
