import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f0f4f8',
          100: '#e4e7ec',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#374151',
          600: '#1f2937',
          700: '#111827',
          800: '#18181b',
          900: '#111827',
          950: '#0a0a0d',
          980: '#0f0f14',
          990: '#18181b',
        },
        gradient: {
          'ice-violet': 'from-indigo-500 via-purple-500 to-cyan-400',
          'obsidian': 'linear-gradient(135deg, #0B0F17 0%, #1a1f2e 100%)',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        ink-500: '#334155',
        ink-400: '#64748b',
        ink-300: '#94a3b8',
        ink-200: '#e2e8f0',
        ink-100: '#f1f5f9',
        ink-50: '#f8fafc',
        white: '#ffffff',
        white/10: 'rgba(255, 255, 255, 0.1)',
        white/5: 'rgba(255, 255, 255, 0.05)',
        destructive: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius-lg, 8px)',
        md: 'var(--radius-md, 6px)',
        sm: 'var(--radius-sm, 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-height)' },
          to: { height: 0 },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: 1 },
          '20%,50%': { opacity: 0 },
        },
        'collapsible-rotate': {
          from: { transform: 'rotate(-45deg)' },
          to: { transform: 'rotate(45deg)' },
        },
        'fade-in-up': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': {'background-position': '0% 50%'},
          '50%': {'background-position': '100% 50%'},
        },
        'shimmer': {
          from: {'background-position': '-200% center'},
          to: {'background-position': '200% center'},
        },
        'blob': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '100%': { transform: 'translate(-20px, 20px) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'gradient-x': 'gradient-x 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
