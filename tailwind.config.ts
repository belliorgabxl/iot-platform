import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob:{
          '0%':{
            transform : "translate(10px,0px) scale(1)"
          },
          "33%": {
            transform:"translate(50px,-60px) scale(1.2)"
          },
          "66%" :{
            transform :"translate(-50px,60px) scale(0.8)",
          },
          "100%":{
            transform : "translate(10px,0px) scale(1)",
          }
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        fastFade : 'fadeIn 1s ease-in-out',
        fadeStep1: 'fadeIn 3s ease-in-out',
        fadeStep2: 'fadeIn 4s ease-in-out',
        blob:"blob 7s infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
