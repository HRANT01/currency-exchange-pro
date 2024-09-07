import img from '../currency-ecxhange/src/assets/CurBack.jpg'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back-image': "url('../currency-ecxhange/src/assets/CurBack.jpg')",
      }
    },
  },
  plugins: [],
}