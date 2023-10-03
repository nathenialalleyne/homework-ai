import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        move: {
          "0%": { left: "-50%" },
          "100%": { left: "100%" },
        
        }
      },

      animation: {
        move: "move 20s linear infinite",
      }
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    }
  },
  plugins: [],
} satisfies Config;
