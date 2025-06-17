# FlexiTheme - Interactive Design System Generator

## Project Overview

FlexiTheme is a comprehensive web application that enables users to create custom design systems through an interactive, wizard-based interface. Users can select base UI styles, configure page layouts, customize navigation patterns, set authentication states, generate color palettes and typography, and export complete design systems with embedded interactive wireframes.

## Features

### Core Features
- **Style Selection Wizard**: 6-step guided process for creating design systems
- **Interactive Wireframe Preview**: Real-time responsive previews across devices
- **Theme Engine**: Dynamic design token generation with color variations
- **Page Type Library**: 16+ pre-configured page templates
- **Navigation Patterns**: Mobile and desktop navigation customization
- **Authentication States**: Signed-in/out state configurations
- **Design Customization**: Color palettes, typography, spacing systems
- **Export System**: Generate Markdown, HTML, and JSON outputs
- **Live Preview Panel**: Collapsible preview with device switching
- **Responsive Behavior**: Annotations for each viewport size

### Advanced Features
- **Component Library Generation**: Automatic component documentation
- **Design Principles**: Theme-specific guidelines and best practices
- **Interaction Patterns**: Scroll, hover, and touch interactions
- **Accessibility Support**: Full keyboard navigation and ARIA labels
- **Session Persistence**: LocalStorage for work-in-progress saves
- **Animation System**: Smooth transitions and micro-interactions

## Tech Stack

### Frontend
- **Languages**: TypeScript, HTML5, CSS3
- **Architecture**: Vanilla JS with ES6 modules
- **Styling**: CSS Custom Properties, CSS Grid, Flexbox
- **Build Tools**: Vite, ESBuild
- **Testing**: Vitest, Testing Library
- **Linting**: ESLint, Prettier

### Libraries & Tools
- **State Management**: Custom reactive state system
- **Routing**: Hash-based SPA routing
- **Animations**: CSS animations with JavaScript orchestration
- **Export**: FileSaver.js for file downloads
- **Icons**: Inline SVG icons
- **Fonts**: System font stack

### Development
- **Version Control**: Git
- **Package Manager**: npm
- **Development Server**: Vite dev server
- **Type Checking**: TypeScript strict mode

## User Journeys

### Journey 1: First-Time Design System Creation
1. User lands on welcome screen with overview
2. Clicks "Create Design System" to start wizard
3. **Step 1**: Browses and selects base style (Minimal, Modern, etc.)
4. **Step 2**: Selects needed page types from categorized grid
5. **Step 3**: Configures navigation for mobile/desktop
6. **Step 4**: Sets authentication states and user flows
7. **Step 5**: Customizes colors, fonts, and spacing
8. **Step 6**: Reviews and exports design system
9. Downloads files and implementation guide

### Journey 2: Quick Theme Generation
1. User returns with saved session
2. Loads previous configuration from localStorage
3. Makes quick adjustments to colors
4. Exports updated design system
5. Shares with team

### Journey 3: Interactive Exploration
1. User explores style catalogue
2. Clicks into specific styles to see page variations
3. Switches between device viewports
4. Reads responsive behavior annotations
5. Makes informed selection based on preview

## Pages & Routes

### Main Application Pages
```
/ (Home)
├── /catalogue (Style Catalogue)
├── /wizard (Design System Wizard)
│   ├── /wizard/style (Step 1: Style Selection)
│   ├── /wizard/pages (Step 2: Page Selection)
│   ├── /wizard/navigation (Step 3: Navigation)
│   ├── /wizard/auth (Step 4: Authentication)
│   ├── /wizard/design (Step 5: Customization)
│   └── /wizard/export (Step 6: Export)
├── /preview/:style/:page (Standalone Preview)
└── /docs (Documentation)
```

### Modal/Overlay Views
- Color Picker Modal
- Typography Selector
- Component Preview
- Export Options Dialog
- Keyboard Shortcuts Help

## Mock Data

