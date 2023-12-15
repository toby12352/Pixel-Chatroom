/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel' : ['VT323', 'monospace'],
      },
      backgroundImage: {
        'custom-image' : "url('https://wallpaperaccess.com/full/2513430.png')",
      }
    },
  },
  plugins: [],
}