module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '6xl': '2.5rem',
      },
      colors: {
        'vision-blue': '#1e3a8a',
        'vision-light-blue': '#084D79',
        'vision-lighter-blue': '#0B5A8C',
        'vision-yellow': '#FFC107',
        'vision-light-yellow': '#FFC822',
        'vision-lighter-yellow': '#FFD862',
        'vision-sky': '#007AD9',
        'vision-light-sky': '#1E8CE1',
        'vision-lighter-sky': '#5AAFF1',
        'vision-green': '#4CAF50',
        'vision-light-green': '#58C05C',
        'vision-lighter-green': '#64CF68',
        'vision-cyan': '#008C8C'
      },
      scale: {
        '25': '0.25',
        '30': '0.30'
      }
    },
  },
  plugins: [],
}
