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
      dark: '#101010',
      slightlyDark: '#1d1d1d',
      lighterDark: '#2a2a2a'
    },
    screens:{
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1536px',
      
    }
  },
  plugins: [require('tailwind-scrollbar'),],
} satisfies Config;
