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
          deep: 'var(--bg-deep, #070503)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3, #2C2418)',
          4: 'var(--surface-4, #3A2F1E)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hot: 'var(--accent-hot)',
          ember: '#D97706',
        },
        appText: {
          DEFAULT: 'var(--text)',
          bright: 'var(--text-bright)',
          muted: 'var(--text-muted, rgba(254, 243, 199, 0.60))',
          dim: 'var(--text-dim, rgba(254, 243, 199, 0.35))',
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
