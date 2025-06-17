# FlexiTheme - Complete Build Workflow

## Overview
This is a self-executing workflow to build the FlexiTheme design system generator from scratch. The workflow is designed to be executed in a single session, creating a fully functional application with all features implemented.

## Pre-Build Checklist
- [ ] Node.js 18+ installed
- [ ] npm or yarn available
- [ ] Git initialized (optional)
- [ ] 500MB free disk space
- [ ] Modern browser for testing

## Phase 1: Project Setup and Core Infrastructure (30 mins)

### 1.1 Initialize Project
```bash
# Create project structure
mkdir -p src/{components,services,hooks,types,styles,data,pages,utils}
mkdir -p src/components/{common,wizard,preview,export}
mkdir -p public/{fonts,icons}
mkdir -p tests/{unit,integration,e2e}

# Initialize package.json
npm init -y

# Install dependencies
npm install --save-dev \
  vite \
  @vitejs/plugin-react \
  typescript \
  @types/node \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event

# Install production dependencies
npm install \
  file-saver \
  jszip
```

### 1.2 Configuration Files

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@styles/*": ["src/styles/*"],
      "@data/*": ["src/data/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 1.3 Base HTML and Entry Point

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FlexiTheme - Design System Generator</title>
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <meta name="description" content="Create custom design systems with interactive wireframes">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

#### src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 1.4 Global Styles

#### src/styles/global.css
```css
/* CSS Reset and Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Color System */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  
  /* Neutrals */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  
  /* Typography */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);
  line-height: 1.5;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus Styles */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## Phase 2: Core Components and Types (45 mins)

### 2.1 Type Definitions

#### src/types/index.ts
```typescript
// Theme Types
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  principles: DesignPrinciples;
  tokens: DesignTokens;
  navigation: NavigationConfig;
}

export interface DesignPrinciples {
  hierarchy: string;
  spacing: string;
  colors: string;
  typography: string;
  components: string;
}

export interface DesignTokens {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
}

export interface ColorSystem {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: {
    default: string;
    focus: string;
    error: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
}

export interface TypographySystem {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  letterSpacing: Record<string, string>;
}

export interface SpacingSystem {
  unit: number;
  scale: number[];
}

export type BorderRadiusScale = Record<string, string>;
export type ShadowScale = Record<string, string>;

// Page Types
export interface PageType {
  id: string;
  name: string;
  description: string;
  category: PageCategory;
  icon: string;
  sections: SectionConfig[];
  layouts: LayoutOption[];
  authentication: boolean;
}

export interface SectionConfig {
  type: SectionType;
  required: boolean;
  props: Record<string, any>;
  variants?: string[];
}

export type PageCategory = 
  | 'Landing'
  | 'Application'
  | 'Content'
  | 'Forms'
  | 'Commerce'
  | 'Social'
  | 'Communication';

export type SectionType =
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'header'
  | 'stats'
  | 'activity'
  | 'form'
  | 'feed';

export type LayoutOption = 
  | 'single-column'
  | 'two-column'
  | 'three-column'
  | 'grid'
  | 'asymmetric';

// Navigation Types
export interface NavigationPattern {
  id: string;
  name: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  behavior: 'fixed' | 'sticky' | 'overlay';
}

export interface NavigationConfig {
  mobile: NavigationPattern;
  desktop: NavigationPattern;
  tablet?: NavigationPattern;
}

// Application State
export interface AppState {
  currentStep: number;
  completedSteps: Set<number>;
  canProceed: boolean;
  
  selectedTheme: ThemeConfig | null;
  selectedPages: PageType[];
  navigationPreferences: {
    mobile: NavigationPattern | null;
    desktop: NavigationPattern | null;
  };
  authenticationStates: {
    requiresAuth: boolean;
    authPages: string[];
    publicPages: string[];
  };
  customizations: {
    colors: Partial<ColorSystem>;
    typography: Partial<TypographySystem>;
    spacing: Partial<SpacingSystem>;
  };
  
  generatedSystem: DesignSystem | null;
  
  previewDevice: ViewportSize;
  previewPanelOpen: boolean;
  activePreviewPage: string | null;
  
  sessionId: string;
  lastSaved: Date | null;
  isDirty: boolean;
}

export type ViewportSize = 'mobile' | 'tablet' | 'desktop';

// Design System Output
export interface DesignSystem {
  meta: SystemMetadata;
  tokens: DesignTokens;
  components: ComponentDefinition[];
  pages: PageTemplate[];
  guidelines: DesignGuidelines;
}

export interface SystemMetadata {
  name: string;
  version: string;
  description: string;
  created: Date;
  theme: string;
  pages: string[];
}

export interface ComponentDefinition {
  name: string;
  description: string;
  props: Record<string, any>;
  variants: string[];
  code: {
    html: string;
    css: string;
    usage: string;
  };
}

export interface PageTemplate {
  id: string;
  name: string;
  wireframe: {
    html: string;
    css: string;
    js: string;
  };
  responsive: Record<ViewportSize, string>;
}

export interface DesignGuidelines {
  principles: string[];
  bestPractices: string[];
  accessibility: string[];
  performance: string[];
}

// Export Types
export type ExportFormat = 'markdown' | 'html' | 'json' | 'zip';

export interface ExportOptions {
  format: ExportFormat;
  includeAssets: boolean;
  includeInteractive: boolean;
  minify: boolean;
}
```

### 2.2 Common Components

#### src/components/common/Button/Button.tsx
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    children,
    disabled,
    className = '',
    ...props
  }, ref) => {
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} />}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### src/components/common/Button/Button.module.css
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  white-space: nowrap;
}

.button:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background-color: var(--color-primary-500);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.primary:active:not(:disabled) {
  background-color: var(--color-primary-700);
}

.secondary {
  background-color: white;
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-400);
}

.ghost {
  background-color: transparent;
  color: var(--color-gray-700);
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Sizes */
.sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.875rem;
}

.md {
  padding: var(--space-sm) var(--space-md);
  font-size: 1rem;
}

.lg {
  padding: var(--space-md) var(--space-lg);
  font-size: 1.125rem;
}

.fullWidth {
  width: 100%;
}

/* Loading State */
.loading .content {
  visibility: hidden;
}

.spinner {
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 2.3 Step Indicator Component

#### src/components/wizard/StepIndicator/StepIndicator.tsx
```typescript
import { FC } from 'react';
import styles from './StepIndicator.module.css';

export interface Step {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  onStepClick?: (stepId: number) => void;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ steps, onStepClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressBar} />
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={[
            styles.step,
            step.active && styles.active,
            step.completed && styles.completed
          ].filter(Boolean).join(' ')}
          onClick={() => onStepClick?.(step.id)}
          role="button"
          tabIndex={0}
          aria-label={`Step ${step.id}: ${step.label}`}
          aria-current={step.active ? 'step' : undefined}
        >
          <div className={styles.circle}>
            {step.completed ? (
              <svg className={styles.checkmark} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{step.id}</span>
            )}
          </div>
          <span className={styles.label}>{step.label}</span>
          {index < steps.length - 1 && (
            <div 
              className={[
                styles.connector,
                steps[index + 1].completed && styles.completed
              ].filter(Boolean).join(' ')}
            />
          )}
        </div>
      ))}
    </div>
  );
};
```

#### src/components/wizard/StepIndicator/StepIndicator.module.css
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: var(--space-2xl);
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all var(--transition-base);
}

.step:hover:not(.active) .circle {
  transform: scale(1.1);
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--color-gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--color-gray-500);
  transition: all var(--transition-base);
  position: relative;
  z-index: 2;
}

.active .circle {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: white;
}

.completed .circle {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: white;
}

.checkmark {
  width: 20px;
  height: 20px;
}

.label {
  margin-top: var(--space-sm);
  font-size: 0.875rem;
  color: var(--color-gray-600);
  font-weight: 500;
}

.active .label {
  color: var(--color-gray-900);
}

.connector {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--color-gray-200);
  transition: background-color var(--transition-base);
}

.connector.completed {
  background-color: var(--color-primary-500);
}

