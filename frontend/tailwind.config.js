/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        texture:
          "url('https://www.transparenttextures.com/patterns/black-thread.png')",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
    },
  },
  plugins: [],
};
