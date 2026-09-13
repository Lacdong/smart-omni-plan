/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#FAFAFB',
          tertiary: '#F1F5F9',
        },
        darkText: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        ai: {
          lavender: '#F5F3FF',
          border: '#DDD6FE',
          accent: '#8B5CF6',
        },
        semantic: {
          success: '#10B981',
          'success-bg': '#ECFDF5',
          warning: '#F59E0B',
          'warning-bg': '#FFFBEB',
          error: '#EF4444',
          'error-bg': '#FEF2F2',
          info: '#3B82F6',
          'info-bg': '#EFF6FF',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'control': '10px',
        'input': '12px',
        'button': '12px',
        'card': '16px',
        'container': '20px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'glass': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'ai-glow': '0 0 25px rgba(124, 58, 237, 0.18)',
      },
      backdropBlur: {
        'glass-std': '12px',
        'glass-heavy': '20px',
      }
    },
  },
  plugins: [],
}