### Theme Configurations
```typescript
const themes = {
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
          secondary: '#f8fafc'
        },
        border: {
          default: '#e2e8f0',
          focus: '#3b82f6'
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8'
        }
      },
      spacing: {
        unit: 8,
        scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128]
      },
      typography: {
        fontFamily: {
          sans: 'system-ui, -apple-system, sans-serif',
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
        }
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
    }
  },
  // ... more themes
};
```

### Page Types
```typescript
const pageTypes = [
  {
    id: 'landing-public',
    name: 'Public Landing Page',
    description: 'Marketing page for non-authenticated users',
    category: 'Landing',
    icon: 'home',
    sections: ['hero', 'features', 'testimonials', 'cta'],
    layouts: ['single-column', 'two-column', 'asymmetric'],
    authentication: false
  },
  {
    id: 'dashboard',
    name: 'User Dashboard',
    description: 'Personalized landing for authenticated users',
    category: 'Application',
    icon: 'dashboard',
    sections: ['header', 'stats', 'activity', 'quick-actions'],
    layouts: ['grid', 'sidebar', 'cards'],
    authentication: true
  },
  // ... more page types
];
```

### Navigation Patterns
```typescript
const navigationPatterns = {
  mobile: [
    {
      id: 'hamburger',
      name: 'Hamburger Menu',
      description: 'Classic slide-out navigation',
      position: 'top',
      behavior: 'overlay'
    },
    {
      id: 'bottom-tabs',
      name: 'Bottom Tab Bar',
      description: 'iOS-style bottom navigation',
      position: 'bottom',
      behavior: 'fixed'
    }
  ],
  desktop: [
    {
      id: 'horizontal',
      name: 'Horizontal Navigation',
      description: 'Traditional top navigation bar',
      position: 'top',
      behavior: 'sticky'
    },
    {
      id: 'sidebar',
      name: 'Sidebar Navigation',
      description: 'Vertical navigation panel',
      position: 'left',
      behavior: 'fixed'
    }
  ]
};
```

## State Management

### Application State Structure
```typescript
interface AppState {
  // Wizard Progress
  currentStep: number;
  completedSteps: Set<number>;
  canProceed: boolean;
  
  // User Selections
  selectedTheme: ThemeConfig | null;
  selectedPages: PageType[];
  navigationPreferences: {
    mobile: NavigationPattern;
    desktop: NavigationPattern;
  };
  authenticationStates: {
    requiresAuth: boolean;
    authPages: string[];
    publicPages: string[];
  };
  
  // Design Customizations
  customizations: {
    colors: CustomColors;
    typography: CustomTypography;
    spacing: CustomSpacing;
    components: ComponentOverrides;
  };
  
  // Generated System
  generatedSystem: DesignSystem | null;
  
  // UI State
  previewDevice: 'mobile' | 'tablet' | 'desktop';
  previewPanelOpen: boolean;
  activePreviewPage: string | null;
  
  // Session
  sessionId: string;
  lastSaved: Date | null;
  isDirty: boolean;
}
```

### State Actions
```typescript
const actions = {
  // Wizard Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  
  // Theme Selection
  selectTheme: (themeId: string) => void;
  customizeTheme: (customizations: Partial<ThemeConfig>) => void;
  
  // Page Management
  addPage: (pageId: string) => void;
  removePage: (pageId: string) => void;
  reorderPages: (pageIds: string[]) => void;
  
  // Navigation Configuration
  setMobileNav: (pattern: NavigationPattern) => void;
  setDesktopNav: (pattern: NavigationPattern) => void;
  
  // Design Customization
  updateColors: (colors: Partial<ColorSystem>) => void;
  updateTypography: (typography: Partial<TypographySystem>) => void;
  updateSpacing: (spacing: Partial<SpacingSystem>) => void;
  
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
};
```

## Services

### Theme Service
```typescript
class ThemeService {
  // Theme Management
  getThemes(): Promise<ThemeConfig[]>;
  getThemeById(id: string): Promise<ThemeConfig>;
  
  // Token Generation
  generateColorSystem(baseColors: Colors): ColorSystem;
  generateTypographyScale(config: TypographyConfig): TypographySystem;
  generateSpacingScale(unit: number): SpacingSystem;
  
  // Color Utilities
  lighten(color: string, amount: number): string;
  darken(color: string, amount: number): string;
  getContrastRatio(color1: string, color2: string): number;
  generateAccessiblePalette(baseColor: string): ColorPalette;
}
```

