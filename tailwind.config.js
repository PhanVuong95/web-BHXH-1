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
      fontSize: {
        responsive: "clamp(1rem, 5vw, 2rem)",
        sm: "0.875rem", // 14px
        md: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "2.5rem", // 40px
      },
    },
  },
  plugins: [],
};
