/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8B67A',
          dark: '#C99556',
          50: '#FFF8F0',
          100: '#FFEFD9',
          500: '#E8B67A',
          600: '#C99556',
          700: '#A67843',
        },
      },
    },
  },
  plugins: [],
}