/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        card: '#18181b', // zinc-900
        primary: {
          DEFAULT: '#10b981', // emerald-500
          hover: '#059669', // emerald-600
          light: '#34d399', // emerald-400
        },
        secondary: '#06b6d4', // cyan-500
        warning: '#f59e0b', // amber-500
        destructive: '#ef4444', // red-500
        muted: '#27272a', // zinc-800
        border: '#3f3f46', // zinc-700
        textPrimary: '#f4f4f5', // zinc-100
        textSecondary: '#a1a1aa', // zinc-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
