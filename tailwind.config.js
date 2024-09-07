/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Используем 'class' для управления темой
  theme: {
    extend: {
      colors: {
        customDark: '#2b3844',
        customLight: '#fafafa',
        customDarkMain: '#202c36',
      },
      width: {
        '480px': '30rem',
      },
      fontFamily: {
        nunito: ['Nunito Sans ', 'sans-serif'], // Добавляем шрифт Roboto
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["winter", "night"],
  },
}
