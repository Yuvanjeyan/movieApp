/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'netflix-red': '#e50914',
        'netflix-black': '#0f0f0f',
        'netflix-gray': '#1a1a1a',
      },
      backgroundColor: {
        'dark-overlay': 'rgba(0, 0, 0, 0.9)',
      },
      spacing: {
        'gutter': '2rem',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
    },
  },
  plugins: [],
}
