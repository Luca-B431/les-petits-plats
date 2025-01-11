/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      yellow: '#FFD15B',
    },
    extend: {
      fontFamily: {
        Manrope: ['Manrope', 'serif'],
      },
    },
  },
  plugins: [],
};
