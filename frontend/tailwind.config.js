/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          300: "#235789",
          500: "#0b5563"
        },
        burgundy: {
          300: "#660000",
          500: "#990033",
          700: "#5f021f",
          900: "8c001a"
        }
      },
      fontFamily: {
        sans: ["Inter"],
        body: ["Inter"],
      }
    },
  },
  plugins: [],
});
