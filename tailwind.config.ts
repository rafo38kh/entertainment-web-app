import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "carousel-move": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      colors: {
        movieRed: "#FC4747",
        movieDarkBlue: "#10141E",
        movieGreyishBlue: "#5A698F",
        semiDarkBlue: "#161D2F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow-3": "pulse 3s linear infinite",
        "pulse-slow-5": "pulse 5s linear infinite",
        "carousel-move": "carousel-move var(--duration,80s) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
