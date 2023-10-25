/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        "dark-red": "#4a0d0d",
        "light-red": "#E7473C",
        "light-grey": "#F0F0F0",
        "grey": "#606060"
     },
    },
  },
  plugins: [],
};
