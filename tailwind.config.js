/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'pixel': '1px 1px 0 #000, 2px 1px 0 #000, 1px 2px 0 #000, 2px 2px 0 #000',
      },
      fontFamily: {
        'pixel' : ['VT323', 'monospace'],
      },
      backgroundImage: {
        'custom-image' : "url('https://wallpaperaccess.com/full/2513430.png')"
      }
    },
  },
  plugins: [],
}