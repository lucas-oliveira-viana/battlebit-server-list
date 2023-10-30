/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'semi-transparent': 'rgba(255,255,255,0.09)',
      },
    },
  },
  plugins: [],
};