### Wireframe Service
```typescript
class WireframeService {
  // Wireframe Generation
  generateWireframe(config: WireframeConfig): WireframeElement;
  generatePageSections(page: PageType, theme: ThemeConfig): Section[];
  
  // Interactive Behaviors
  addInteractivity(element: WireframeElement): void;
  simulateScroll(container: HTMLElement): void;
  animateTransition(from: ViewportSize, to: ViewportSize): void;
  
  // Device Frames
  createDeviceFrame(device: ViewportSize): DeviceFrame;
  getDeviceDimensions(device: ViewportSize): Dimensions;
}
```

### Export Service
```typescript
class ExportService {
  // Export Formats
  exportAsMarkdown(system: DesignSystem): string;
  exportAsHTML(system: DesignSystem): string;
  exportAsJSON(system: DesignSystem): string;
  exportAsZip(system: DesignSystem): Promise<Blob>;
  
  // File Generation
  generateComponentDocs(components: Component[]): string;
  generateStyleGuide(tokens: DesignTokens): string;
  generateImplementationGuide(system: DesignSystem): string;
  
  // Download Utilities
  downloadFile(filename: string, content: string, mimeType: string): void;
  downloadZip(filename: string, files: FileMap): Promise<void>;
}
```

### Storage Service
```typescript
class StorageService {
  // Session Management
  saveSession(state: AppState): void;
  loadSession(sessionId: string): AppState | null;
  listSessions(): SessionInfo[];
  deleteSession(sessionId: string): void;
  
  // Preferences
  savePreferences(prefs: UserPreferences): void;
  loadPreferences(): UserPreferences;
  
  // Cache Management
  cacheThemeData(themes: ThemeConfig[]): void;
  getCachedThemes(): ThemeConfig[] | null;
  clearCache(): void;
}
```

## Custom Hooks

### useWizard
```typescript
function useWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  const canProceed = useCallback(() => {
    // Validation logic for current step
  }, [currentStep]);
  
  const nextStep = useCallback(() => {
    if (canProceed()) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  }, [currentStep, canProceed]);
  
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);
  
  return {
    currentStep,
    completedSteps,
    canProceed: canProceed(),
    nextStep,
    prevStep,
    progress: (currentStep / TOTAL_STEPS) * 100
  };
}
```

### useTheme
```typescript
function useTheme(themeId: string | null) {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  const [tokens, setTokens] = useState<DesignTokens | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    if (themeId) {
      loadTheme(themeId);
    }
  }, [themeId]);
  
  const generateTokens = useCallback(async (customizations?: Partial<ThemeConfig>) => {
    setIsGenerating(true);
    const generated = await themeService.generateTokens(theme, customizations);
    setTokens(generated);
    setIsGenerating(false);
  }, [theme]);
  
  return { theme, tokens, isGenerating, generateTokens };
}
```

### usePreview
```typescript
function usePreview() {
  const [device, setDevice] = useState<ViewportSize>('mobile');
  const [isOpen, setIsOpen] = useState(true);
  const [content, setContent] = useState<PreviewContent | null>(null);
  
  const updatePreview = useCallback((config: PreviewConfig) => {
    const newContent = wireframeService.generatePreview(config);
    setContent(newContent);
  }, []);
  
  const switchDevice = useCallback((newDevice: ViewportSize) => {
    setDevice(newDevice);
    // Trigger re-render with new viewport
  }, []);
  
  return {
    device,
    isOpen,
    content,
    setDevice: switchDevice,
    toggle: () => setIsOpen(prev => !prev),
    updatePreview
  };
}
```

### useLocalStorage
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue] as const;
}
```

## Type Definitions

### Core Types
```typescript
// Theme Types
interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  principles: DesignPrinciples;
  tokens: DesignTokens;
  navigation: NavigationConfig;
  components?: ComponentConfig;
}

interface DesignPrinciples {
  hierarchy: string;
  spacing: string;
  colors: string;
  typography: string;
  components: string;
}

