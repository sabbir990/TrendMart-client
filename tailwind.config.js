/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'mocondo' : ['Mocondo', 'Cursive'],
        'poppins' : ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}

