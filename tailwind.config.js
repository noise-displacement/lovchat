/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        "dark-red": "#274B4B",
        "light-red": "#DFF0E4",
        "light-grey": "#F0F0F0",
        "grey": "#606060"
     },

     fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "serif": ["Merriweather", "serif"]
     },
    },
  },
  plugins: [],
};
