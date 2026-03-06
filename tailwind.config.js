/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        indigo: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      backgroundImage: {
        'hero-light': [
          'radial-gradient(ellipse at 15% 15%, rgba(168,85,247,0.12) 0%, transparent 55%)',
          'radial-gradient(ellipse at 85% 10%, rgba(99,102,241,0.10) 0%, transparent 50%)',
          'radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.07) 0%, transparent 55%)',
          'linear-gradient(160deg, #faf5ff 0%, #ffffff 40%, #eef2ff 100%)',
        ].join(', '),
      },
      boxShadow: {
        'glow':      '0 0 40px rgba(168,85,247,0.20)',
        'glow-lg':   '0 0 80px rgba(168,85,247,0.26)',
        'card':      '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05)',
        'card-hover':'0 8px 48px rgba(168,85,247,0.18), 0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        float:         'float 9s ease-in-out infinite',
        floatAlt:      'floatAlt 11s ease-in-out infinite',
        floatSlow:     'floatSlow 13s ease-in-out infinite',
        pulseSoft:     'pulseSoft 4s ease-in-out infinite',
        shimmer:       'shimmer 3s linear infinite',
        gradientShift: 'gradientShift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-20px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-9px) rotate(-1.5deg)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '40%':      { transform: 'translateY(-16px) rotate(-2deg)' },
          '70%':      { transform: 'translateY(-28px) rotate(1deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%':      { transform: 'translateY(-22px) translateX(12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '0.95' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};