interface DesignTokens {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
  animations?: AnimationTokens;
}

// Page Types
interface PageType {
  id: string;
  name: string;
  description: string;
  category: PageCategory;
  icon: string;
  sections: SectionType[];
  layouts: LayoutOption[];
  authentication: boolean;
  responsive: ResponsiveConfig;
}

interface Section {
  type: SectionType;
  required: boolean;
  props: SectionProps;
  variants?: SectionVariant[];
}

// Navigation Types
interface NavigationPattern {
  id: string;
  name: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  behavior: 'fixed' | 'sticky' | 'overlay';
  breakpoints?: BreakpointConfig;
}

interface NavigationConfig {
  mobile: NavigationPattern;
  desktop: NavigationPattern;
  tablet?: NavigationPattern;
}

// Component Types
interface Component {
  name: string;
  description: string;
  props: ComponentProps;
  variants: ComponentVariant[];
  responsive: ResponsiveBehavior;
  accessibility: A11yGuidelines;
  code: ComponentCode;
}

interface ComponentCode {
  html: string;
  css: string;
  javascript?: string;
  usage: string;
}

// Design System Types
interface DesignSystem {
  meta: SystemMetadata;
  tokens: DesignTokens;
  components: Component[];
  pages: PageTemplate[];
  guidelines: DesignGuidelines;
  assets?: AssetLibrary;
}

interface SystemMetadata {
  name: string;
  version: string;
  description: string;
  created: Date;
  theme: string;
  pages: string[];
}

// Export Types
type ExportFormat = 'markdown' | 'html' | 'json' | 'zip';

interface ExportOptions {
  format: ExportFormat;
  includeAssets: boolean;
  includeInteractive: boolean;
  minify: boolean;
}

// Utility Types
type ViewportSize = 'mobile' | 'tablet' | 'desktop';
type PageCategory = 'Landing' | 'Application' | 'Content' | 'Forms' | 'Commerce' | 'Social';
type SectionType = 'hero' | 'features' | 'testimonials' | 'cta' | 'form' | 'feed' | 'stats';

interface Dimensions {
  width: number;
  height: number;
}

