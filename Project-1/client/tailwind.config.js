/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryWhite:"#F0F2F5",
        primaryBlue:"#1877F2",
        primaryGreen:"#42B72A",
        textPrimary:"#1877F2",
        textSecondary:"#505255"
      }
    },
  },
  plugins: [],
}