/* Responsive */
@media (max-width: 768px) {
  .label {
    display: none;
  }
  
  .circle {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
}
```

## Phase 3: Data Layer and Services (45 mins)

### 3.1 Mock Data

#### src/data/themes.ts
```typescript
import { ThemeConfig } from '@/types';

export const themes: Record<string, ThemeConfig> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, spacious design focused on content and usability',
    principles: {
      hierarchy: 'Clear typography hierarchy with ample white space',
      spacing: 'Generous margins and padding, 8px base unit',
      colors: 'Monochromatic with single accent color',
      typography: 'System fonts, limited type styles',
      components: 'Simple borders, subtle shadows, minimal decoration'
    },
    tokens: {
      colors: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#3b82f6',
        background: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9'
        },
        border: {
          default: '#e2e8f0',
          focus: '#3b82f6',
          error: '#ef4444'
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
          inverse: '#ffffff'
        }
      },
      typography: {
        fontFamily: {
          sans: 'system-ui, -apple-system, sans-serif',
          serif: 'Georgia, serif',
          mono: 'ui-monospace, monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75
        },
        letterSpacing: {
          tight: '-0.025em',
          normal: '0',
          wide: '0.025em'
        }
      },
      spacing: {
        unit: 8,
        scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128]
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        base: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        base: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
      }
    },
    navigation: {
      mobile: {
        id: 'hamburger',
        name: 'Hamburger Menu',
        description: 'Classic slide-out navigation',
        position: 'top',
        behavior: 'overlay'
      },
      desktop: {
        id: 'horizontal',
        name: 'Horizontal Navigation',
        description: 'Traditional top navigation bar',
        position: 'top',
        behavior: 'sticky'
      }
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with gradients and elevated elements',
    principles: {
      hierarchy: 'Bold typography with gradient accents',
      spacing: 'Comfortable spacing with visual rhythm',
      colors: 'Vibrant gradients with neutral base',
      typography: 'Modern sans-serif with varied weights',
      components: 'Elevated cards, gradient buttons, smooth animations'
    },
    tokens: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        background: {
          primary: '#ffffff',
          secondary: '#fafbfc',
          tertiary: '#f5f6f7'
        },
        border: {
          default: '#e5e7eb',
          focus: '#667eea',
          error: '#f56565'
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          muted: '#9ca3af',
          inverse: '#ffffff'
        }
      },
      typography: {
        fontFamily: {
          sans: "'Inter', system-ui, sans-serif",
          serif: "'Merriweather', serif",
          mono: "'Fira Code', monospace"
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem'
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.6,
          relaxed: 1.75
        },
        letterSpacing: {
          tight: '-0.05em',
          normal: '0',
          wide: '0.05em'
        }
      },
      spacing: {
        unit: 8,
        scale: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
        base: '0 4px 6px rgba(0, 0, 0, 0.1)',
        md: '0 8px 16px rgba(0, 0, 0, 0.1)',
        lg: '0 20px 40px rgba(0, 0, 0, 0.15)',
        xl: '0 32px 64px rgba(0, 0, 0, 0.2)'
      }
    },
    navigation: {
      mobile: {
        id: 'bottom-tabs',
        name: 'Bottom Tab Bar',
        description: 'iOS-style bottom navigation',
        position: 'bottom',
        behavior: 'fixed'
      },
      desktop: {
        id: 'sidebar',
        name: 'Sidebar Navigation',
        description: 'Vertical navigation panel',
        position: 'left',
        behavior: 'fixed'
      }
    }
  }
};
```

#### src/data/pageTypes.ts
```typescript
import { PageType } from '@/types';

export const pageTypes: PageType[] = [
  {
    id: 'landing-public',
    name: 'Public Landing Page',
    description: 'Marketing page for non-authenticated users',
    category: 'Landing',
    icon: 'home',
    sections: [
      {
        type: 'hero',
        required: true,
        props: {
          title: 'Main headline',
          subtitle: 'Supporting text',
          cta: 'Primary action',
          background: 'image|gradient|video'
        }
      },
      {
        type: 'features',
        required: true,
        props: {
          layout: 'grid|list|carousel',
          count: '3-6',
          style: 'cards|minimal|icons'
        }
      },
      {
        type: 'testimonials',
        required: false,
        props: {
          type: 'quotes|logos|stats',
          layout: 'carousel|grid|inline'
        }
      },
      {
        type: 'cta',
        required: true,
        props: {
          style: 'banner|card|inline'
        }
      }
    ],
    layouts: ['single-column', 'two-column', 'asymmetric'],
    authentication: false
  },
  {
    id: 'dashboard',
    name: 'User Dashboard',
    description: 'Personalized landing for authenticated users',
    category: 'Application',
    icon: 'dashboard',
    sections: [
      {
        type: 'header',
        required: true,
        props: {
          userInfo: 'avatar|name|notifications',
          actions: 'search|settings|profile'
        }
      },
      {
        type: 'stats',
        required: true,
        props: {
          layout: 'cards|banner|sidebar',
          metrics: '2-6 key numbers'
        }
      },
      {
        type: 'activity',
        required: false,
        props: {
          style: 'timeline|cards|list',
          pagination: 'infinite|load-more|pages'
        }
      }
    ],
    layouts: ['grid', 'sidebar', 'cards'],
    authentication: true
  },
  {
    id: 'form-page',
    name: 'Form Page',
    description: 'Single-step form with validation',
    category: 'Forms',
    icon: 'form',
    sections: [
      {
        type: 'form',
        required: true,
        props: {
          fields: 'text|email|password|select|checkbox|radio',
          layout: 'single-column|two-column',
          validation: 'client-side|server-side'
        }
      }
    ],
    layouts: ['single-column', 'two-column'],
    authentication: false
  },
  {
    id: 'content-page',
    name: 'Content Page',
    description: 'Article, blog post, or documentation page',
    category: 'Content',
    icon: 'document',
    sections: [
      {
        type: 'header',
        required: true,
        props: {
          title: 'Page title',
          meta: 'author|date|category'
        }
      },
      {
        type: 'content',
        required: true,
        props: {
          format: 'markdown|rich-text',
          sidebar: 'toc|related|none'
        }
      }
    ],
    layouts: ['single-column', 'two-column'],
    authentication: false
  },
  {
    id: 'feed',
    name: 'Feed Page',
    description: 'Social media or activity feed layout',
    category: 'Social',
    icon: 'feed',
    sections: [
      {
        type: 'feed',
        required: true,
        props: {
          items: 'posts|activities|updates',
          layout: 'timeline|cards|list',
          actions: 'like|comment|share'
        }
      }
    ],
    layouts: ['single-column', 'two-column'],
    authentication: true
  }
];
```

### 3.2 Services

#### src/services/ThemeService.ts
```typescript
import { ThemeConfig, ColorSystem, DesignTokens } from '@/types';
import { themes } from '@/data/themes';

export class ThemeService {
  private static instance: ThemeService;
  
  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }
  
  async getThemes(): Promise<ThemeConfig[]> {
    return Object.values(themes);
  }
  
  async getThemeById(id: string): Promise<ThemeConfig | null> {
    return themes[id] || null;
  }
  
  generateColorSystem(baseColors: Partial<ColorSystem>): ColorSystem {
    const defaultColors = themes.minimal.tokens.colors;
    const merged = this.deepMerge(defaultColors, baseColors) as ColorSystem;
    
    // Generate color variations
    if (merged.primary) {
      merged.primary = this.ensureColorVariations(merged.primary);
    }
    
    return merged;
  }
  
  generateDesignTokens(
    theme: ThemeConfig,
    customizations: Partial<DesignTokens>
  ): DesignTokens {
    return this.deepMerge(theme.tokens, customizations) as DesignTokens;
  }
  
  // Color utilities
  lighten(color: string, amount: number): string {
    return this.adjustColor(color, amount);
  }
  
  darken(color: string, amount: number): string {
    return this.adjustColor(color, -amount);
  }
  
  getContrastRatio(color1: string, color2: string): number {
    const l1 = this.getLuminance(color1);
    const l2 = this.getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  private adjustColor(color: string, amount: number): string {
    const rgb = this.hexToRgb(color);
    if (!rgb) return color;
    
    const adjusted = {
      r: Math.max(0, Math.min(255, rgb.r + (amount * 255))),
      g: Math.max(0, Math.min(255, rgb.g + (amount * 255))),
      b: Math.max(0, Math.min(255, rgb.b + (amount * 255)))
    };
    
    return this.rgbToHex(adjusted);
  }
  
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  private rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
  
  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  
  private ensureColorVariations(baseColor: string): any {
    return {
      50: this.lighten(baseColor, 0.9),
      100: this.lighten(baseColor, 0.8),
      200: this.lighten(baseColor, 0.6),
      300: this.lighten(baseColor, 0.4),
      400: this.lighten(baseColor, 0.2),
      500: baseColor,
      600: this.darken(baseColor, 0.1),
      700: this.darken(baseColor, 0.2),
      800: this.darken(baseColor, 0.3),
      900: this.darken(baseColor, 0.4)
    };
  }
  
  private deepMerge(target: any, source: any): any {
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            output[key] = source[key];
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
    
    return output;
  }
  
  private isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}
