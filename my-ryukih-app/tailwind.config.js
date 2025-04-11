/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Outfit': ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#fb6107',
        background: '#023047',
        text: '#f2cc8f',
        card: '#1b2a33',
      },
    },
  },
  plugins: [],
};