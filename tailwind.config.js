/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        dark: {
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          950: '#060d1a',
        },
      },
    },
  },
  plugins: [],
};
