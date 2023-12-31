/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "370px",
      md: "768px",
      lg: "1024px"
    }
  },
  plugins: [],
}