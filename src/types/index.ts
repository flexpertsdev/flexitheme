export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  transitions: {
    fast: string;
    base: string;
    slow: string;
  };
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType;
  isComplete: boolean;
}

export interface ProjectInfo {
  name: string;
  description: string;
  author: string;
  version: string;
  targetFramework: 'react' | 'vue' | 'angular' | 'vanilla';
}

export interface UIStyle {
  id: string;
  name: string;
  description: string;
  preview: string;
  tokens: DeepPartial<DesignTokens>;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'dashboard' | 'form' | 'list' | 'detail' | 'auth';
  components: string[];
  layout: string;
}

export interface ComponentConfig {
  id: string;
  name: string;
  category: string;
  variants: string[];
  props: Record<string, any>;
}

export interface WireframeConfig {
  viewport: 'mobile' | 'tablet' | 'desktop';
  showGrid: boolean;
  showLabels: boolean;
  interactive: boolean;
}

export interface ExportFormat {
  type: 'json' | 'css' | 'scss' | 'tailwind' | 'styled-components';
  includeDocumentation: boolean;
  includeExamples: boolean;
}

export interface DesignSystemState {
  projectInfo: ProjectInfo;
  uiStyle: UIStyle | null;
  designTokens: DesignTokens;
  selectedPages: PageTemplate[];
  selectedComponents: ComponentConfig[];
  wireframeConfig: WireframeConfig;
  exportFormat: ExportFormat;
  currentStep: number;
}

export interface GeneratedOutput {
  tokens: DesignTokens;
  styles: Record<string, string>;
  components: Record<string, string>;
  documentation: string;
  examples: Record<string, string>;
  wireframe: string;
}
