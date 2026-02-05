/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "Cairo", "sans-serif"],
        body: ["Cairo", "Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
