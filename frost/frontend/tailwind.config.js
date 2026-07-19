/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', '"Segoe UI"', "sans-serif"],
      },
      colors: {
        frost: {
          50: "#f3f8fb",
          100: "#e4f0f7",
          200: "#c5dcea",
          300: "#95bfd6",
          400: "#5f97b8",
          500: "#3d7899",
          600: "#2f5f7a",
          700: "#274d63",
          800: "#224053",
          900: "#1a3140",
        },
      },
      boxShadow: {
        panel: "0 18px 50px -28px rgba(26, 49, 64, 0.35)",
        soft: "0 10px 30px -18px rgba(26, 49, 64, 0.28)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 420ms ease-out both",
        fadeIn: "fadeIn 280ms ease-out both",
      },
    },
  },
  plugins: [],
};
