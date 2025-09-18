/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors : {
        bgСolor: '#00BFFF',
        formСolor: '#F6F7FC',
        inputColor: '#EEF7FB'
        // inputColor: '#E8F1FD'
      }
    },
  },
  plugins: [],
}
