/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cybermed: {
          dark: '#0f172a',
          teal: '#0d9488',
          cyan: '#06b6d4',
          alert: '#f97316',
          slate: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
