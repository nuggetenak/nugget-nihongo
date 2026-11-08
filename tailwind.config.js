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
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text)',
        },
        border: {
          DEFAULT: 'var(--border-theme)',
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
        nippon: {
          kohaku: '#D97706',       // 琥珀 - Amber Gold
          tokiwa: '#059669',       // 常磐 - Evergreen Pine / Success
          shu: '#DC2626',          // 朱色 - Torii Vermilion / Streak
          'edo-indigo': '#2563EB', // 江戸藍 - Edo Indigo / Audio
          fuji: '#7C3AED',         // 藤紫 - Wisteria Purple / Keigo
          gofun: '#FAF7F2',        // 白粉 - Washi Rice Paper
          sumi: '#1C150E',         // 墨 - Deep Sumi Ink
          sakura: '#F472B6',       // 桜 - Cherry Blossom Pink
        },
        theme: {
          DEFAULT: 'var(--border-theme)',
          primary: 'var(--theme-primary)',
          'primary-hover': 'var(--theme-primary-hover)',
        },
        muted: 'var(--text-muted)',
      },
      borderColor: {
        border: 'var(--border-theme)',
        theme: 'var(--border-theme)',
        'theme-primary': 'var(--theme-primary)',
      },
      fontFamily: {
        ui: ['"DM Sans"', 'sans-serif'],
        jp: ['"BIZ UDGothic"', 'sans-serif'],
        japanese: ['"BIZ UDGothic"', 'sans-serif'],
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
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        zoomIn95: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        bouncePop: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slotSnap: {
          '0%': { transform: 'scale(0.85) translateY(4px)' },
          '70%': { transform: 'scale(1.04) translateY(-1px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        petalBloom: {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        pageEnter: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'shimmer-flow': 'shimmer 1.8s infinite linear',
        'fade-in': 'fadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'zoom-in-95': 'zoomIn95 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-gentle': 'floatGentle 3s ease-in-out infinite',
        'bounce-pop': 'bouncePop 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'slot-snap': 'slotSnap 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'petal-bloom': 'petalBloom 450ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'page-enter': 'pageEnter 220ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
