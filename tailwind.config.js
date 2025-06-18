/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2761FF'
      },
      textColor: {
        333: '#333',
        666: '#666',
        999: '#999',
        primary: '#2761FF'
      },
      fontSize: {
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px'
      }
    }
  },
  plugins: []
}
