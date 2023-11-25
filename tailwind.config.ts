import { type Config } from "tailwindcss";
import colors from 'tailwindcss/colors'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-poppins)']
      }
    },
    colors: {
      ...colors,
      primary: '#00FF8F',
      secondary: '#00A1FF',
      dark: '#101010'

    }
  },
  plugins: [require('tailwind-scrollbar'),],
} satisfies Config;
