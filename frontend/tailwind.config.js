/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        thistle: "#e2cfea",
        amethyst: "#a06cd5",
        "royal-purple": "#6247aa",
        "prussian-blue": "#102b3f",
        "dark-green": "#062726",
        primary: {
          50: "#f5f3f7",
          100: "#e2cfea",
          200: "#d4b8e5",
          300: "#c6a1e0",
          400: "#b88adb",
          500: "#a06cd5",
          600: "#6247aa",
          700: "#4a3580",
          800: "#312356",
          900: "#102b3f",
          950: "#062726",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
