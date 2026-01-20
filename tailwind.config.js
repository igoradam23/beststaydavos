/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#b8860b',
          light: '#d4a843',
          dark: '#8b6914',
        },
        champagne: '#f9f6f1',
        charcoal: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
