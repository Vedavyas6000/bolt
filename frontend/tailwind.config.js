/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          yellow: '#facc15',
          green: '#22c55e',
          blue: '#3b82f6',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
        'float-slow': 'float-slow 10s ease-in-out infinite 4s',
        'slide-down': 'slide-down 8s linear infinite',
        'slide-down-delayed': 'slide-down-delayed 8s linear infinite 4s',
        'fade-in-out': 'fade-in-out 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(-5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'slide-down-delayed': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'fade-in-out': {
          '0%, 100%': { opacity: '0', transform: 'translateY(10px)' },
          '10%, 90%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.3)' },
        },
      },
      boxShadow: {
        'neon': '0 0 30px rgba(255, 255, 0, 0.3), 0 0 60px rgba(0, 255, 0, 0.2), 0 0 90px rgba(0, 150, 255, 0.1)',
        'neon-sm': '0 0 15px rgba(255, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
