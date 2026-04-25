/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#ff6a1a',
          dim: '#cc4f0d',
          glow: '#ff8a4d'
        },
        carbon: {
          950: '#0a0a0c',
          900: '#111114',
          850: '#16161b',
          800: '#1c1c22',
          700: '#26262e',
          600: '#33333d'
        }
      },
      fontFamily: {
        display: ['"Rajdhani"', '"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(255,106,26,0.45), 0 10px 28px -10px rgba(255,106,26,0.55)'
      }
    }
  },
  plugins: []
}
