import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom HealthSeva Color Palette
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary light blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Gentle teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        soft: {
          blue: '#60a5fa', // Soft blue
          pink: '#ec4899', // Soft pink
          lavender: '#c084fc', // Lavender
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b', // Dark navy for text
          900: '#0f172a',
          950: '#020617',
        },
        background: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tint: '#eff6ff',
        }
      },
      // Add perspective utilities
      perspective: {
        'none': 'none',
        '250': '250px',
        '500': '500px',
        '750': '750px',
        '1000': '1000px',
        '1500': '1500px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
        'gradient-soft': 'linear-gradient(135deg, #eff6ff 0%, #fdf4ff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fdf4ff 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(59, 130, 246, 0.1), 0 10px 20px -2px rgba(59, 130, 246, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(59, 130, 246, 0.15), 0 25px 50px -12px rgba(59, 130, 246, 0.1)',
        'soft-xl': '0 20px 60px -10px rgba(59, 130, 246, 0.2), 0 35px 80px -15px rgba(59, 130, 246, 0.15)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-accent': '0 0 20px rgba(20, 184, 166, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