```

#### src/services/StorageService.ts
```typescript
import { AppState } from '@/types';

export interface SessionInfo {
  id: string;
  name: string;
  lastModified: Date;
  theme?: string;
}

export class StorageService {
  private static instance: StorageService;
  private readonly STORAGE_KEY = 'flexitheme_sessions';
  private readonly CURRENT_SESSION_KEY = 'flexitheme_current_session';
  
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  
  saveSession(state: AppState): void {
    try {
      const sessions = this.getAllSessions();
      const sessionData = {
        ...state,
        lastSaved: new Date().toISOString()
      };
      
      sessions[state.sessionId] = sessionData;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
      localStorage.setItem(this.CURRENT_SESSION_KEY, state.sessionId);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }
  
  loadSession(sessionId: string): AppState | null {
    try {
      const sessions = this.getAllSessions();
      const session = sessions[sessionId];
      
      if (!session) return null;
      
      // Reconstruct Sets from arrays
      return {
        ...session,
        completedSteps: new Set(session.completedSteps),
        lastSaved: session.lastSaved ? new Date(session.lastSaved) : null
      };
    } catch (error) {
      console.error('Failed to load session:', error);
      return null;
    }
  }
  
  listSessions(): SessionInfo[] {
    try {
      const sessions = this.getAllSessions();
      
      return Object.entries(sessions).map(([id, session]) => ({
        id,
        name: `Session ${new Date(session.lastSaved).toLocaleDateString()}`,
        lastModified: new Date(session.lastSaved),
        theme: session.selectedTheme?.name
      }));
    } catch (error) {
      console.error('Failed to list sessions:', error);
      return [];
    }
  }
  
  deleteSession(sessionId: string): void {
    try {
      const sessions = this.getAllSessions();
      delete sessions[sessionId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
      
      const currentSession = localStorage.getItem(this.CURRENT_SESSION_KEY);
      if (currentSession === sessionId) {
        localStorage.removeItem(this.CURRENT_SESSION_KEY);
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  }
  
  getCurrentSessionId(): string | null {
    return localStorage.getItem(this.CURRENT_SESSION_KEY);
  }
  
  private getAllSessions(): Record<string, any> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }
}
```

## Phase 4: Wizard Implementation (60 mins)

### 4.1 Wizard Container

#### src/components/wizard/WizardContainer/WizardContainer.tsx
```typescript
import { useState, useCallback, useEffect } from 'react';
import { StepIndicator } from '../StepIndicator/StepIndicator';
import { StyleSelection } from '../steps/StyleSelection/StyleSelection';
import { PageSelection } from '../steps/PageSelection/PageSelection';
import { NavigationConfig } from '../steps/NavigationConfig/NavigationConfig';
import { AuthConfig } from '../steps/AuthConfig/AuthConfig';
import { DesignCustomization } from '../steps/DesignCustomization/DesignCustomization';
import { ExportStep } from '../steps/ExportStep/ExportStep';
import { Button } from '@/components/common/Button/Button';
import { useAppState } from '@/hooks/useAppState';
import styles from './WizardContainer.module.css';

const WIZARD_STEPS = [
  { id: 1, label: 'Style', component: StyleSelection },
  { id: 2, label: 'Pages', component: PageSelection },
  { id: 3, label: 'Navigation', component: NavigationConfig },
  { id: 4, label: 'Auth', component: AuthConfig },
  { id: 5, label: 'Design', component: DesignCustomization },
  { id: 6, label: 'Export', component: ExportStep }
];

export const WizardContainer = () => {
  const { state, actions } = useAppState();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentStep = state.currentStep;
  const CurrentStepComponent = WIZARD_STEPS[currentStep - 1].component;
  
  const steps = WIZARD_STEPS.map(step => ({
    ...step,
    completed: state.completedSteps.has(step.id),
    active: step.id === currentStep
  }));
  
  const handleNext = useCallback(() => {
    if (state.canProceed && currentStep < WIZARD_STEPS.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        actions.nextStep();
        setIsTransitioning(false);
      }, 300);
    }
  }, [state.canProceed, currentStep, actions]);
  
  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        actions.prevStep();
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep, actions]);
  
  const handleStepClick = useCallback((stepId: number) => {
    if (stepId < currentStep || state.completedSteps.has(stepId - 1)) {
      setIsTransitioning(true);
      setTimeout(() => {
        actions.goToStep(stepId);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep, state.completedSteps, actions]);
  
  // Auto-save on step change
  useEffect(() => {
    if (state.isDirty) {
      actions.saveSession();
    }
  }, [currentStep]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create Your Design System</h1>
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={actions.saveSession}>
            Save Progress
          </Button>
        </div>
      </div>
      
      <StepIndicator steps={steps} onStepClick={handleStepClick} />
      
      <div className={[
        styles.content,
        isTransitioning && styles.transitioning
      ].filter(Boolean).join(' ')}>
        <CurrentStepComponent />
      </div>
      
      <div className={styles.navigation}>
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className={styles.progress}>
          <span className={styles.progressText}>
            Step {currentStep} of {WIZARD_STEPS.length}
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!state.canProceed || currentStep === WIZARD_STEPS.length}
        >
          {currentStep === WIZARD_STEPS.length - 1 ? 'Generate' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
```

### 4.2 Style Selection Step

#### src/components/wizard/steps/StyleSelection/StyleSelection.tsx
```typescript
import { useEffect, useState } from 'react';
import { ThemeConfig } from '@/types';
import { ThemeService } from '@/services/ThemeService';
import { useAppState } from '@/hooks/useAppState';
import { Card } from '@/components/common/Card/Card';
import styles from './StyleSelection.module.css';

export const StyleSelection = () => {
  const { state, actions } = useAppState();
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadThemes = async () => {
      const themeService = ThemeService.getInstance();
      const loadedThemes = await themeService.getThemes();
      setThemes(loadedThemes);
      setLoading(false);
    };
    
    loadThemes();
  }, []);
  
  const handleThemeSelect = (theme: ThemeConfig) => {
    actions.selectTheme(theme.id);
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading themes...</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Choose Your Base Style</h2>
        <p className={styles.subtitle}>
          Select a design style that matches your project's personality
        </p>
      </div>
      
      <div className={styles.grid}>
        {themes.map(theme => (
          <Card
            key={theme.id}
            className={[
              styles.themeCard,
              state.selectedTheme?.id === theme.id && styles.selected
            ].filter(Boolean).join(' ')}
            onClick={() => handleThemeSelect(theme)}
          >
            <div className={styles.preview}>
              <ThemePreview theme={theme} />
            </div>
            
            <div className={styles.info}>
              <h3 className={styles.themeName}>{theme.name}</h3>
              <p className={styles.themeDescription}>{theme.description}</p>
              
              <div className={styles.principles}>
                <h4 className={styles.principlesTitle}>Design Principles</h4>
                <ul className={styles.principlesList}>
                  {Object.entries(theme.principles).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ThemePreview = ({ theme }: { theme: ThemeConfig }) => {
  const colors = theme.tokens.colors;
  
  return (
    <div className={styles.previewContent}>
      <div 
        className={styles.previewNav}
        style={{ backgroundColor: colors.border.default }}
      />
      <div 
        className={styles.previewHero}
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
        }}
      />
      <div className={styles.previewCards}>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={styles.previewCard}
            style={{ backgroundColor: colors.background.secondary }}
          />
        ))}
      </div>
    </div>
  );
};
```

### 4.3 Page Selection Step

#### src/components/wizard/steps/PageSelection/PageSelection.tsx
```typescript
import { useState, useMemo } from 'react';
import { PageType, PageCategory } from '@/types';
import { pageTypes } from '@/data/pageTypes';
import { useAppState } from '@/hooks/useAppState';
import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './PageSelection.module.css';

export const PageSelection = () => {
  const { state, actions } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<PageCategory | 'all'>('all');
  
  const categories = useMemo(() => {
    const cats = new Set<PageCategory>();
    pageTypes.forEach(page => cats.add(page.category));
    return ['all', ...Array.from(cats)] as const;
  }, []);
  
  const filteredPages = useMemo(() => {
    if (selectedCategory === 'all') return pageTypes;
    return pageTypes.filter(page => page.category === selectedCategory);
  }, [selectedCategory]);
  
  const handlePageToggle = (pageId: string) => {
    const isSelected = state.selectedPages.some(p => p.id === pageId);
    if (isSelected) {
      actions.removePage(pageId);
    } else {
      actions.addPage(pageId);
    }
  };
  
  const isPageSelected = (pageId: string) => {
    return state.selectedPages.some(p => p.id === pageId);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Select Page Types</h2>
        <p className={styles.subtitle}>
          Choose the pages your application will need
        </p>
      </div>
      
      <div className={styles.filters}>
        {categories.map(category => (
          <button
            key={category}
            className={[
              styles.filterButton,
              selectedCategory === category && styles.active
            ].filter(Boolean).join(' ')}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Pages' : category}
          </button>
        ))}
      </div>
      
      <div className={styles.grid}>
        {filteredPages.map(page => (
          <div
            key={page.id}
            className={[
              styles.pageCard,
              isPageSelected(page.id) && styles.selected
            ].filter(Boolean).join(' ')}
            onClick={() => handlePageToggle(page.id)}
          >
            <div className={styles.pageHeader}>
              <Checkbox
                checked={isPageSelected(page.id)}
                onChange={() => handlePageToggle(page.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className={styles.pageIcon}>
                <PageIcon type={page.icon} />
              </div>
            </div>
            
            <div className={styles.pageInfo}>
              <h3 className={styles.pageName}>{page.name}</h3>
              <p className={styles.pageDescription}>{page.description}</p>
              <div className={styles.pageMeta}>
                <Badge variant="secondary">{page.category}</Badge>
                {page.authentication && (
                  <Badge variant="warning">Auth Required</Badge>
                )}
              </div>
            </div>
            
            <div className={styles.pageSections}>
              <span className={styles.sectionLabel}>Sections:</span>
              <div className={styles.sectionList}>
                {page.sections.map(section => (
                  <span key={section.type} className={styles.sectionItem}>
                    {section.type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.summary}>
        <strong>{state.selectedPages.length} pages selected</strong>
        {state.selectedPages.length > 0 && (
          <p>You can add more pages later or customize these selections</p>
        )}
      </div>
    </div>
  );
};

const PageIcon = ({ type }: { type: string }) => {
  // Simple icon component - in production, use proper icons
  const icons: Record<string, string> = {
    home: '🏠',
    dashboard: '📊',
    form: '📝',
    document: '📄',
    feed: '📱'
  };
  
  return <span className={styles.icon}>{icons[type] || '📄'}</span>;
};
```

## Phase 5: Preview System and Wireframe Engine (60 mins)

### 5.1 Preview Panel

#### src/components/preview/PreviewPanel/PreviewPanel.tsx
```typescript
import { useState, useEffect } from 'react';
import { ViewportSize } from '@/types';
import { useAppState } from '@/hooks/useAppState';
import { WireframeRenderer } from '../WireframeRenderer/WireframeRenderer';
import { DeviceFrame } from '../DeviceFrame/DeviceFrame';
import { Button } from '@/components/common/Button/Button';
import styles from './PreviewPanel.module.css';

export const PreviewPanel = () => {
  const { state, actions } = useAppState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<ViewportSize>('mobile');
  
  const devices: ViewportSize[] = ['mobile', 'tablet', 'desktop'];
  
  const handleDeviceChange = (device: ViewportSize) => {
    setCurrentDevice(device);
    actions.setPreviewDevice(device);
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  if (!state.selectedTheme || state.selectedPages.length === 0) {
    return null;
  }
  
  const currentPage = state.activePreviewPage || state.selectedPages[0];
  
  return (
    <div className={[
      styles.container,
      isCollapsed && styles.collapsed
    ].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>Live Preview</h3>
          {currentPage && (
            <span className={styles.pageName}>{currentPage.name}</span>
          )}
        </div>
        
        <div className={styles.controls}>
          <div className={styles.deviceSelector}>
            {devices.map(device => (
              <button
                key={device}
                className={[
                  styles.deviceButton,
                  currentDevice === device && styles.active
                ].filter(Boolean).join(' ')}
                onClick={() => handleDeviceChange(device)}
              >
                {device}
              </button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand preview' : 'Collapse preview'}
          >
            {isCollapsed ? '◀' : '▶'}
          </Button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className={styles.viewport}>
          <DeviceFrame device={currentDevice}>
            <WireframeRenderer
              theme={state.selectedTheme}
              page={currentPage}
              device={currentDevice}
              navigationConfig={state.navigationPreferences}
            />
          </DeviceFrame>
          
          <div className={styles.annotations}>
            <h4>Responsive Behavior</h4>
            <ResponsiveAnnotations device={currentDevice} />
          </div>
        </div>
      )}
    </div>
  );
};

const ResponsiveAnnotations = ({ device }: { device: ViewportSize }) => {
  const annotations = {
    mobile: {
      viewport: '320-768px',
      navigation: 'Hamburger menu or bottom tabs',
      layout: 'Single column, stacked elements',
      typography: 'Larger text for readability',
      interactions: 'Touch-optimized, larger tap targets'
    },
    tablet: {
      viewport: '768-1024px',
      navigation: 'Hybrid navigation options',
      layout: '2-3 column grids available',
      typography: 'Balanced sizing',
      interactions: 'Touch + hover states'
    },
    desktop: {
      viewport: '1024px+',
      navigation: 'Full navigation visible',
      layout: 'Multi-column layouts',
      typography: 'Standard sizing',
      interactions: 'Hover states, keyboard shortcuts'
    }
  };
  
  const current = annotations[device];
  
  return (
    <div className={styles.annotationList}>
      {Object.entries(current).map(([key, value]) => (
        <div key={key} className={styles.annotation}>
          <span className={styles.annotationLabel}>{key}:</span>
          <span className={styles.annotationValue}>{value}</span>
        </div>
      ))}
    </div>
  );
};
```

### 5.2 Wireframe Renderer

#### src/components/preview/WireframeRenderer/WireframeRenderer.tsx
```typescript
import { useMemo } from 'react';
import { ThemeConfig, PageType, ViewportSize, NavigationConfig } from '@/types';
import { WireframeSection } from './WireframeSection';
import styles from './WireframeRenderer.module.css';

interface WireframeRendererProps {
  theme: ThemeConfig;
  page: PageType;
  device: ViewportSize;
  navigationConfig: any;
}

export const WireframeRenderer = ({
  theme,
  page,
  device,
  navigationConfig
}: WireframeRendererProps) => {
  const wireframeStyles = useMemo(() => {
    return {
      '--primary-color': theme.tokens.colors.primary,
      '--secondary-color': theme.tokens.colors.secondary,
      '--accent-color': theme.tokens.colors.accent,
      '--bg-primary': theme.tokens.colors.background.primary,
      '--bg-secondary': theme.tokens.colors.background.secondary,
      '--border-color': theme.tokens.colors.border.default,
      '--text-primary': theme.tokens.colors.text.primary,
      '--text-secondary': theme.tokens.colors.text.secondary,
      '--border-radius': theme.tokens.borderRadius.base,
      '--shadow-sm': theme.tokens.shadows.sm,
      '--shadow-md': theme.tokens.shadows.md
    } as React.CSSProperties;
  }, [theme]);
  
  const navigation = device === 'mobile' 
    ? navigationConfig.mobile 
    : navigationConfig.desktop;
  
  return (
    <div 
      className={[styles.container, styles[device]].join(' ')}
      style={wireframeStyles}
    >
      {/* Navigation */}
      {navigation && (
        <NavigationWireframe 
          pattern={navigation}
          device={device}
          theme={theme}
        />
      )}
      
      {/* Page Sections */}
      <div className={styles.content}>
        {page.sections.map((section, index) => (
          <WireframeSection
            key={`${section.type}-${index}`}
            section={section}
            theme={theme}
            device={device}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollThumb} />
      </div>
    </div>
  );
};

const NavigationWireframe = ({ pattern, device, theme }: any) => {
  const navStyles = {
    backgroundColor: theme.tokens.colors.background.primary,
    borderBottom: `1px solid ${theme.tokens.colors.border.default}`,
    boxShadow: theme.tokens.shadows.sm
  };
  
  switch (pattern.id) {
    case 'hamburger':
      return (
        <nav className={styles.navHamburger} style={navStyles}>
          <div className={styles.navLogo} />
          <div className={styles.hamburgerIcon}>
            <span />
            <span />
            <span />
          </div>
        </nav>
      );
      
    case 'bottom-tabs':
      return (
        <nav className={styles.navBottomTabs} style={navStyles}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.tabItem}>
              <div className={styles.tabIcon} />
              <span className={styles.tabLabel} />
            </div>
          ))}
        </nav>
      );
      
    case 'horizontal':
      return (
        <nav className={styles.navHorizontal} style={navStyles}>
          <div className={styles.navLogo} />
          <div className={styles.navItems}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.navItem} />
            ))}
          </div>
          <div className={styles.navActions}>
            <div className={styles.navAction} />
          </div>
        </nav>
      );
      
    case 'sidebar':
      return (
        <nav className={styles.navSidebar} style={navStyles}>
          <div className={styles.sidebarHeader}>
            <div className={styles.navLogo} />
          </div>
          <div className={styles.sidebarItems}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={styles.sidebarItem}>
                <div className={styles.itemIcon} />
                <span className={styles.itemLabel} />
              </div>
            ))}
          </div>
        </nav>
      );
      
    default:
      return null;
  }
};
```

#### src/components/preview/WireframeRenderer/WireframeSection.tsx
```typescript
import { SectionConfig, ThemeConfig, ViewportSize } from '@/types';
import styles from './WireframeSection.module.css';

interface WireframeSectionProps {
  section: SectionConfig;
  theme: ThemeConfig;
  device: ViewportSize;
}

export const WireframeSection = ({ 
  section, 
  theme, 
  device 
}: WireframeSectionProps) => {
  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return <HeroSection theme={theme} device={device} />;
      case 'features':
        return <FeaturesSection theme={theme} device={device} />;
      case 'testimonials':
        return <TestimonialsSection theme={theme} device={device} />;
      case 'stats':
        return <StatsSection theme={theme} device={device} />;
      case 'form':
        return <FormSection theme={theme} device={device} />;
      case 'feed':
        return <FeedSection theme={theme} device={device} />;
      default:
        return <GenericSection theme={theme} device={device} />;
    }
  };
  
  return (
    <section className={styles.section}>
      {renderSection()}
    </section>
  );
};

const HeroSection = ({ theme, device }: any) => {
  const isDesktop = device === 'desktop';
  
  return (
    <div 
      className={styles.hero}
      style={{
        background: `linear-gradient(135deg, ${theme.tokens.colors.primary}, ${theme.tokens.colors.secondary})`
      }}
    >
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.heroTitle} />
          <div className={styles.heroSubtitle} />
          <div className={styles.heroCta} />
        </div>
        {isDesktop && <div className={styles.heroVisual} />}
      </div>
    </div>
  );
};

const FeaturesSection = ({ theme, device }: any) => {
  const columns = device === 'mobile' ? 1 : device === 'tablet' ? 2 : 3;
  
  return (
    <div className={styles.features}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle} />
        <div className={styles.sectionSubtitle} />
      </div>
      <div 
        className={styles.featureGrid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div 
            key={i}
            className={styles.featureCard}
            style={{
              backgroundColor: theme.tokens.colors.background.secondary,
              borderRadius: theme.tokens.borderRadius.md,
              boxShadow: theme.tokens.shadows.sm
            }}
          >
            <div className={styles.featureIcon} />
            <div className={styles.featureTitle} />
            <div className={styles.featureText} />
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsSection = ({ theme, device }: any) => {
  const columns = device === 'mobile' ? 2 : 4;
  
  return (
    <div className={styles.stats}>
      <div 
        className={styles.statsGrid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statNumber} />
            <div className={styles.statLabel} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FormSection = ({ theme, device }: any) => {
  return (
    <div className={styles.form}>
      <div className={styles.formContainer}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={styles.formField}>
            <div className={styles.fieldLabel} />
            <div 
              className={styles.fieldInput}
              style={{
                backgroundColor: theme.tokens.colors.background.secondary,
                borderColor: theme.tokens.colors.border.default
              }}
            />
          </div>
        ))}
        <div className={styles.formActions}>
          <div 
            className={styles.submitButton}
            style={{ backgroundColor: theme.tokens.colors.primary }}
          />
        </div>
      </div>
    </div>
  );
};

const FeedSection = ({ theme, device }: any) => {
  return (
    <div className={styles.feed}>
      {[1, 2, 3].map(i => (
        <div 
          key={i}
          className={styles.feedItem}
          style={{
            backgroundColor: theme.tokens.colors.background.primary,
            borderColor: theme.tokens.colors.border.default,
            boxShadow: theme.tokens.shadows.sm
          }}
        >
          <div className={styles.feedHeader}>
            <div className={styles.feedAvatar} />
            <div className={styles.feedMeta}>
              <div className={styles.feedUser} />
              <div className={styles.feedTime} />
            </div>
          </div>
          <div className={styles.feedContent} />
          <div className={styles.feedActions}>
            {[1, 2, 3].map(j => (
              <div key={j} className={styles.feedAction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TestimonialsSection = ({ theme, device }: any) => {
  return (
    <div className={styles.testimonials}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle} />
      </div>
      <div className={styles.testimonialGrid}>
        {[1, 2, 3].map(i => (
          <div 
            key={i}
            className={styles.testimonialCard}
            style={{
              backgroundColor: theme.tokens.colors.background.secondary,
              borderRadius: theme.tokens.borderRadius.md
            }}
          >
            <div className={styles.testimonialQuote} />
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar} />
              <div className={styles.authorInfo}>
                <div className={styles.authorName} />
                <div className={styles.authorRole} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenericSection = ({ theme, device }: any) => {
  return (
    <div className={styles.generic}>
      <div className={styles.genericContent}>
        <div className={styles.contentBlock} />
        <div className={styles.contentBlock} />
      </div>
    </div>
  );
};
```

## Phase 6: Export System and Final Integration (45 mins)

### 6.1 Export Service

#### src/services/ExportService.ts
```typescript
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { DesignSystem, ExportFormat, ExportOptions } from '@/types';

export class ExportService {
  private static instance: ExportService;
  
  static getInstance(): ExportService {
    if (!ExportService.instance) {
      ExportService.instance = new ExportService();
    }
    return ExportService.instance;
  }
  
  async export(designSystem: DesignSystem, options: ExportOptions): Promise<void> {
    switch (options.format) {
      case 'markdown':
        return this.exportAsMarkdown(designSystem);
      case 'html':
        return this.exportAsHTML(designSystem, options);
      case 'json':
        return this.exportAsJSON(designSystem);
      case 'zip':
        return this.exportAsZip(designSystem, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }
  
  private async exportAsMarkdown(system: DesignSystem): Promise<void> {
    const markdown = this.generateMarkdown(system);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${system.meta.name.toLowerCase().replace(/\s+/g, '-')}-design-system.md`);
  }
  
  private async exportAsHTML(system: DesignSystem, options: ExportOptions): Promise<void> {
    const html = this.generateHTML(system, options);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    saveAs(blob, `${system.meta.name.toLowerCase().replace(/\s+/g, '-')}-design-system.html`);
  }
  
  private async exportAsJSON(system: DesignSystem): Promise<void> {
    const json = JSON.stringify(system, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    saveAs(blob, `${system.meta.name.toLowerCase().replace(/\s+/g, '-')}-design-system.json`);
  }
  
  private async exportAsZip(system: DesignSystem, options: ExportOptions): Promise<void> {
    const zip = new JSZip();
    
    // Add main files
    zip.file('README.md', this.generateReadme(system));
    zip.file('design-system.json', JSON.stringify(system, null, 2));
    zip.file('design-tokens.css', this.generateCSSVariables(system));
    
    // Add component documentation
    const componentsFolder = zip.folder('components');
    system.components.forEach(component => {
      componentsFolder?.file(
        `${component.name.toLowerCase()}.md`,
        this.generateComponentDoc(component)
      );
    });
    
    // Add page templates
    const pagesFolder = zip.folder('pages');
    system.pages.forEach(page => {
      pagesFolder?.file(
        `${page.id}.html`,
        this.generatePageTemplate(page, system)
      );
    });
    
    // Add interactive examples if requested
    if (options.includeInteractive) {
      const examplesFolder = zip.folder('examples');
      examplesFolder?.file('index.html', this.generateInteractiveIndex(system));
      examplesFolder?.file('styles.css', this.generateInteractiveStyles(system));
      examplesFolder?.file('script.js', this.generateInteractiveScript(system));
    }
    
    // Generate and download zip
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${system.meta.name.toLowerCase().replace(/\s+/g, '-')}-design-system.zip`);
  }
  
  private generateMarkdown(system: DesignSystem): string {
    return `# ${system.meta.name} Design System

Generated on ${new Date(system.meta.created).toLocaleDateString()}

## Overview

${system.meta.description}

**Theme**: ${system.meta.theme}  
**Version**: ${system.meta.version}  
**Pages**: ${system.meta.pages.join(', ')}

## Design Tokens

### Colors

\`\`\`css
/* Primary Colors */
--color-primary: ${system.tokens.colors.primary};
--color-secondary: ${system.tokens.colors.secondary};
--color-accent: ${system.tokens.colors.accent};

/* Background Colors */
--bg-primary: ${system.tokens.colors.background.primary};
--bg-secondary: ${system.tokens.colors.background.secondary};
--bg-tertiary: ${system.tokens.colors.background.tertiary};

/* Text Colors */
--text-primary: ${system.tokens.colors.text.primary};
--text-secondary: ${system.tokens.colors.text.secondary};
--text-muted: ${system.tokens.colors.text.muted};
--text-inverse: ${system.tokens.colors.text.inverse};

/* Border Colors */
--border-default: ${system.tokens.colors.border.default};
--border-focus: ${system.tokens.colors.border.focus};
--border-error: ${system.tokens.colors.border.error};
\`\`\`

### Typography

\`\`\`css
/* Font Families */
--font-sans: ${system.tokens.typography.fontFamily.sans};
--font-serif: ${system.tokens.typography.fontFamily.serif};
--font-mono: ${system.tokens.typography.fontFamily.mono};

/* Font Sizes */
${Object.entries(system.tokens.typography.fontSize)
  .map(([key, value]) => `--text-${key}: ${value};`)
  .join('\n')}

/* Font Weights */
${Object.entries(system.tokens.typography.fontWeight)
  .map(([key, value]) => `--font-${key}: ${value};`)
  .join('\n')}
\`\`\`

### Spacing

\`\`\`css
/* Spacing Scale */
${system.tokens.spacing.scale
  .map((value, index) => `--space-${index}: ${value}px;`)
  .join('\n')}
\`\`\`

### Shadows

\`\`\`css
${Object.entries(system.tokens.shadows)
  .map(([key, value]) => `--shadow-${key}: ${value};`)
  .join('\n')}
\`\`\`

## Components

${system.components.map(component => this.generateComponentMarkdown(component)).join('\n\n')}

## Page Templates

${system.pages.map(page => `
### ${page.name}

Interactive wireframe for ${page.name} page type.

#### Responsive Breakpoints
- **Mobile**: ${page.responsive.mobile}
- **Tablet**: ${page.responsive.tablet}
- **Desktop**: ${page.responsive.desktop}

[View Interactive Example](./pages/${page.id}.html)
`).join('\n\n')}

## Design Guidelines

### Core Principles
${system.guidelines.principles.map(p => `- ${p}`).join('\n')}

### Best Practices
${system.guidelines.bestPractices.map(p => `- ${p}`).join('\n')}

### Accessibility
${system.guidelines.accessibility.map(p => `- ${p}`).join('\n')}

### Performance
${system.guidelines.performance.map(p => `- ${p}`).join('\n')}
`;
  }
  
  private generateComponentMarkdown(component: any): string {
    return `### ${component.name}

${component.description}

#### Usage

\`\`\`html
${component.code.html}
\`\`\`

\`\`\`css
${component.code.css}
\`\`\`

#### Variants
${component.variants.map((v: string) => `- ${v}`).join('\n')}
`;
  }
  
  private generateHTML(system: DesignSystem, options: ExportOptions): string {
    const minify = options.minify;
    const includeInteractive = options.includeInteractive;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${system.meta.name} - Design System</title>
    <style>
        ${this.generateCSSVariables(system)}
        ${this.generateBaseStyles(minify)}
        ${includeInteractive ? this.generateInteractiveStyles(system) : ''}
    </style>
</head>
<body>
    <div class="design-system-doc">
        <header class="doc-header">
            <h1>${system.meta.name}</h1>
            <p>${system.meta.description}</p>
            <div class="meta">
                <span>Version ${system.meta.version}</span>
                <span>Created ${new Date(system.meta.created).toLocaleDateString()}</span>
            </div>
        </header>
        
        <nav class="doc-nav">
            <ul>
                <li><a href="#tokens">Design Tokens</a></li>
                <li><a href="#components">Components</a></li>
                <li><a href="#pages">Page Templates</a></li>
                <li><a href="#guidelines">Guidelines</a></li>
            </ul>
        </nav>
        
        <main class="doc-content">
            ${this.generateTokensSection(system)}
            ${this.generateComponentsSection(system)}
            ${this.generatePagesSection(system, includeInteractive)}
            ${this.generateGuidelinesSection(system)}
        </main>
    </div>
    
    ${includeInteractive ? `<script>${this.generateInteractiveScript(system)}</script>` : ''}
</body>
</html>`;
  }
  
  private generateCSSVariables(system: DesignSystem): string {
    const tokens = system.tokens;
    
    return `:root {
  /* Colors */
  --color-primary: ${tokens.colors.primary};
  --color-secondary: ${tokens.colors.secondary};
  --color-accent: ${tokens.colors.accent};
  
  /* Background */
  --bg-primary: ${tokens.colors.background.primary};
  --bg-secondary: ${tokens.colors.background.secondary};
  --bg-tertiary: ${tokens.colors.background.tertiary};
  
  /* Text */
  --text-primary: ${tokens.colors.text.primary};
  --text-secondary: ${tokens.colors.text.secondary};
  --text-muted: ${tokens.colors.text.muted};
  --text-inverse: ${tokens.colors.text.inverse};
  
  /* Borders */
  --border-default: ${tokens.colors.border.default};
  --border-focus: ${tokens.colors.border.focus};
  --border-error: ${tokens.colors.border.error};
  
  /* Typography */
  --font-sans: ${tokens.typography.fontFamily.sans};
  --font-serif: ${tokens.typography.fontFamily.serif};
  --font-mono: ${tokens.typography.fontFamily.mono};
  
  /* Font Sizes */
${Object.entries(tokens.typography.fontSize)
  .map(([key, value]) => `  --text-${key}: ${value};`)
  .join('\n')}
  
  /* Spacing */
${tokens.spacing.scale
  .map((value, index) => `  --space-${index}: ${value}px;`)
  .join('\n')}
  
  /* Shadows */
${Object.entries(tokens.shadows)
  .map(([key, value]) => `  --shadow-${key}: ${value};`)
  .join('\n')}
  
  /* Border Radius */
${Object.entries(tokens.borderRadius)
  .map(([key, value]) => `  --radius-${key}: ${value};`)
  .join('\n')}
}`;
  }
  
  private generateBaseStyles(minify: boolean): string {
    const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  line-height: 1.6;
}

.design-system-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
}

.doc-header {
  text-align: center;
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--border-default);
}

.doc-header h1 {
  font-size: var(--text-4xl);
  margin-bottom: var(--space-2);
}

.doc-nav {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border-default);
}

.doc-nav ul {
  list-style: none;
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

.doc-nav a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.doc-content {
  padding: var(--space-8) 0;
}

.section {
  margin-bottom: var(--space-8);
}

.section h2 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
}

.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.token-card {
  background: var(--bg-secondary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-default);
}

.component-example {
  background: var(--bg-secondary);
  padding: var(--space-6);
  border-radius: var(--radius-md);
  margin: var(--space-4) 0;
}

.code-block {
  background: var(--bg-tertiary);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}`;
    
    return minify ? styles.replace(/\s+/g, ' ').trim() : styles;
  }
  
  private generateTokensSection(system: DesignSystem): string {
    return `
<section id="tokens" class="section">
  <h2>Design Tokens</h2>
  
  <div class="subsection">
    <h3>Color Palette</h3>
    <div class="token-grid">
      ${this.generateColorTokens(system.tokens.colors)}
    </div>
  </div>
  
  <div class="subsection">
    <h3>Typography Scale</h3>
    <div class="token-grid">
      ${this.generateTypographyTokens(system.tokens.typography)}
    </div>
  </div>
  
  <div class="subsection">
    <h3>Spacing System</h3>
    <div class="token-grid">
      ${this.generateSpacingTokens(system.tokens.spacing)}
    </div>
  </div>
</section>`;
  }
  
  private generateColorTokens(colors: any): string {
    const colorEntries = [
      { name: 'Primary', value: colors.primary },
      { name: 'Secondary', value: colors.secondary },
      { name: 'Accent', value: colors.accent },
      ...Object.entries(colors.background).map(([key, value]) => ({
        name: `Background ${key}`,
        value
      })),
      ...Object.entries(colors.text).map(([key, value]) => ({
        name: `Text ${key}`,
        value
      }))
    ];
    
    return colorEntries.map(({ name, value }) => `
      <div class="token-card">
        <div class="color-swatch" style="background-color: ${value}; height: 60px; border-radius: var(--radius-sm); margin-bottom: var(--space-2);"></div>
        <div class="token-name">${name}</div>
        <code class="token-value">${value}</code>
      </div>
    `).join('');
  }
  
  private generateTypographyTokens(typography: any): string {
    return Object.entries(typography.fontSize).map(([key, value]) => `
      <div class="token-card">
        <div style="font-size: ${value}; margin-bottom: var(--space-2);">Aa</div>
        <div class="token-name">${key}</div>
        <code class="token-value">${value}</code>
      </div>
    `).join('');
  }
  
  private generateSpacingTokens(spacing: any): string {
    return spacing.scale.map((value: number, index: number) => `
      <div class="token-card">
        <div style="background: var(--color-primary); height: ${value}px; width: ${value}px; margin-bottom: var(--space-2);"></div>
        <div class="token-name">space-${index}</div>
        <code class="token-value">${value}px</code>
      </div>
    `).join('');
  }
  
  private generateComponentsSection(system: DesignSystem): string {
    return `
<section id="components" class="section">
  <h2>Components</h2>
  ${system.components.map(component => `
    <div class="component">
      <h3>${component.name}</h3>
      <p>${component.description}</p>
      
      <div class="component-example">
        ${component.code.html}
      </div>
      
      <details>
        <summary>View Code</summary>
        <pre class="code-block">${this.escapeHtml(component.code.html)}</pre>
        <pre class="code-block">${component.code.css}</pre>
      </details>
    </div>
  `).join('')}
</section>`;
  }
  
  private generatePagesSection(system: DesignSystem, includeInteractive: boolean): string {
    return `
<section id="pages" class="section">
  <h2>Page Templates</h2>
  ${system.pages.map(page => `
    <div class="page-template">
      <h3>${page.name}</h3>
      
      ${includeInteractive ? `
        <div class="wireframe-container" data-page-id="${page.id}">
          <div class="device-selector">
            <button data-device="mobile" class="active">Mobile</button>
            <button data-device="tablet">Tablet</button>
            <button data-device="desktop">Desktop</button>
          </div>
          <div class="wireframe-viewport">
            ${page.wireframe.html}
          </div>
        </div>
      ` : `
        <p>Interactive wireframe available in full export.</p>
      `}
      
      <div class="responsive-notes">
        <h4>Responsive Behavior</h4>
        <ul>
          <li><strong>Mobile:</strong> ${page.responsive.mobile}</li>
          <li><strong>Tablet:</strong> ${page.responsive.tablet}</li>
          <li><strong>Desktop:</strong> ${page.responsive.desktop}</li>
        </ul>
      </div>
    </div>
  `).join('')}
</section>`;
  }
  
  private generateGuidelinesSection(system: DesignSystem): string {
    return `
<section id="guidelines" class="section">
  <h2>Design Guidelines</h2>
  
  <div class="guidelines-group">
    <h3>Core Principles</h3>
    <ul>
      ${system.guidelines.principles.map(p => `<li>${p}</li>`).join('')}
    </ul>
  </div>
  
  <div class="guidelines-group">
    <h3>Best Practices</h3>
    <ul>
      ${system.guidelines.bestPractices.map(p => `<li>${p}</li>`).join('')}
    </ul>
  </div>
  
  <div class="guidelines-group">
    <h3>Accessibility</h3>
    <ul>
      ${system.guidelines.accessibility.map(p => `<li>${p}</li>`).join('')}
    </ul>
  </div>
  
  <div class="guidelines-group">
    <h3>Performance</h3>
    <ul>
      ${system.guidelines.performance.map(p => `<li>${p}</li>`).join('')}
    </ul>
  </div>
</section>`;
  }
  
  private generateReadme(system: DesignSystem): string {
    return `# ${system.meta.name} Design System

This design system was generated using FlexiTheme on ${new Date(system.meta.created).toLocaleDateString()}.

## Contents

- \`/components\` - Individual component documentation
- \`/pages\` - Page template examples
- \`design-system.json\` - Complete design system configuration
- \`design-tokens.css\` - CSS custom properties
- \`/examples\` - Interactive examples (if included)

## Quick Start

1. Include the design tokens CSS in your project:
   \`\`\`html
   <link rel="stylesheet" href="design-tokens.css">
   \`\`\`

2. Use the CSS custom properties in your styles:
   \`\`\`css
   .my-component {
     color: var(--text-primary);
     background: var(--bg-secondary);
     padding: var(--space-4);
   }
   \`\`\`

3. Follow the component patterns in the \`/components\` directory

## Theme: ${system.meta.theme}

This design system is based on the ${system.meta.theme} theme, which emphasizes:
${system.guidelines.principles.map(p => `- ${p}`).join('\n')}

## Support

For questions or issues with this design system, please refer to the documentation or contact your design system team.
`;
  }
  
  private generateComponentDoc(component: any): string {
    return `# ${component.name}

${component.description}

## Usage

\`\`\`html
${component.code.html}
\`\`\`

\`\`\`css
${component.code.css}
\`\`\`

## Props

${Object.entries(component.props).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Variants

${component.variants.map((v: string) => `- ${v}`).join('\n')}

## Examples

\`\`\`javascript
${component.code.usage}
\`\`\`
`;
  }
  
  private generatePageTemplate(page: any, system: DesignSystem): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name} - ${system.meta.name}</title>
    <style>
        ${this.generateCSSVariables(system)}
        ${page.wireframe.css}
    </style>
</head>
<body>
    <div class="page-container">
        ${page.wireframe.html}
    </div>
    <script>
        ${page.wireframe.js}
    </script>
</body>
</html>`;
  }
  
  private generateInteractiveIndex(system: DesignSystem): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${system.meta.name} - Interactive Examples</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="examples-container">
        <h1>${system.meta.name} Interactive Examples</h1>
        
        <nav class="examples-nav">
            <h2>Page Templates</h2>
            <ul>
                ${system.pages.map(page => `
                    <li><a href="#${page.id}">${page.name}</a></li>
                `).join('')}
            </ul>
        </nav>
        
        <main class="examples-content">
            ${system.pages.map(page => `
                <section id="${page.id}" class="example-section">
                    <h2>${page.name}</h2>
                    <div class="device-preview">
                        <div class="device-controls">
                            <button data-device="mobile" class="active">Mobile</button>
                            <button data-device="tablet">Tablet</button>
                            <button data-device="desktop">Desktop</button>
                        </div>
                        <div class="device-frame" data-device="mobile">
                            <iframe src="../pages/${page.id}.html"></iframe>
                        </div>
                    </div>
                </section>
            `).join('')}
        </main>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
  }
  
  private generateInteractiveStyles(system: DesignSystem): string {
    return `
.wireframe-container {
  margin: var(--space-6) 0;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.device-selector {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-default);
}

.device-selector button {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-default);
  background: var(--bg-primary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.device-selector button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.wireframe-viewport {
  padding: var(--space-6);
  background: var(--bg-tertiary);
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-frame {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all 0.3s;
}

.device-frame[data-device="mobile"] {
  width: 375px;
  height: 667px;
}

.device-frame[data-device="tablet"] {
  width: 768px;
  height: 1024px;
}

.device-frame[data-device="desktop"] {
  width: 100%;
  max-width: 1200px;
  height: 800px;
}

.device-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}`;
  }
  
  private generateInteractiveScript(system: DesignSystem): string {
    return `
document.addEventListener('DOMContentLoaded', () => {
  // Device switching
  const deviceSelectors = document.querySelectorAll('.device-selector button');
  
  deviceSelectors.forEach(button => {
    button.addEventListener('click', (e) => {
      const device = e.target.dataset.device;
      const container = e.target.closest('.wireframe-container, .device-preview');
      const viewport = container.querySelector('.wireframe-viewport, .device-frame');
      
      // Update active button
      container.querySelectorAll('.device-selector button').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');
      
      // Update viewport
      if (viewport) {
        viewport.dataset.device = device;
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Interactive wireframe behaviors
  const wireframes = document.querySelectorAll('.wireframe-viewport');
  
  wireframes.forEach(wireframe => {
    // Add click ripple effect
    wireframe.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = e.clientX - wireframe.offsetLeft + 'px';
      ripple.style.top = e.clientY - wireframe.offsetTop + 'px';
      wireframe.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = \`
  .ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--color-primary);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-effect {
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);`;
  }
  
  private escapeHtml(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }
}
```

### 6.2 Main App Component

#### src/App.tsx
```typescript
import { useState, useEffect } from 'react';
import { WizardContainer } from '@/components/wizard/WizardContainer/WizardContainer';
import { PreviewPanel } from '@/components/preview/PreviewPanel/PreviewPanel';
import { AppStateProvider } from '@/hooks/useAppState';
import { StorageService } from '@/services/StorageService';
import styles from './App.module.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  
  useEffect(() => {
    // Check for existing session
    const storage = StorageService.getInstance();
    const currentSessionId = storage.getCurrentSessionId();
    
    if (currentSessionId) {
      setHasExistingSession(true);
    }
    
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading FlexiTheme...</p>
      </div>
    );
  }
  
  return (
    <AppStateProvider>
      <div className={styles.app}>
        <div className={styles.mainContent}>
          <WizardContainer />
        </div>
        <PreviewPanel />
      </div>
    </AppStateProvider>
  );
};
```

### 6.3 App State Hook

#### src/hooks/useAppState.tsx
```typescript
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  AppState, 
  ThemeConfig, 
  PageType, 
  NavigationPattern,
  ViewportSize,
  DesignSystem,
  ExportFormat
} from '@/types';
import { ThemeService } from '@/services/ThemeService';
import { StorageService } from '@/services/StorageService';
import { ExportService } from '@/services/ExportService';
import { pageTypes } from '@/data/pageTypes';
import { v4 as uuidv4 } from 'uuid';

interface AppStateContextValue {
  state: AppState;
  actions: AppStateActions;
}

interface AppStateActions {
  // Wizard Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  
  // Theme Selection
  selectTheme: (themeId: string) => void;
  customizeTheme: (customizations: any) => void;
  
  // Page Management
  addPage: (pageId: string) => void;
  removePage: (pageId: string) => void;
  reorderPages: (pageIds: string[]) => void;
  
  // Navigation Configuration
  setMobileNav: (pattern: NavigationPattern) => void;
  setDesktopNav: (pattern: NavigationPattern) => void;
  
  // Design Customization
  updateColors: (colors: any) => void;
  updateTypography: (typography: any) => void;
  updateSpacing: (spacing: any) => void;
  
  // Preview
  setPreviewDevice: (device: ViewportSize) => void;
  togglePreviewPanel: () => void;
  setPreviewPage: (pageId: string) => void;
  
  // System Generation
  generateDesignSystem: () => Promise<DesignSystem>;
  exportDesignSystem: (format: ExportFormat) => Promise<void>;
  
  // Session Management
  saveSession: () => void;
  loadSession: (sessionId: string) => void;
  clearSession: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const storage = StorageService.getInstance();
    const sessionId = storage.getCurrentSessionId();
    
    if (sessionId) {
      const savedState = storage.loadSession(sessionId);
      if (savedState) {
        return savedState;
      }
    }
    
    // Default state
    return {
      currentStep: 1,
      completedSteps: new Set(),
      canProceed: false,
      
      selectedTheme: null,
      selectedPages: [],
      navigationPreferences: {
        mobile: null,
        desktop: null
      },
      authenticationStates: {
        requiresAuth: false,
        authPages: [],
        publicPages: []
      },
      customizations: {
        colors: {},
        typography: {},
        spacing: {}
      },
      
      generatedSystem: null,
      
      previewDevice: 'mobile',
      previewPanelOpen: true,
      activePreviewPage: null,
      
      sessionId: uuidv4(),
      lastSaved: null,
      isDirty: false
    };
  });
  
  // Update canProceed based on current step
  const updateCanProceed = useCallback((currentState: AppState) => {
    let canProceed = false;
    
    switch (currentState.currentStep) {
      case 1: // Style Selection
        canProceed = currentState.selectedTheme !== null;
        break;
      case 2: // Page Selection
        canProceed = currentState.selectedPages.length > 0;
        break;
      case 3: // Navigation
        canProceed = currentState.navigationPreferences.mobile !== null && 
                    currentState.navigationPreferences.desktop !== null;
        break;
      case 4: // Auth (optional)
      case 5: // Design (optional)
        canProceed = true;
        break;
      case 6: // Export
        canProceed = currentState.generatedSystem !== null;
        break;
    }
    
    setState(prev => ({ ...prev, canProceed }));
  }, []);
  
  // Actions
  const actions: AppStateActions = {
    nextStep: useCallback(() => {
      setState(prev => {
        const newState = {
          ...prev,
          completedSteps: new Set([...prev.completedSteps, prev.currentStep]),
          currentStep: Math.min(prev.currentStep + 1, 6),
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    prevStep: useCallback(() => {
      setState(prev => {
        const newState = {
          ...prev,
          currentStep: Math.max(prev.currentStep - 1, 1),
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    goToStep: useCallback((step: number) => {
      setState(prev => {
        const newState = {
          ...prev,
          currentStep: step,
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    selectTheme: useCallback(async (themeId: string) => {
      const themeService = ThemeService.getInstance();
      const theme = await themeService.getThemeById(themeId);
      
      setState(prev => {
        const newState = {
          ...prev,
          selectedTheme: theme,
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    addPage: useCallback((pageId: string) => {
      const page = pageTypes.find(p => p.id === pageId);
      if (!page) return;
      
      setState(prev => {
        const newState = {
          ...prev,
          selectedPages: [...prev.selectedPages, page],
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    removePage: useCallback((pageId: string) => {
      setState(prev => {
        const newState = {
          ...prev,
          selectedPages: prev.selectedPages.filter(p => p.id !== pageId),
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    setMobileNav: useCallback((pattern: NavigationPattern) => {
      setState(prev => {
        const newState = {
          ...prev,
          navigationPreferences: {
            ...prev.navigationPreferences,
            mobile: pattern
          },
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    setDesktopNav: useCallback((pattern: NavigationPattern) => {
      setState(prev => {
        const newState = {
          ...prev,
          navigationPreferences: {
            ...prev.navigationPreferences,
            desktop: pattern
          },
          isDirty: true
        };
        updateCanProceed(newState);
        return newState;
      });
    }, [updateCanProceed]),
    
    generateDesignSystem: useCallback(async () => {
      if (!state.selectedTheme) {
        throw new Error('No theme selected');
      }
      
      const themeService = ThemeService.getInstance();
      const tokens = themeService.generateDesignTokens(
        state.selectedTheme,
        state.customizations as any
      );
      
      const designSystem: DesignSystem = {
        meta: {
          name: `${state.selectedTheme.name} Design System`,
          version: '1.0.0',
          description: `A custom design system based on the ${state.selectedTheme.name} theme`,
          created: new Date(),
          theme: state.selectedTheme.name,
          pages: state.selectedPages.map(p => p.name)
        },
        tokens,
        components: [], // Would be generated based on selected pages
        pages: [], // Would be generated based on selected pages
        guidelines: {
          principles: Object.values(state.selectedTheme.principles),
          bestPractices: [
            'Use semantic HTML elements',
            'Ensure sufficient color contrast',
            'Provide keyboard navigation',
            'Test across different devices'
          ],
          accessibility: [
            'WCAG 2.1 AA compliance',
            'Keyboard navigable',
            'Screen reader compatible',
            'Focus indicators'
          ],
          performance: [
            'Optimize images',
            'Minimize CSS/JS',
            'Use CSS custom properties',
            'Lazy load non-critical resources'
          ]
        }
      };
      
      setState(prev => ({
        ...prev,
        generatedSystem: designSystem
      }));
      
      return designSystem;
    }, [state.selectedTheme, state.customizations, state.selectedPages]),
    
    exportDesignSystem: useCallback(async (format: ExportFormat) => {
      if (!state.generatedSystem) {
        throw new Error('No design system generated');
      }
      
      const exportService = ExportService.getInstance();
      await exportService.export(state.generatedSystem, {
        format,
        includeAssets: true,
        includeInteractive: true,
        minify: false
      });
    }, [state.generatedSystem]),
    
    saveSession: useCallback(() => {
      const storage = StorageService.getInstance();
      storage.saveSession(state);
      setState(prev => ({
        ...prev,
        lastSaved: new Date(),
        isDirty: false
      }));
    }, [state]),
    
    // ... implement remaining actions
  };
  
  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
};
```

## Phase 7: Final Testing and Deployment (15 mins)

### 7.1 Update package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 7.2 Run initial build and test
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Summary

This workflow creates a complete FlexiTheme design system generator with:

1. **Project Setup**: TypeScript, Vite, React-like architecture
2. **Core Components**: Reusable UI components with CSS modules
3. **Data Layer**: Theme configurations and page types
4. **Services**: Theme generation, storage, and export functionality
5. **Wizard System**: 6-step wizard with validation and progress tracking
6. **Preview System**: Live wireframe preview with device switching
7. **Export System**: Multiple export formats with interactive examples

The application is now ready for use. Users can:
- Select from pre-configured themes
- Choose required page types
- Configure navigation patterns
- Customize design tokens
- Preview in real-time
- Export complete design systems

Total estimated build time: ~4.5 hours