/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",'./node_modules/slick-carousel/**/*.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'], // Add Noto Sans as the primary sans-serif font
      },
      colors: {
        'custom-gray': '#333333',
        'soft-blue': '#A4C8E1',
        'custome-red':'#b60000',
        "custom-yellow":"#fffd92",
      },
      animation: {
        fadeInDown: 'fadeInDown 0.5s ease-in-out forwards',
        fadeOutUp: 'fadeOutUp 0.5s ease-in-out forwards', // Define the fadeInUp animation
      },
      keyframes: {
        fadeOutUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

