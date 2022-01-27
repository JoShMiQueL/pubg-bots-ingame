module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        app: {
          primary: '#333B4E',
          secondary: '#252C3E',
          'btn-primary': '#235BEE',
          'btn-primary-hover': '#3268F6',
          'btn-primary-active': '#1955F3'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
