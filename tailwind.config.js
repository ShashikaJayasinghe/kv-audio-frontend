/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#FBFBFB",    //60%
        secondary : "#E8F9FF",    //30%
        accent : "#3674B5"    //10%
      }
    },
  },
  plugins: [],
}