/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0D0B08',
          deep: '#070503',
        },
        surface: {
          DEFAULT: '#181410',
          2: '#211B13',
          3: '#2C2418',
          4: '#3A2F1E',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hot: '#FBBF24',
          ember: '#D97706',
        },
        appText: {
          DEFAULT: '#FEF3C7',
          bright: '#FFFBEB',
          muted: 'rgba(254, 243, 199, 0.56)',
          dim: 'rgba(254, 243, 199, 0.32)',
        },
        jlpt: {
          n5: '#C084FC',
          n4: '#FB923C',
          n3: '#38BDF8',
          n2: '#4ADE80',
          n1: '#FBBF24',
        },
      },
      fontFamily: {
        ui: ['"DM Sans"', 'sans-serif'],
        jp: ['"BIZ UDGothic"', 'sans-serif'],
        display: ['"Shippori Mincho"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        DEFAULT: '14px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        glow: '0 4px 24px rgba(245, 158, 11, 0.30)',
        card: '0 1px 0 rgba(254, 243, 199, 0.04) inset, 0 8px 24px rgba(0, 0, 0, 0.40)',
      },
    },
  },
  plugins: [],
}
