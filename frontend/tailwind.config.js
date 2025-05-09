/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medantra: {
          // Primary brand colors
          primary: {
            50: '#ebf9f8',
            100: '#c6ede9',
            200: '#9fe1da',
            300: '#75d4ca',
            400: '#4cc8ba',
            500: '#2cbcac',
            600: '#0f766e', // Main primary
            700: '#0d5f58',
            800: '#0a4842',
            900: '#07302c',
          },
          // Secondary colors - a complementary warmer teal/turquoise palette
          secondary: {
            50: '#effcf6',
            100: '#d0f5e6',
            200: '#a4ead0',
            300: '#6dd9b6',
            400: '#40c39e',
            500: '#2ca58a', // Main secondary
            600: '#208573',
            700: '#1a6b5c',
            800: '#155145',
            900: '#0e3b33',
          },
          // Success, warning, error states
          success: '#059669',
          warning: '#ca8a04',
          error: '#dc2626',
          // Neutral shades for backgrounds, text, etc.
          neutral: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          }
        }
      },
      spacing: {
        '4xs': '0.125rem', // 2px
        '3xs': '0.25rem',  // 4px
        '2xs': '0.375rem', // 6px
        'xs': '0.5rem',    // 8px
        'sm': '0.75rem',   // 12px
        'md': '1rem',      // 16px
        'lg': '1.25rem',   // 20px
        'xl': '1.5rem',    // 24px
        '2xl': '2rem',     // 32px
        '3xl': '2.5rem',   // 40px
        '4xl': '3rem',     // 48px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}