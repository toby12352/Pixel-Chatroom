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
        'phone-image' : "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e87200d-b797-41be-b0ad-d7e46bb59e87/d2xm6sb-884c42c1-2d7d-401b-8ee2-e5d4397a648f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdlODcyMDBkLWI3OTctNDFiZS1iMGFkLWQ3ZTQ2YmI1OWU4N1wvZDJ4bTZzYi04ODRjNDJjMS0yZDdkLTQwMWItOGVlMi1lNWQ0Mzk3YTY0OGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qk-bwYeLzCmAXaf-OxhnjaChEfY0kwFZBUDT13BDcs4')"
      }
    },
  },
  plugins: [],
}