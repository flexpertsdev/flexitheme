import { createContext, useContext, useReducer, ReactNode, FC } from 'react';
import {
  DesignSystemState,
  DesignTokens,
  UIStyle,
  PageTemplate,
  ComponentConfig,
  ProjectInfo,
  WireframeConfig,
  ExportFormat,
} from '../types';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface DesignSystemContextType {
  state: DesignSystemState;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: 'SET_PROJECT_INFO'; payload: ProjectInfo }
  | { type: 'SET_UI_STYLE'; payload: UIStyle }
  | { type: 'UPDATE_DESIGN_TOKENS'; payload: Partial<DesignTokens> }
  | { type: 'ADD_PAGE_TEMPLATE'; payload: PageTemplate }
  | { type: 'REMOVE_PAGE_TEMPLATE'; payload: string }
  | { type: 'ADD_COMPONENT'; payload: ComponentConfig }
  | { type: 'REMOVE_COMPONENT'; payload: string }
  | { type: 'UPDATE_WIREFRAME_CONFIG'; payload: Partial<WireframeConfig> }
  | { type: 'SET_EXPORT_FORMAT'; payload: ExportFormat }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'RESET_STATE' };

const initialState: DesignSystemState = {
  projectInfo: {
    name: '',
    description: '',
    author: '',
    version: '1.0.0',
    targetFramework: 'react',
  },
  uiStyle: null,
  designTokens: {
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
      secondary: {
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
      },
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
      },
      success: {
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
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      info: {
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
    typography: {
      fontFamily: {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'Menlo, Monaco, Consolas, "Liberation Mono", monospace',
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
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '5rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    },
    transitions: {
      fast: '150ms ease',
      base: '250ms ease',
      slow: '350ms ease',
    },
  },
  selectedPages: [],
  selectedComponents: [],
  wireframeConfig: {
    viewport: 'desktop',
    showGrid: true,
    showLabels: true,
    interactive: true,
  },
  exportFormat: {
    type: 'json',
    includeDocumentation: true,
    includeExamples: true,
  },
  currentStep: 1,
};

function mergeDeepPartial<T>(target: T, partial: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in partial) {
    if (
      partial[key] !== undefined &&
      typeof partial[key] === 'object' &&
      !Array.isArray(partial[key])
    ) {
      result[key] = mergeDeepPartial(target[key] as any, partial[key] as any);
    } else if (partial[key] !== undefined) {
      result[key] = partial[key] as any;
    }
  }

  return result;
}

function designSystemReducer(state: DesignSystemState, action: Action): DesignSystemState {
  switch (action.type) {
    case 'SET_PROJECT_INFO':
      return { ...state, projectInfo: action.payload };

    case 'SET_UI_STYLE':
      return {
        ...state,
        uiStyle: action.payload,
        designTokens: action.payload.tokens
          ? mergeDeepPartial(state.designTokens, action.payload.tokens)
          : state.designTokens,
      };

    case 'UPDATE_DESIGN_TOKENS':
      return {
        ...state,
        designTokens: { ...state.designTokens, ...action.payload },
      };

    case 'ADD_PAGE_TEMPLATE':
      return {
        ...state,
        selectedPages: [...state.selectedPages, action.payload],
      };

    case 'REMOVE_PAGE_TEMPLATE':
      return {
        ...state,
        selectedPages: state.selectedPages.filter((page) => page.id !== action.payload),
      };

    case 'ADD_COMPONENT':
      return {
        ...state,
        selectedComponents: [...state.selectedComponents, action.payload],
      };

    case 'REMOVE_COMPONENT':
      return {
        ...state,
        selectedComponents: state.selectedComponents.filter((comp) => comp.id !== action.payload),
      };

    case 'UPDATE_WIREFRAME_CONFIG':
      return {
        ...state,
        wireframeConfig: { ...state.wireframeConfig, ...action.payload },
      };

    case 'SET_EXPORT_FORMAT':
      return { ...state, exportFormat: action.payload };

    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export const DesignSystemProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designSystemReducer, initialState);

  return (
    <DesignSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};
