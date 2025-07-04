import { UIStyle } from '../types';

export const uiStyles: UIStyle[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'A minimalist design with clean lines and ample whitespace',
    preview: '/previews/modern-clean.png',
    tokens: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  {
    id: 'vibrant-bold',
    name: 'Vibrant Bold',
    description: 'Eye-catching colors with strong contrasts and bold typography',
    preview: '/previews/vibrant-bold.png',
    tokens: {
      colors: {
        primary: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
      },
      typography: {
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 600,
          semibold: 700,
          bold: 900,
        },
      },
    },
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    description: 'Gentle pastel colors with rounded corners and soft shadows',
    preview: '/previews/soft-pastel.png',
    tokens: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      shadows: {
        none: 'none',
        sm: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
        md: '0 6px 10px -2px rgb(0 0 0 / 0.08)',
        lg: '0 15px 20px -5px rgb(0 0 0 / 0.08)',
        xl: '0 25px 30px -8px rgb(0 0 0 / 0.1)',
        '2xl': '0 35px 60px -15px rgb(0 0 0 / 0.15)',
      },
    },
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Sleek dark theme with high contrast for modern applications',
    preview: '/previews/dark-mode.png',
    tokens: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        },
      },
    },
  },
  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    description: 'Traditional business-oriented design with conservative colors',
    preview: '/previews/corporate-professional.png',
    tokens: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
      },
      typography: {
        fontFamily: {
          sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
          serif: '"Merriweather", Georgia, serif',
          mono: '"IBM Plex Mono", Consolas, monospace',
        },
      },
    },
  },
  {
    id: 'playful-fun',
    name: 'Playful Fun',
    description: 'Energetic design with playful elements and vibrant colors',
    preview: '/previews/playful-fun.png',
    tokens: {
      colors: {
        primary: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        full: '9999px',
      },
    },
  },
];
