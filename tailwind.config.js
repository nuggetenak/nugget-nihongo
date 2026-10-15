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
          DEFAULT: 'var(--bg)',
          deep: 'var(--bg-deep, #0C0B0A)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3, #322D28)',
          4: 'var(--surface-4, #423B34)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hot: 'var(--accent-hot)',
          ember: '#D97706',
        },
        appText: {
          DEFAULT: 'var(--text)',
          bright: 'var(--text-bright)',
          muted: 'var(--text-muted, rgba(245, 239, 230, 0.68))',
          dim: 'var(--text-dim, rgba(245, 239, 230, 0.40))',
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
        card: '0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 8px 24px rgba(0, 0, 0, 0.40)',
      },
    },
  },
  plugins: [],
}
