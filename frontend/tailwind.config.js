/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        texture:
          "url('https://www.transparenttextures.com/patterns/black-thread.png')",
        bg1: "url('./bg-1.avif')",
        bg2: "url('./bg-2.avif')",
        bglogin: "url('./bg-login.jpg')",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
    },
  },
  plugins: [],
};
