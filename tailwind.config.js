/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#000000', // Tambahkan warna hitam penuh
      },
    },
  },
  plugins: [],
}