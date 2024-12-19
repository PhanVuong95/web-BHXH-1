/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        sm1: "10px",
      },
    },
    extend: {
      screens: {
        lg1130: "1130px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "2560px",
      },
    },
  },
  plugins: [],
};