interface ColorPalette {
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
```

## API Endpoints (Future Enhancement)

### Design System API
```typescript
// GET /api/themes
// Returns available theme configurations

// GET /api/themes/:id
// Returns specific theme details

// POST /api/design-systems
// Creates a new design system

// GET /api/design-systems/:id
// Retrieves saved design system

// PUT /api/design-systems/:id
// Updates existing design system

// POST /api/design-systems/:id/export
// Generates export in specified format

// GET /api/components
// Returns component library

// GET /api/page-types
// Returns available page types
```

## Performance Targets

- **Initial Load**: < 3 seconds
- **Step Navigation**: < 100ms
- **Preview Update**: < 200ms
- **Export Generation**: < 5 seconds
- **Animation FPS**: 60fps
- **Memory Usage**: < 100MB

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 8+

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support
- Focus indicators
- ARIA labels and descriptions

## Security Considerations

- Content Security Policy headers
- Input sanitization for custom values
- XSS prevention in generated output
- Safe color value validation
- No external dependencies for core functionality
- LocalStorage encryption for sensitive data

## Interactive Wireframe

<details>
<summary>Click to view interactive wireframe mockup</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexiTheme Interactive Wireframe</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; background: #f0f2f5; }
        
        .wireframe-container {
            max-width: 1400px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        /* Header */
        .header {
            background: #1e293b;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo { font-size: 1.5rem; font-weight: bold; }
        .header-actions { display: flex; gap: 1rem; }
        .btn-header {
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            color: white;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-header:hover { background: rgba(255,255,255,0.2); }
        
        /* Main Layout */
        .main-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            height: calc(100vh - 80px);
        }
        
        /* Wizard Section */
        .wizard-section {
            padding: 2rem;
            overflow-y: auto;
        }
        
        /* Step Indicator */
        .step-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3rem;
            position: relative;
        }
        
        .step-indicator::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: #e2e8f0;
            z-index: 0;
        }
        
        .step {
            position: relative;
            z-index: 1;
            text-align: center;
            flex: 1;
        }
        
        .step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            border: 2px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            font-weight: bold;
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .step.active .step-circle {
            background: #3b82f6;
            border-color: #3b82f6;
            color: white;
        }
        
        .step.completed .step-circle {
            background: #10b981;
            border-color: #10b981;
            color: white;
        }
        
        .step-label {
            font-size: 0.875rem;
            color: #64748b;
        }
        
        .step.active .step-label { color: #1e293b; font-weight: 500; }
        
        /* Content Area */
        .content-area {
            background: #f8fafc;
            border-radius: 8px;
            padding: 2rem;
            min-height: 400px;
        }
        
        .content-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .content-subtitle {
            color: #64748b;
            margin-bottom: 2rem;
        }
        
        /* Style Grid */
        .style-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }
        
        .style-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .style-card:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .style-card.selected {
            border-color: #3b82f6;
            background: #eff6ff;
        }
        
        .style-preview {
            height: 120px;
            background: #f1f5f9;
            border-radius: 4px;
            margin-bottom: 1rem;
            position: relative;
            overflow: hidden;
        }
        
        .style-preview-content {
            position: absolute;
            inset: 10px;
        }
        
        .preview-nav {
            height: 20px;
            background: #cbd5e1;
            border-radius: 3px;
            margin-bottom: 8px;
        }
        
        .preview-hero {
            height: 40px;
            background: linear-gradient(135deg, #818cf8, #c084fc);
            border-radius: 4px;
            margin-bottom: 8px;
        }
        
        .preview-cards {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 4px;
        }
        
        .preview-card {
            height: 25px;
            background: #e2e8f0;
            border-radius: 2px;
        }
        
        .style-name {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .style-description {
            font-size: 0.875rem;
            color: #64748b;
        }
        
        /* Navigation Controls */
        .wizard-controls {
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-secondary {
            background: white;
            border: 1px solid #e2e8f0;
            color: #64748b;
        }
        
        .btn-secondary:hover {
            border-color: #cbd5e1;
            color: #475569;
        }
        
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2563eb;
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        /* Preview Panel */
        .preview-panel {
            background: white;
            border-left: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
        }
        
        .preview-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .preview-title {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .device-selector {
            display: flex;
            background: #f1f5f9;
            border-radius: 6px;
            padding: 0.25rem;
        }
        
        .device-btn {
            padding: 0.5rem 1rem;
            border: none;
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .device-btn.active {
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .preview-viewport {
            flex: 1;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            overflow: auto;
        }
        
        .device-frame {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: all 0.3s;
        }
        
        .device-frame.mobile {
            width: 375px;
            height: 667px;
            border: 10px solid #1e293b;
            border-radius: 24px;
        }
        
        .device-frame.tablet {
            width: 768px;
            height: 600px;
            border: 8px solid #1e293b;
            border-radius: 16px;
        }
        
        .device-frame.desktop {
            width: 100%;
            max-width: 900px;
            height: 600px;
            border: 2px solid #e2e8f0;
        }
        
        .frame-content {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            background: white;
        }
        
        /* Interactive Elements */
        .interactive {
            cursor: pointer;
            position: relative;
        }
        
        .interactive::after {
            content: '';
            position: absolute;
            inset: -2px;
            border: 2px dashed #3b82f6;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        
        .interactive:hover::after {
            opacity: 1;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-out;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .main-layout {
                grid-template-columns: 1fr;
            }
            
            .preview-panel {
                display: none;
            }
        }
        
        /* Page Selection */
        .page-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .page-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .page-card:hover {
            border-color: #cbd5e1;
        }
        
        .page-card.selected {
            border-color: #3b82f6;
            background: #eff6ff;
        }
        
        .page-icon {
            width: 40px;
            height: 40px;
            background: #f1f5f9;
            border-radius: 8px;
            margin-bottom: 0.75rem;
        }
        
        .page-name {
            font-weight: 500;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        
        .page-category {
            font-size: 0.75rem;
            color: #64748b;
            background: #f1f5f9;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
        }
        
        /* Navigation Configuration */
        .nav-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        
        .nav-option {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .nav-option:hover {
            border-color: #cbd5e1;
        }
        
        .nav-option.selected {
            border-color: #3b82f6;
            background: #eff6ff;
        }
        
        .nav-preview {
            height: 80px;
            background: #f8fafc;
            border-radius: 4px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Color Customization */
        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .color-item {
            text-align: center;
        }
        
        .color-swatch {
            width: 100%;
            height: 80px;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .color-swatch:hover {
            transform: scale(1.05);
        }
        
        .color-label {
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .color-value {
            font-size: 0.75rem;
            color: #64748b;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="wireframe-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">FlexiTheme</div>
            <div class="header-actions">
                <button class="btn-header">Save Progress</button>
                <button class="btn-header">Documentation</button>
            </div>
        </div>
        
        <!-- Main Layout -->
        <div class="main-layout">
            <!-- Wizard Section -->
            <div class="wizard-section">
                <!-- Step Indicator -->
                <div class="step-indicator">
                    <div class="step completed" onclick="showStep(1)">
                        <div class="step-circle">✓</div>
                        <div class="step-label">Style</div>
                    </div>
                    <div class="step active" onclick="showStep(2)">
                        <div class="step-circle">2</div>
                        <div class="step-label">Pages</div>
                    </div>
                    <div class="step" onclick="showStep(3)">
                        <div class="step-circle">3</div>
                        <div class="step-label">Navigation</div>
                    </div>
                    <div class="step" onclick="showStep(4)">
                        <div class="step-circle">4</div>
                        <div class="step-label">Auth</div>
                    </div>
                    <div class="step" onclick="showStep(5)">
                        <div class="step-circle">5</div>
                        <div class="step-label">Design</div>
                    </div>
                    <div class="step" onclick="showStep(6)">
                        <div class="step-circle">6</div>
                        <div class="step-label">Export</div>
                    </div>
                </div>
                
                <!-- Content Area -->
                <div class="content-area fade-in">
                    <h2 class="content-title">Select Page Types</h2>
                    <p class="content-subtitle">Choose the pages your application will need</p>
                    
                    <!-- Page Selection Grid -->
                    <div class="page-grid">
                        <div class="page-card selected">
                            <div class="page-icon"></div>
                            <div class="page-name">Public Landing</div>
                            <span class="page-category">Landing</span>
                        </div>
                        <div class="page-card selected">
                            <div class="page-icon"></div>
                            <div class="page-name">User Dashboard</div>
                            <span class="page-category">Application</span>
                        </div>
                        <div class="page-card">
                            <div class="page-icon"></div>
                            <div class="page-name">Feature Page</div>
                            <span class="page-category">Content</span>
                        </div>
                        <div class="page-card">
                            <div class="page-icon"></div>
                            <div class="page-name">Form Page</div>
                            <span class="page-category">Forms</span>
                        </div>
                        <div class="page-card selected">
                            <div class="page-icon"></div>
                            <div class="page-name">Content Page</div>
                            <span class="page-category">Content</span>
                        </div>
                        <div class="page-card">
                            <div class="page-icon"></div>
                            <div class="page-name">Feed Page</div>
                            <span class="page-category">Social</span>
                        </div>
                        <div class="page-card">
                            <div class="page-icon"></div>
                            <div class="page-name">Item Details</div>
                            <span class="page-category">Details</span>
                        </div>
                        <div class="page-card">
                            <div class="page-icon"></div>
                            <div class="page-name">Filter & Search</div>
                            <span class="page-category">Search</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem; padding: 1rem; background: #eff6ff; border-radius: 6px;">
                        <strong style="color: #3b82f6;">3 pages selected</strong>
                        <p style="font-size: 0.875rem; color: #64748b; margin-top: 0.25rem;">
                            You can add more pages later or customize these selections
                        </p>
                    </div>
                </div>
                
                <!-- Navigation Controls -->
                <div class="wizard-controls">
                    <button class="btn btn-secondary">
                        ← Previous
                    </button>
                    <button class="btn btn-primary">
                        Next Step →
                    </button>
                </div>
            </div>
            
            <!-- Preview Panel -->
            <div class="preview-panel">
                <div class="preview-header">
                    <div class="preview-title">
                        <span>Live Preview</span>
                        <span style="font-size: 0.875rem; color: #64748b;">Public Landing</span>
                    </div>
                    <div class="device-selector">
                        <button class="device-btn active">Mobile</button>
                        <button class="device-btn">Tablet</button>
                        <button class="device-btn">Desktop</button>
                    </div>
                </div>
                
                <div class="preview-viewport">
                    <div class="device-frame mobile">
                        <div class="frame-content">
                            <!-- Mobile Preview Content -->
                            <div style="height: 60px; background: #1e293b; display: flex; align-items: center; padding: 0 1rem; justify-content: space-between;">
                                <div style="width: 80px; height: 20px; background: rgba(255,255,255,0.2); border-radius: 3px;"></div>
                                <div style="width: 24px; height: 20px; background: rgba(255,255,255,0.2); border-radius: 2px;"></div>
                            </div>
                            <div style="height: 300px; background: linear-gradient(135deg, #667eea, #764ba2); padding: 2rem;">
                                <div style="width: 80%; height: 30px; background: rgba(255,255,255,0.9); border-radius: 4px; margin: 0 auto 1rem;"></div>
                                <div style="width: 60%; height: 20px; background: rgba(255,255,255,0.7); border-radius: 3px; margin: 0 auto 2rem;"></div>
                                <div style="width: 120px; height: 40px; background: #f59e0b; border-radius: 6px; margin: 0 auto;"></div>
                            </div>
                            <div style="padding: 2rem 1rem;">
                                <div style="background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 1rem;">
                                    <div style="width: 80%; height: 16px; background: #e2e8f0; border-radius: 3px; margin-bottom: 0.75rem;"></div>
                                    <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 2px; margin-bottom: 0.5rem;"></div>
                                    <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 2px; margin-bottom: 0.5rem;"></div>
                                    <div style="width: 70%; height: 12px; background: #f1f5f9; border-radius: 2px;"></div>
                                </div>
                                <div style="background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 1rem;">
                                    <div style="width: 80%; height: 16px; background: #e2e8f0; border-radius: 3px; margin-bottom: 0.75rem;"></div>
                                    <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 2px; margin-bottom: 0.5rem;"></div>
                                    <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 2px; margin-bottom: 0.5rem;"></div>
                                    <div style="width: 70%; height: 12px; background: #f1f5f9; border-radius: 2px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Simple interactivity for demonstration
        function showStep(step) {
            // Update step indicators
            document.querySelectorAll('.step').forEach((el, index) => {
                el.classList.remove('active', 'completed');
                if (index + 1 < step) el.classList.add('completed');
                if (index + 1 === step) el.classList.add('active');
            });
            
            // Update content based on step
            const contentArea = document.querySelector('.content-area');
            contentArea.classList.remove('fade-in');
            setTimeout(() => contentArea.classList.add('fade-in'), 10);
        }
        
        // Add click handlers for cards
        document.querySelectorAll('.page-card').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                updateSelectedCount();
            });
        });
        
        function updateSelectedCount() {
            const selected = document.querySelectorAll('.page-card.selected').length;
            // Update count display
        }
        
        // Device switching
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const frame = document.querySelector('.device-frame');
                frame.className = 'device-frame ' + btn.textContent.toLowerCase();
            });
        });
    </script>
</body>
</html>
```

</details>

This interactive wireframe demonstrates:
- 6-step wizard navigation with progress tracking
- Style selection cards with visual previews
- Page type selection with categories
- Live preview panel with device switching
- Responsive layout that adapts to screen size
- Interactive elements with hover states
- Clean, modern design following the project specifications

## Future Enhancements

1. **Cloud Sync**: User accounts with cloud storage
2. **Team Collaboration**: Share and collaborate on design systems
3. **AI Suggestions**: ML-powered theme recommendations
4. **Plugin System**: Extend with custom components
5. **Version Control**: Track design system changes
6. **Integration APIs**: Connect with design tools
7. **Component Marketplace**: Share community components
8. **Analytics Dashboard**: Usage insights and patterns