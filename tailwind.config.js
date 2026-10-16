/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2A5B',
          deep: '#071A38',
          light: '#133D80',
          muted: '#204172',
        },
        teal: {
          DEFAULT: '#1BA6A6',
          dark: '#148080',
          light: '#25C4C4',
          glow: 'rgba(27, 166, 166, 0.15)',
        },
        surface: {
          light: '#F5F4F0',
          'light-cell': '#FFFFFF',
          dark: '#0A0C10',
          'dark-card': '#11151D',
          'dark-cell': '#141A24',
        },
        error: {
          DEFAULT: '#E5484D',
          light: '#FFEAEB',
          dark: '#381316',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E2BA5F',
        },
        cell: {
          border: 'rgba(11, 42, 91, 0.09)',
          'border-dark': 'rgba(255, 255, 255, 0.07)',
          header: '#ECEAE4',
          'header-dark': '#131822',
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"General Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Satoshi"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        display: '-0.03em',
        mono: '0.04em',
      },
      lineHeight: {
        tightest: '1.0',
        display: '1.05',
      },
      boxShadow: {
        'cell': 'inset 0 0 0 1px var(--cell-border)',
        'float': '0 20px 40px -15px rgba(11, 42, 91, 0.08)',
        'float-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
