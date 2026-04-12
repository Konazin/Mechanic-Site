/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          900: '#2e2e22',
          800: '#3a3a2a',
          700: '#4a4a38',
          600: '#5c5c47',
          500: '#6e6e55',
          400: '#8a8a6a',
          200: '#c8c8a0',
          100: '#e8e8d0',
        },
        surface: '#d8d8c8',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
