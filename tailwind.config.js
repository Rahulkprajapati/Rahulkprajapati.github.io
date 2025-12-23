/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#22D3EE',
          500: '#00D9FF',
          600: '#00B8D9',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
