# FlexiTheme Design System Output Structure

## Overview
This document defines the structured output format that FlexiTheme generates when a user completes the design system creation process. The output is designed to be both human-readable and machine-parsable, enabling seamless integration with various development workflows.

## Output Directory Structure

```
my-design-system/
├── README.md                    # Overview and quick start guide
├── design-system.json           # Complete configuration in JSON
├── IMPLEMENTATION_GUIDE.md      # Detailed implementation instructions
├── CLAUDE_WORKFLOWS.md          # Claude Code Assistant workflows
│
├── tokens/                      # Design tokens
│   ├── colors.css              # CSS custom properties for colors
│   ├── typography.css          # Typography system
│   ├── spacing.css             # Spacing scale
│   ├── shadows.css             # Shadow definitions
│   ├── tokens.json             # All tokens in JSON format
│   └── tokens.js               # JavaScript/TypeScript exports
│
├── components/                  # Component library
│   ├── index.html              # Component showcase
│   ├── components.css          # Compiled component styles
│   ├── components.js           # Component behaviors
│   └── [component-name]/       # Individual components
│       ├── README.md
│       ├── component.html
│       ├── component.css
│       ├── component.js
│       └── examples.html
│
├── pages/                       # Page templates
│   └── [page-type]/
│       ├── README.md
│       ├── template.html
│       ├── styles.css
│       ├── responsive.md
│       └── wireframes/
│           ├── mobile.html
│           ├── tablet.html
│           └── desktop.html
│
├── patterns/                    # UI patterns
│   ├── navigation/
│   ├── forms/
│   ├── layouts/
│   └── interactions/
│
├── assets/                      # Static assets
│   ├── icons/
│   ├── images/
│   └── fonts/
│
└── tools/                       # Development tools
    ├── theme-switcher.js        # Runtime theme switching
    ├── token-generator.js       # Generate custom tokens
    └── component-generator/     # CLI for new components
```

## Core Output Files

### 1. design-system.json
The master configuration file containing all design decisions:

```json
{
  "version": "1.0.0",
  "metadata": {
    "name": "My Design System",
    "created": "2024-01-20T10:00:00Z",
    "generator": "FlexiTheme v1.0",
    "theme": "minimal",
    "checksum": "sha256:abc123..."
  },
  "tokens": {
    "colors": {
      "primary": {
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
        "DEFAULT": "#3b82f6"
      },
      "semantic": {
        "background": {
          "default": "var(--color-white)",
          "subtle": "var(--color-gray-50)",
          "muted": "var(--color-gray-100)"
        },
        "text": {
          "default": "var(--color-gray-900)",
          "muted": "var(--color-gray-600)",
          "subtle": "var(--color-gray-500)",
          "inverse": "var(--color-white)"
        },
        "border": {
          "default": "var(--color-gray-200)",
          "muted": "var(--color-gray-100)",
          "strong": "var(--color-gray-300)"
        }
      }
    },
    "typography": {
      "fontFamilies": {
        "sans": "system-ui, -apple-system, sans-serif",
        "serif": "Georgia, 'Times New Roman', serif",
        "mono": "Menlo, Monaco, monospace"
      },
      "fontSizes": {
        "xs": { "value": "0.75rem", "lineHeight": "1rem" },
        "sm": { "value": "0.875rem", "lineHeight": "1.25rem" },
        "base": { "value": "1rem", "lineHeight": "1.5rem" },
        "lg": { "value": "1.125rem", "lineHeight": "1.75rem" },
        "xl": { "value": "1.25rem", "lineHeight": "1.75rem" },
        "2xl": { "value": "1.5rem", "lineHeight": "2rem" },
        "3xl": { "value": "1.875rem", "lineHeight": "2.25rem" },
        "4xl": { "value": "2.25rem", "lineHeight": "2.5rem" }
      },
      "fontWeights": {
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      }
    },
    "spacing": {
      "scale": {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem"
      }
    },
    "borderRadius": {
      "none": "0",
      "sm": "0.125rem",
      "base": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "2xl": "1rem",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "base": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    }
  },
  "components": [
    {
      "id": "button",
      "name": "Button",
      "variants": ["primary", "secondary", "ghost", "danger"],
      "sizes": ["sm", "md", "lg"],
      "states": ["default", "hover", "active", "disabled", "loading"]
    },
    {
      "id": "card",
      "name": "Card",
      "variants": ["default", "bordered", "elevated"],
      "sizes": ["sm", "md", "lg", "full"]
    }
  ],
  "pages": [
    {
      "id": "landing-public",
      "name": "Public Landing Page",
      "sections": ["hero", "features", "testimonials", "cta"],
      "layouts": {
        "mobile": "single-column",
        "tablet": "two-column",
        "desktop": "asymmetric"
      }
    }
  ],
  "navigation": {
    "patterns": {
      "mobile": {
        "type": "hamburger",
        "position": "top-right",
        "behavior": "overlay"
      },
      "desktop": {
        "type": "horizontal",
        "position": "top",
        "behavior": "sticky"
      }
    }
  },
  "guidelines": {
    "principles": [
      "Clarity over cleverness",
      "Consistency builds trust",
      "Performance is a feature",
      "Accessibility is not optional"
    ],
    "accessibility": {
      "colorContrast": "WCAG AA",
      "focusIndicators": true,
      "keyboardNavigation": "full",
      "screenReaderSupport": true
    }
  }
}
```

### 2. tokens/tokens.css
Ready-to-use CSS custom properties:

```css
/* FlexiTheme Design Tokens - Auto-generated */
:root {
  /* Color Tokens */
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
  
  /* Semantic Colors */
  --color-background: var(--color-white);
  --color-background-subtle: var(--color-gray-50);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-200);
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: Menlo, Monaco, monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* Spacing */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-popover: 1050;
  --z-tooltip: 1060;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-gray-900);
    --color-background-subtle: var(--color-gray-800);
    --color-text: var(--color-gray-100);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
  }
}
```

### 3. CLAUDE_WORKFLOWS.md
Integration guide for Claude Code Assistant:

```markdown
# Claude Code Assistant Workflows for [Design System Name]

This file contains self-executing workflows that guide Claude Code Assistant to help you implement and maintain your design system.

## Available Workflows

### 1. Theme Migration Workflow
Analyzes an existing project and replaces the current theme with your new design system.

**Trigger:** "Migrate my project to use the new design system"

### 2. New Project Setup
Creates a new project structure using your design system from scratch.

**Trigger:** "Set up a new project with my design system"

### 3. Component Library Builder
Generates new components following your design system patterns.

**Trigger:** "Create a new component following the design system"

## Workflow Configuration

```json
{
  "design_system": {
    "name": "My Design System",
    "version": "1.0.0",
    "path": "./design-system.json"
  },
  "preferences": {
    "framework": null,
    "language": "typescript",
    "styling": "css-modules",
    "testing": true
  }
}
```

## Quick Commands

- `@theme-check` - Verify current theme consistency
- `@token-update [token-name]` - Update a specific design token
- `@component-audit` - Audit components for design system compliance
- `@generate-docs` - Generate documentation for custom components
```

## Implementation Workflows

### Workflow 1: Theme Migration
```markdown
# WORKFLOW_THEME_MIGRATION.md

## Analyze and Replace Existing Theme - Self-Executing Workflow

### Phase 1: Project Analysis (15 minutes)

1. **Scan Project Structure**
   ```bash
   # Identify project type and structure
   find . -type f \( -name "*.css" -o -name "*.scss" -o -name "*.less" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.vue" -o -name "*.svelte" \) | head -20
   
   # Check for existing theme files
   find . -type f \( -name "*theme*" -o -name "*style*" -o -name "*design*" \) -name "*.css" -o -name "*.json" | grep -v node_modules
   
   # Identify CSS framework usage
   grep -r "tailwind\|bootstrap\|material\|ant-design\|chakra" . --include="*.json" --include="*.js" --include="*.css" | head -10
   ```

2. **Collect User Preferences**
   ```
   QUESTION 1: What framework/library is your project using?
   [ ] React
   [ ] Vue
   [ ] Angular
   [ ] Svelte
   [ ] Vanilla JS
   [ ] Other: ___________

   QUESTION 2: What is your current styling approach?
   [ ] CSS Modules
   [ ] Styled Components
   [ ] Emotion
   [ ] Tailwind CSS
   [ ] Sass/SCSS
   [ ] Plain CSS
   [ ] Other: ___________

   QUESTION 3: Do you want to preserve any existing styles?
   [ ] No, replace everything
   [ ] Yes, specific components: ___________
   [ ] Yes, merge with new theme

   QUESTION 4: Backup preference?
   [ ] Create full backup
   [ ] Create theme files backup only
   [ ] No backup needed
   ```

### Phase 2: Theme Extraction (20 minutes)

1. **Extract Current Theme Values**
   ```javascript
   // theme-extractor.js
   const fs = require('fs');
   const path = require('path');
   const postcss = require('postcss');
   const glob = require('glob');

   class ThemeExtractor {
     constructor() {
       this.colors = new Map();
       this.fonts = new Map();
       this.spacing = new Map();
       this.borders = new Map();
       this.shadows = new Map();
     }

     async analyzeProject(projectPath) {
       const files = glob.sync('**/*.{css,scss,less}', {
         cwd: projectPath,
         ignore: ['node_modules/**', 'dist/**', 'build/**']
       });

       for (const file of files) {
         await this.analyzeFile(path.join(projectPath, file));
       }

       return this.generateReport();
     }

     async analyzeFile(filePath) {
       const css = fs.readFileSync(filePath, 'utf8');
       const root = postcss.parse(css);

       root.walkDecls((decl) => {
         // Extract colors
         const colorMatch = decl.value.match(/#[0-9a-fA-F]{3,8}|rgb|hsl/);
         if (colorMatch) {
           this.colors.set(decl.value, (this.colors.get(decl.value) || 0) + 1);
         }

         // Extract fonts
         if (decl.prop === 'font-family') {
           this.fonts.set(decl.value, (this.fonts.get(decl.value) || 0) + 1);
         }

         // Extract spacing
         if (['margin', 'padding'].some(prop => decl.prop.includes(prop))) {
           const values = decl.value.split(' ');
           values.forEach(v => {
             if (v.match(/\d+(px|rem|em)/)) {
               this.spacing.set(v, (this.spacing.get(v) || 0) + 1);
             }
           });
         }
       });
     }

     generateReport() {
       return {
         colors: [...this.colors.entries()].sort((a, b) => b[1] - a[1]),
         fonts: [...this.fonts.entries()].sort((a, b) => b[1] - a[1]),
         spacing: [...this.spacing.entries()].sort((a, b) => b[1] - a[1]),
         summary: {
           totalColors: this.colors.size,
           totalFonts: this.fonts.size,
           totalSpacingValues: this.spacing.size
         }
       };
     }
   }
   ```

2. **Create Theme Mapping**
   ```javascript
   // theme-mapper.js
   class ThemeMapper {
     constructor(oldTheme, newDesignSystem) {
       this.oldTheme = oldTheme;
       this.newDesignSystem = newDesignSystem;
       this.mappings = new Map();
     }

     generateMappings() {
       // Map old colors to new design system colors
       this.mapColors();
       this.mapTypography();
       this.mapSpacing();
       this.mapComponents();

       return this.mappings;
     }

     mapColors() {
       const oldColors = this.oldTheme.colors;
       const newColors = this.newDesignSystem.tokens.colors;

       oldColors.forEach(([color, usage]) => {
         const closest = this.findClosestColor(color, newColors);
         this.mappings.set(color, {
           type: 'color',
           old: color,
           new: closest.token,
           usage: usage,
           confidence: closest.confidence
         });
       });
     }

     findClosestColor(oldColor, newColors) {
       // Color matching logic
       // Returns { token: 'var(--color-primary-500)', confidence: 0.95 }
     }
   }
   ```

### Phase 3: Migration Execution (30 minutes)

1. **Create Migration Plan**
   ```javascript
   // migration-plan.js
   class MigrationPlan {
     constructor(mappings, options) {
       this.mappings = mappings;
       this.options = options;
       this.plan = [];
     }

     generate() {
       // Group files by type
       const fileGroups = this.groupFilesByType();

       // Create migration steps
       fileGroups.forEach(group => {
         this.plan.push({
           step: this.plan.length + 1,
           type: group.type,
           files: group.files,
           strategy: this.getStrategy(group.type),
           estimatedTime: this.estimateTime(group.files.length)
         });
       });

       return this.plan;
     }

     execute() {
       this.plan.forEach(step => {
         console.log(`Executing step ${step.step}: ${step.type}`);
         
         switch(step.strategy) {
           case 'direct-replace':
             this.directReplace(step.files);
             break;
           case 'ast-transform':
             this.astTransform(step.files);
             break;
           case 'manual-review':
             this.flagForReview(step.files);
             break;
         }
       });
     }
   }
   ```

2. **Execute Migration**
   ```javascript
   // migration-executor.js
   const postcss = require('postcss');
   const tokenReplace = require('./postcss-token-replace');

   class MigrationExecutor {
     async migrateCSS(filePath, mappings) {
       const css = fs.readFileSync(filePath, 'utf8');
       
       const result = await postcss([
         tokenReplace({ mappings })
       ]).process(css, { from: filePath });

       // Backup original
       fs.writeFileSync(`${filePath}.backup`, css);
       
       // Write migrated version
       fs.writeFileSync(filePath, result.css);
     }

     async migrateJSX(filePath, mappings) {
       const babel = require('@babel/core');
       const traverse = require('@babel/traverse').default;

       const code = fs.readFileSync(filePath, 'utf8');
       const ast = babel.parse(code, {
         sourceType: 'module',
         plugins: ['jsx', 'typescript']
       });

       traverse(ast, {
         JSXAttribute(path) {
           if (path.node.name.name === 'style' || 
               path.node.name.name === 'className') {
             // Transform inline styles and class names
             this.transformStyleAttribute(path, mappings);
           }
         }
       });

       const output = babel.transformFromAstSync(ast, code);
       fs.writeFileSync(filePath, output.code);
     }
   }
   ```

### Phase 4: Validation and Cleanup (15 minutes)

1. **Validate Migration**
   ```javascript
   // validation.js
   class MigrationValidator {
     async validate(projectPath) {
       const issues = [];

       // Check for unmapped values
       const unmapped = await this.findUnmappedValues(projectPath);
       if (unmapped.length > 0) {
         issues.push({
           type: 'unmapped-values',
           severity: 'warning',
           items: unmapped
         });
       }

       // Check for broken styles
       const broken = await this.findBrokenStyles(projectPath);
       if (broken.length > 0) {
         issues.push({
           type: 'broken-styles',
           severity: 'error',
           items: broken
         });
       }

       // Visual regression test
       if (this.options.visualTest) {
         const regressions = await this.visualRegression(projectPath);
         if (regressions.length > 0) {
           issues.push({
             type: 'visual-regression',
             severity: 'warning',
             items: regressions
           });
         }
       }

       return {
         success: issues.filter(i => i.severity === 'error').length === 0,
         issues
       };
     }
   }
   ```

2. **Generate Migration Report**
   ```markdown
   # Theme Migration Report

   ## Summary
   - **Files Processed**: 127
   - **Tokens Replaced**: 1,543
   - **Success Rate**: 98.2%
   - **Manual Reviews Required**: 3

   ## Replacements Made
   
   ### Colors (1,234 replacements)
   - `#007bff` → `var(--color-primary-500)` (456 instances)
   - `#6c757d` → `var(--color-gray-600)` (234 instances)
   - `rgb(255, 255, 255)` → `var(--color-white)` (544 instances)

   ### Typography (189 replacements)
   - `font-size: 14px` → `font-size: var(--text-sm)`
   - `font-family: Helvetica` → `font-family: var(--font-sans)`

   ### Spacing (120 replacements)
   - `margin: 10px` → `margin: var(--space-2)`
   - `padding: 20px` → `padding: var(--space-5)`

   ## Files Requiring Manual Review
   
   1. `src/components/CustomChart.jsx`
      - Complex color calculations that need manual mapping
   
   2. `src/styles/animations.css`
      - Custom animations that may need design system alignment
   
   3. `src/legacy/OldButton.css`
      - Deprecated component - consider removing

   ## Next Steps
   
   1. Review flagged files
   2. Run test suite
   3. Perform visual QA
   4. Update documentation
   ```

### User Interaction Points

The workflow pauses at these points for user input:

1. **Project Type Selection** - User selects their framework and styling approach
2. **Backup Confirmation** - User confirms backup strategy
3. **Mapping Review** - User reviews and approves automatic mappings
4. **Conflict Resolution** - User decides on ambiguous replacements
5. **Final Validation** - User approves the migration results

### Error Handling

```javascript
class MigrationErrorHandler {
  handle(error, context) {
    switch(error.type) {
      case 'PARSE_ERROR':
        return this.handleParseError(error, context);
      case 'MAPPING_CONFLICT':
        return this.handleMappingConflict(error, context);
      case 'FILE_ACCESS':
        return this.handleFileAccess(error, context);
      default:
        return this.handleGenericError(error, context);
    }
  }

  async rollback(backupPath) {
    console.log('Rolling back migration...');
    // Restore from backup
  }
}
```
```

### Workflow 2: New Project Setup
```markdown
# WORKFLOW_NEW_PROJECT.md

## Setup New Project with Design System - Self-Executing Workflow

### Phase 1: Project Configuration (10 minutes)

1. **Collect Project Requirements**
   ```
   QUESTION 1: What type of project are you creating?
   [ ] Web Application (SPA)
   [ ] Static Website
   [ ] Component Library
   [ ] Mobile Web App
   [ ] Documentation Site
   [ ] Other: ___________

   QUESTION 2: Choose your technology stack:
   [ ] React + TypeScript
   [ ] React + JavaScript
   [ ] Vue 3 + TypeScript
   [ ] Vue 3 + JavaScript
   [ ] Vanilla JS
   [ ] Next.js
   [ ] Nuxt.js
   [ ] Other: ___________

   QUESTION 3: Select build tools:
   [ ] Vite (Recommended)
   [ ] Webpack
   [ ] Rollup
   [ ] Parcel
   [ ] Create React App
   [ ] Vue CLI
   [ ] No build tools

   QUESTION 4: Additional features:
   [x] ESLint + Prettier
   [x] Git hooks (Husky)
   [ ] Testing (Jest/Vitest)
   [ ] E2E Testing (Cypress/Playwright)
   [ ] Storybook
   [ ] CI/CD Pipeline
   ```

2. **Project Structure Template**
   ```
   my-project/
   ├── .github/
   │   └── workflows/
   │       └── ci.yml
   ├── src/
   │   ├── components/
   │   │   └── .gitkeep
   │   ├── pages/
   │   │   └── .gitkeep
   │   ├── layouts/
   │   │   └── .gitkeep
   │   ├── styles/
   │   │   ├── design-system/    # Imported from FlexiTheme
   │   │   ├── components/
   │   │   └── main.css
   │   ├── utils/
   │   │   └── theme.js
   │   ├── App.{jsx|vue}
   │   └── main.{js|ts}
   ├── public/
   │   └── index.html
   ├── tests/
   │   └── .gitkeep
   ├── .eslintrc.js
   ├── .prettierrc
   ├── .gitignore
   ├── package.json
   ├── README.md
   ├── CLAUDE.md
   └── design-system/            # Full design system reference
   ```

### Phase 2: Project Initialization (15 minutes)

1. **Create Base Project**
   ```bash
   #!/bin/bash
   # setup-project.sh

   PROJECT_NAME="$1"
   FRAMEWORK="$2"
   BUILD_TOOL="$3"

   echo "🚀 Creating new project: $PROJECT_NAME"

   # Create project directory
   mkdir -p "$PROJECT_NAME"
   cd "$PROJECT_NAME"

   # Initialize based on framework
   case $FRAMEWORK in
     "react-ts")
       npx create-vite@latest . --template react-ts
       ;;
     "vue-ts")
       npx create-vite@latest . --template vue-ts
       ;;
     "vanilla")
       npx create-vite@latest . --template vanilla
       ;;
     *)
       echo "Initializing basic project structure..."
       npm init -y
       ;;
   esac

   # Install design system dependencies
   npm install --save \
     postcss \
     postcss-import \
     postcss-preset-env \
     autoprefixer

   # Development dependencies
   npm install --save-dev \
     eslint \
     prettier \
     husky \
     lint-staged \
     @types/node
   ```

2. **Import Design System**
   ```javascript
   // setup-design-system.js
   const fs = require('fs-extra');
   const path = require('path');

   class DesignSystemSetup {
     constructor(projectPath, designSystemPath) {
       this.projectPath = projectPath;
       this.designSystemPath = designSystemPath;
     }

     async setup() {
       console.log('📦 Setting up design system...');

       // Copy design tokens
       await this.copyTokens();

       // Setup CSS architecture
       await this.setupStyles();

       // Configure build tools
       await this.configureBuildTools();

       // Create utility functions
       await this.createUtilities();

       // Generate component templates
       await this.generateComponentTemplates();

       console.log('✅ Design system setup complete!');
     }

     async copyTokens() {
       const tokensSrc = path.join(this.designSystemPath, 'tokens');
       const tokensDest = path.join(this.projectPath, 'src/styles/design-system');

       await fs.copy(tokensSrc, tokensDest);

       // Create main entry point
       const mainCss = `
   /* Design System Tokens */
   @import './design-system/tokens.css';

   /* Base Styles */
   @import './base/reset.css';
   @import './base/typography.css';
   @import './base/layout.css';

   /* Component Styles */
   @import './components/index.css';

   /* Utility Classes */
   @import './utilities/index.css';
   `;

       await fs.writeFile(
         path.join(this.projectPath, 'src/styles/main.css'),
         mainCss
       );
     }

     async setupStyles() {
       // Create PostCSS config
       const postcssConfig = {
         plugins: {
           'postcss-import': {},
           'postcss-preset-env': {
             stage: 1,
             features: {
               'custom-properties': false,
               'nesting-rules': true
             }
           },
           autoprefixer: {}
         }
       };

       await fs.writeJson(
         path.join(this.projectPath, 'postcss.config.json'),
         postcssConfig,
         { spaces: 2 }
       );

       // Create base styles
       await this.createBaseStyles();
     }

     async createBaseStyles() {
       const resetCss = `
   /* Modern CSS Reset */
   *, *::before, *::after {
     box-sizing: border-box;
   }

   * {
     margin: 0;
     padding: 0;
   }

   html {
     font-size: 16px;
     -webkit-text-size-adjust: 100%;
   }

   body {
     min-height: 100vh;
     font-family: var(--font-sans);
     font-size: var(--text-base);
     line-height: 1.5;
     color: var(--color-text);
     background-color: var(--color-background);
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }

   img, picture, video, canvas, svg {
     display: block;
     max-width: 100%;
   }

   input, button, textarea, select {
     font: inherit;
   }

   p, h1, h2, h3, h4, h5, h6 {
     overflow-wrap: break-word;
   }
   `;

       await fs.writeFile(
         path.join(this.projectPath, 'src/styles/base/reset.css'),
         resetCss
       );
     }

     async createUtilities() {
       const themeUtils = `
   // theme.js - Design System Utilities

   export const theme = {
     // Get CSS variable value
     get(token) {
       return getComputedStyle(document.documentElement)
         .getPropertyValue(\`--\${token}\`).trim();
     },

     // Set CSS variable value
     set(token, value) {
       document.documentElement.style.setProperty(\`--\${token}\`, value);
     },

     // Apply theme class
     apply(themeName) {
       document.documentElement.className = \`theme-\${themeName}\`;
     },

     // Get all tokens of a type
     getTokens(type) {
       const computed = getComputedStyle(document.documentElement);
       const tokens = {};
       
       for (const prop of computed) {
         if (prop.startsWith(\`--\${type}-\`)) {
           tokens[prop] = computed.getPropertyValue(prop).trim();
         }
       }
       
       return tokens;
     },

     // Generate color palette
     getColorPalette(colorName) {
       const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
       const palette = {};
       
       shades.forEach(shade => {
         const value = this.get(\`color-\${colorName}-\${shade}\`);
         if (value) palette[shade] = value;
       });
       
       return palette;
     }
   };

   // Responsive utilities
   export const breakpoints = {
     sm: '640px',
     md: '768px',
     lg: '1024px',
     xl: '1280px',
     '2xl': '1536px'
   };

   export const mediaQuery = (breakpoint) => {
     return \`@media (min-width: \${breakpoints[breakpoint]})\`;
   };

   // Spacing utilities
   export const spacing = (multiplier) => {
     const base = parseFloat(theme.get('space-1'));
     return \`\${base * multiplier}rem\`;
   };

   // Typography utilities
   export const fontSize = (size) => theme.get(\`text-\${size}\`);
   export const fontWeight = (weight) => theme.get(\`font-\${weight}\`);

   // Color utilities
   export const color = (name, shade = 500) => {
     return theme.get(\`color-\${name}-\${shade}\`) || theme.get(\`color-\${name}\`);
   };

   // Shadow utilities
   export const shadow = (size = 'base') => theme.get(\`shadow-\${size}\`);

   // Border radius utilities
   export const radius = (size = 'base') => theme.get(\`radius-\${size}\`);
   `;

       await fs.ensureDir(path.join(this.projectPath, 'src/utils'));
       await fs.writeFile(
         path.join(this.projectPath, 'src/utils/theme.js'),
         themeUtils
       );
     }

     async generateComponentTemplates() {
       // React component template
       const reactTemplate = `
   import { forwardRef } from 'react';
   import styles from './Component.module.css';

   export interface ComponentProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     children?: React.ReactNode;
   }

   export const Component = forwardRef<HTMLDivElement, ComponentProps>(
     ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
       const classes = [
         styles.component,
         styles[variant],
         styles[size]
       ].filter(Boolean).join(' ');

       return (
         <div ref={ref} className={classes} {...props}>
           {children}
         </div>
       );
     }
   );

   Component.displayName = 'Component';
   `;

       // Vue component template
       const vueTemplate = `
   <template>
     <div :class="classes" v-bind="$attrs">
       <slot />
     </div>
   </template>

   <script setup lang="ts">
   import { computed } from 'vue';

   export interface Props {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
   }

   const props = withDefaults(defineProps<Props>(), {
     variant: 'primary',
     size: 'md'
   });

   const classes = computed(() => [
     'component',
     \`component--\${props.variant}\`,
     \`component--\${props.size}\`
   ]);
   </script>

   <style scoped>
   .component {
     /* Base styles using design tokens */
   }
   </style>
   `;

       // Save templates
       const templatesDir = path.join(this.projectPath, '.component-templates');
       await fs.ensureDir(templatesDir);
       
       await fs.writeFile(
         path.join(templatesDir, 'react.tsx.template'),
         reactTemplate
       );
       
       await fs.writeFile(
         path.join(templatesDir, 'vue.vue.template'),
         vueTemplate
       );
     }
   }
   ```

### Phase 3: Framework-Specific Setup (20 minutes)

1. **React Setup**
   ```javascript
   // setup-react.js
   class ReactProjectSetup {
     async setup(projectPath, designSystem) {
       // Create theme provider
       await this.createThemeProvider(projectPath);
       
       // Setup component structure
       await this.setupComponentStructure(projectPath);
       
       // Create example pages
       await this.createExamplePages(projectPath, designSystem);
       
       // Configure routing
       await this.setupRouting(projectPath);
     }

     async createThemeProvider(projectPath) {
       const themeProvider = `
   import { createContext, useContext, useEffect, useState } from 'react';
   import { theme } from '../utils/theme';

   const ThemeContext = createContext({
     currentTheme: 'light',
     setTheme: (theme) => {},
     tokens: {}
   });

   export const useTheme = () => {
     const context = useContext(ThemeContext);
     if (!context) {
       throw new Error('useTheme must be used within ThemeProvider');
     }
     return context;
   };

   export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
     const [currentTheme, setCurrentTheme] = useState(defaultTheme);
     const [tokens, setTokens] = useState({});

     useEffect(() => {
       // Apply theme class
       theme.apply(currentTheme);
       
       // Load tokens
       const loadedTokens = {
         colors: theme.getTokens('color'),
         spacing: theme.getTokens('space'),
         typography: theme.getTokens('text')
       };
       setTokens(loadedTokens);
     }, [currentTheme]);

     const setTheme = (newTheme) => {
       setCurrentTheme(newTheme);
       localStorage.setItem('preferred-theme', newTheme);
     };

     return (
       <ThemeContext.Provider value={{ currentTheme, setTheme, tokens }}>
         {children}
       </ThemeContext.Provider>
     );
   };
   `;

       await fs.writeFile(
         path.join(projectPath, 'src/contexts/ThemeContext.jsx'),
         themeProvider
       );
     }

     async createExamplePages(projectPath, designSystem) {
       const pages = designSystem.pages;
       
       for (const page of pages) {
         const pageComponent = this.generatePageComponent(page);
         const pagePath = path.join(
           projectPath,
           'src/pages',
           `${page.id}.jsx`
         );
         
         await fs.ensureDir(path.dirname(pagePath));
         await fs.writeFile(pagePath, pageComponent);
       }
     }

     generatePageComponent(pageConfig) {
       return `
   import { Layout } from '../layouts/Layout';
   import { ${pageConfig.sections.map(s => this.sectionToComponent(s)).join(', ')} } from '../components';

   export const ${this.toPascalCase(pageConfig.id)}Page = () => {
     return (
       <Layout>
         ${pageConfig.sections.map(section => `
         <${this.sectionToComponent(section)} />
         `).join('')}
       </Layout>
     );
   };
   `;
     }

     sectionToComponent(section) {
       const componentMap = {
         'hero': 'HeroSection',
         'features': 'FeaturesSection',
         'testimonials': 'TestimonialsSection',
         'cta': 'CTASection',
         'header': 'Header',
         'footer': 'Footer'
       };
       return componentMap[section] || 'Section';
     }

     toPascalCase(str) {
       return str
         .split('-')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join('');
     }
   }
   ```

2. **Vue Setup**
   ```javascript
   // setup-vue.js
   class VueProjectSetup {
     async setup(projectPath, designSystem) {
       // Create composables
       await this.createComposables(projectPath);
       
       // Setup component structure
       await this.setupComponentStructure(projectPath);
       
       // Create example views
       await this.createExampleViews(projectPath, designSystem);
       
       // Configure router
       await this.setupRouter(projectPath);
     }

     async createComposables(projectPath) {
       const useTheme = `
   import { ref, computed, watch } from 'vue';
   import { theme } from '../utils/theme';

   export const useTheme = () => {
     const currentTheme = ref(localStorage.getItem('theme') || 'light');
     
     const tokens = computed(() => ({
       colors: theme.getTokens('color'),
       spacing: theme.getTokens('space'),
       typography: theme.getTokens('text')
     }));

     const setTheme = (newTheme) => {
       currentTheme.value = newTheme;
       theme.apply(newTheme);
       localStorage.setItem('theme', newTheme);
     };

     watch(currentTheme, (newTheme) => {
       theme.apply(newTheme);
     }, { immediate: true });

     return {
       currentTheme,
       tokens,
       setTheme
     };
   };

   // Design system helpers
   export const useDesignTokens = () => {
     const color = (name, shade = 500) => 
       \`var(--color-\${name}-\${shade}, var(--color-\${name}))\`;
     
     const space = (size) => \`var(--space-\${size})\`;
     
     const text = (size) => \`var(--text-\${size})\`;
     
     const shadow = (size = 'base') => \`var(--shadow-\${size})\`;
     
     const radius = (size = 'base') => \`var(--radius-\${size})\`;

     return {
       color,
       space,
       text,
       shadow,
       radius
     };
   };
   `;

       await fs.ensureDir(path.join(projectPath, 'src/composables'));
       await fs.writeFile(
         path.join(projectPath, 'src/composables/useTheme.js'),
         useTheme
       );
     }
   }
   ```

### Phase 4: Development Environment (10 minutes)

1. **Configure Development Tools**
   ```javascript
   // configure-dev-tools.js
   class DevToolsSetup {
     async configure(projectPath, options) {
       await this.setupESLint(projectPath, options);
       await this.setupPrettier(projectPath);
       await this.setupGitHooks(projectPath);
       await this.setupVSCode(projectPath);
     }

     async setupESLint(projectPath, options) {
       const eslintConfig = {
         root: true,
         env: {
           browser: true,
           es2021: true,
           node: true
         },
         extends: [
           'eslint:recommended',
           options.framework === 'react' && 'plugin:react/recommended',
           options.framework === 'vue' && 'plugin:vue/vue3-recommended',
           options.typescript && 'plugin:@typescript-eslint/recommended',
           'prettier'
         ].filter(Boolean),
         parserOptions: {
           ecmaVersion: 'latest',
           sourceType: 'module',
           ...(options.framework === 'react' && {
             ecmaFeatures: { jsx: true }
           })
         },
         rules: {
           // Design system specific rules
           'no-restricted-imports': ['error', {
             patterns: [
               {
                 group: ['*/tokens/*'],
                 message: 'Import tokens from @/styles/design-system instead'
               }
             ]
           }]
         }
       };

       await fs.writeJson(
         path.join(projectPath, '.eslintrc.json'),
         eslintConfig,
         { spaces: 2 }
       );
     }

     async setupPrettier(projectPath) {
       const prettierConfig = {
         semi: true,
         trailingComma: 'es5',
         singleQuote: true,
         printWidth: 80,
         tabWidth: 2,
         useTabs: false,
         bracketSpacing: true,
         arrowParens: 'avoid',
         endOfLine: 'lf'
       };

       await fs.writeJson(
         path.join(projectPath, '.prettierrc'),
         prettierConfig,
         { spaces: 2 }
       );
     }

     async setupGitHooks(projectPath) {
       // Install husky
       await this.runCommand('npx husky-init && npm install', projectPath);

       // Create pre-commit hook
       const preCommitHook = `#!/bin/sh
   . "$(dirname "$0")/_/husky.sh"

   # Run linting
   npm run lint

   # Run type checking if TypeScript
   if [ -f "tsconfig.json" ]; then
     npm run type-check
   fi

   # Check for design token usage
   npm run check-tokens
   `;

       await fs.writeFile(
         path.join(projectPath, '.husky/pre-commit'),
         preCommitHook
       );

       // Make executable
       await fs.chmod(path.join(projectPath, '.husky/pre-commit'), '755');
     }

     async setupVSCode(projectPath) {
       const vscodeSettings = {
         'editor.formatOnSave': true,
         'editor.codeActionsOnSave': {
           'source.fixAll.eslint': true
         },
         'css.validate': false,
         'stylelint.validate': ['css', 'postcss'],
         'files.associations': {
           '*.css': 'postcss'
         },
         'emmet.includeLanguages': {
           'postcss': 'css'
         }
       };

       const vscodePath = path.join(projectPath, '.vscode');
       await fs.ensureDir(vscodePath);
       await fs.writeJson(
         path.join(vscodePath, 'settings.json'),
         vscodeSettings,
         { spaces: 2 }
       );

       // Recommended extensions
       const extensions = {
         recommendations: [
           'dbaeumer.vscode-eslint',
           'esbenp.prettier-vscode',
           'stylelint.vscode-stylelint',
           'bradlc.vscode-tailwindcss',
           'csstools.postcss'
         ]
       };

       await fs.writeJson(
         path.join(vscodePath, 'extensions.json'),
         extensions,
         { spaces: 2 }
       );
     }
   }
   ```

2. **Create Project Scripts**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
       "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
       "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\"",
       "type-check": "tsc --noEmit",
       "check-tokens": "node scripts/check-token-usage.js",
       "generate:component": "node scripts/generate-component.js",
       "generate:page": "node scripts/generate-page.js",
       "storybook": "storybook dev -p 6006",
       "build-storybook": "storybook build",
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage"
     }
   }
   ```

### Phase 5: Documentation and Handoff (10 minutes)

1. **Generate Project Documentation**
   ```markdown
   # [Project Name]

   Built with FlexiTheme Design System

   ## Quick Start

   ```bash
   npm install
   npm run dev
   ```

   ## Design System

   This project uses a custom design system generated by FlexiTheme.

   ### Using Design Tokens

   ```css
   /* In CSS */
   .my-component {
     color: var(--color-primary-500);
     padding: var(--space-4);
     font-size: var(--text-lg);
   }
   ```

   ```javascript
   // In JavaScript
   import { theme, color, space } from '@/utils/theme';

   const primaryColor = color('primary', 500);
   const spacing = space(4);
   ```

   ### Component Creation

   Generate new components following the design system:

   ```bash
   npm run generate:component MyComponent
   ```

   ### Available Pages

   - Landing Page: `/` 
   - Dashboard: `/dashboard`
   - [Additional pages based on selection]

   ## Scripts

   - `npm run dev` - Start development server
   - `npm run build` - Build for production
   - `npm run lint` - Run ESLint
   - `npm run format` - Format code with Prettier
   - `npm run generate:component` - Generate new component
   - `npm run check-tokens` - Verify design token usage

   ## Design System Reference

   See `/design-system` directory for:
   - Complete token reference
   - Component documentation
   - Page templates
   - Design guidelines
   ```

2. **Create CLAUDE.md**
   ```markdown
   # Claude Code Assistant Guide

   ## Project Overview
   This project uses the FlexiTheme design system with the following configuration:
   - Theme: [Selected Theme]
   - Framework: [Selected Framework]
   - Build Tool: [Selected Build Tool]

   ## Design System Usage

   When creating new components, always:
   1. Use design tokens from `var(--token-name)`
   2. Follow existing component patterns
   3. Maintain responsive behavior
   4. Include proper TypeScript types

   ## Quick Commands

   - `@create-component [name]` - Generate a new component
   - `@check-tokens` - Verify token usage
   - `@update-theme` - Modify theme values
   - `@add-page [type]` - Add a new page

   ## Component Template

   ```jsx
   import { forwardRef } from 'react';
   import styles from './[Component].module.css';

   export const [Component] = forwardRef(({ ...props }, ref) => {
     // Implementation following design system patterns
   });
   ```

   ## Common Tasks

   ### Adding a new color
   1. Update `/src/styles/design-system/colors.css`
   2. Run `npm run check-tokens`
   3. Update TypeScript definitions if needed

   ### Creating a variant
   1. Extend existing component
   2. Add variant styles using design tokens
   3. Update component props/types
   4. Document in Storybook
   ```

### Final Output Summary

The new project setup workflow generates:

1. **Complete project structure** with framework-specific setup
2. **Integrated design system** with all tokens and utilities
3. **Component templates** following design patterns
4. **Development environment** with linting and formatting
5. **Documentation** for team onboarding
6. **Scripts and tooling** for ongoing development

The user receives a fully configured project ready for development with their custom design system deeply integrated.
```

### Workflow 3: Component Library Builder
```markdown
# WORKFLOW_COMPONENT_LIBRARY.md

## Component Library Builder - Self-Executing Workflow

### Phase 1: Library Setup (10 minutes)

1. **Collect Component Requirements**
   ```
   QUESTION 1: What type of component library?
   [ ] Internal project components
   [ ] Shareable design system library
   [ ] Documentation showcase
   [ ] NPM package
   
   QUESTION 2: Component categories to include:
   [x] Basic (Button, Input, Card)
   [x] Layout (Grid, Container, Stack)
   [x] Navigation (Nav, Tabs, Breadcrumb)
   [x] Feedback (Alert, Toast, Modal)
   [ ] Data Display (Table, List, Badge)
   [ ] Advanced (DatePicker, FileUpload)
   
   QUESTION 3: Documentation approach:
   [ ] Storybook (Recommended)
   [ ] Custom documentation site
   [ ] Markdown only
   [ ] No documentation
   
   QUESTION 4: Testing strategy:
   [x] Unit tests (Vitest/Jest)
   [ ] Visual regression tests
   [ ] Accessibility tests
   [ ] E2E tests
   ```

2. **Create Library Structure**
   ```
   components/
   ├── README.md
   ├── CLAUDE.md
   ├── package.json
   ├── index.js                  # Main export file
   ├── .storybook/              # Storybook config
   │   ├── main.js
   │   └── preview.js
   ├── src/
   │   ├── components/
   │   │   ├── Button/
   │   │   │   ├── Button.jsx
   │   │   │   ├── Button.module.css
   │   │   │   ├── Button.test.js
   │   │   │   ├── Button.stories.js
   │   │   │   ├── Button.types.ts
   │   │   │   └── index.js
   │   │   └── [ComponentName]/
   │   ├── hooks/              # Shared hooks
   │   ├── utils/              # Shared utilities
   │   └── tokens/             # Design system tokens
   ├── docs/
   │   ├── components.md
   │   ├── patterns.md
   │   └── guidelines.md
   └── tests/
       └── setup.js
   ```

### Phase 2: Component Generator (15 minutes)

1. **Create Component Generator CLI**
   ```javascript
   #!/usr/bin/env node
   // scripts/generate-component.js

   const inquirer = require('inquirer');
   const fs = require('fs-extra');
   const path = require('path');
   const { pascalCase, kebabCase, camelCase } = require('change-case');

   class ComponentGenerator {
     constructor() {
       this.designSystem = this.loadDesignSystem();
       this.templates = this.loadTemplates();
     }

     async run() {
       const answers = await this.promptUser();
       await this.generateComponent(answers);
     }

     async promptUser() {
       return inquirer.prompt([
         {
           type: 'input',
           name: 'name',
           message: 'Component name:',
           validate: (input) => {
             if (!input) return 'Component name is required';
             if (!/^[A-Z]/.test(input)) return 'Component name must start with capital letter';
             return true;
           }
         },
         {
           type: 'list',
           name: 'category',
           message: 'Component category:',
           choices: [
             'Basic',
             'Layout',
             'Navigation',
             'Feedback',
             'Data Display',
             'Form',
             'Utility'
           ]
         },
         {
           type: 'checkbox',
           name: 'variants',
           message: 'Select variants:',
           choices: [
             'primary',
             'secondary',
             'success',
             'danger',
             'warning',
             'ghost',
             'outline'
           ]
         },
         {
           type: 'checkbox',
           name: 'sizes',
           message: 'Select sizes:',
           choices: ['xs', 'sm', 'md', 'lg', 'xl']
         },
         {
           type: 'confirm',
           name: 'hasIcon',
           message: 'Support icons?',
           default: false
         },
         {
           type: 'confirm',
           name: 'isAsync',
           message: 'Support loading states?',
           default: false
         },
         {
           type: 'checkbox',
           name: 'features',
           message: 'Additional features:',
           choices: [
             'Forwarded ref',
             'Compound components',
             'Controlled/Uncontrolled',
             'Accessibility (ARIA)',
             'Animation',
             'Responsive'
           ]
         }
       ]);
     }

     async generateComponent(config) {
       const componentName = pascalCase(config.name);
       const componentPath = path.join(
         process.cwd(),
         'src/components',
         componentName
       );

       // Create component directory
       await fs.ensureDir(componentPath);

       // Generate files
       await this.generateComponentFile(componentPath, config);
       await this.generateStyleFile(componentPath, config);
       await this.generateTestFile(componentPath, config);
       await this.generateStoryFile(componentPath, config);
       await this.generateTypeFile(componentPath, config);
       await this.generateIndexFile(componentPath, config);

       // Update main exports
       await this.updateExports(config);

       console.log(`✨ Component ${componentName} created successfully!`);
       console.log(`📁 Location: ${componentPath}`);
     }

     async generateComponentFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       const hasRef = config.features.includes('Forwarded ref');
       
       const template = `
   import ${hasRef ? '{ forwardRef }' : ''} from 'react';
   import PropTypes from 'prop-types';
   import classNames from 'classnames';
   ${config.hasIcon ? "import { Icon } from '../Icon';" : ''}
   import styles from './${componentName}.module.css';

   ${hasRef ? 'export const ' + componentName + ' = forwardRef((' : 'export const ' + componentName + ' = ('}
     {
       variant = '${config.variants[0] || 'primary'}',
       size = '${config.sizes.includes('md') ? 'md' : config.sizes[0] || 'md'}',
       ${config.hasIcon ? 'icon,' : ''}
       ${config.hasIcon ? 'iconPosition = \'left\',' : ''}
       ${config.isAsync ? 'loading = false,' : ''}
       className,
       children,
       disabled,
       ${config.features.includes('Controlled/Uncontrolled') ? 'value,' : ''}
       ${config.features.includes('Controlled/Uncontrolled') ? 'defaultValue,' : ''}
       ${config.features.includes('Controlled/Uncontrolled') ? 'onChange,' : ''}
       ...props
     }${hasRef ? ', ref' : ''}
   ) ${hasRef ? '=> {' : '{'}
     ${config.features.includes('Controlled/Uncontrolled') ? `
     const [internalValue, setInternalValue] = useState(defaultValue);
     const isControlled = value !== undefined;
     const currentValue = isControlled ? value : internalValue;

     const handleChange = (newValue) => {
       if (!isControlled) {
         setInternalValue(newValue);
       }
       onChange?.(newValue);
     };
     ` : ''}

     const classes = classNames(
       styles.${camelCase(config.name)},
       styles[variant],
       styles[size],
       {
         [styles.disabled]: disabled,
         ${config.isAsync ? '[styles.loading]: loading,' : ''}
         ${config.hasIcon ? '[styles.hasIcon]: icon,' : ''}
         ${config.hasIcon ? `[styles.iconLeft]: icon && iconPosition === 'left',` : ''}
         ${config.hasIcon ? `[styles.iconRight]: icon && iconPosition === 'right',` : ''}
       },
       className
     );

     ${config.features.includes('Accessibility (ARIA)') ? `
     // Accessibility
     const ariaProps = {
       'aria-disabled': disabled,
       ${config.isAsync ? "'aria-busy': loading," : ''}
       role: props.role || '${this.getAriaRole(config.category)}',
     };
     ` : ''}

     return (
       <div
         ${hasRef ? 'ref={ref}' : ''}
         className={classes}
         ${config.features.includes('Accessibility (ARIA)') ? '{...ariaProps}' : ''}
         ${config.isAsync ? 'disabled={disabled || loading}' : 'disabled={disabled}'}
         {...props}
       >
         ${config.isAsync ? `
         {loading && (
           <span className={styles.spinner} aria-hidden="true">
             <Icon name="spinner" />
           </span>
         )}
         ` : ''}
         ${config.hasIcon ? `
         {icon && iconPosition === 'left' && (
           <span className={styles.icon} aria-hidden="true">
             <Icon name={icon} />
           </span>
         )}
         ` : ''}
         <span className={styles.content}>{children}</span>
         ${config.hasIcon ? `
         {icon && iconPosition === 'right' && (
           <span className={styles.icon} aria-hidden="true">
             <Icon name={icon} />
           </span>
         )}
         ` : ''}
       </div>
     );
   }${hasRef ? ');' : ';'}

   ${componentName}.propTypes = {
     variant: PropTypes.oneOf([${config.variants.map(v => `'${v}'`).join(', ')}]),
     size: PropTypes.oneOf([${config.sizes.map(s => `'${s}'`).join(', ')}]),
     ${config.hasIcon ? 'icon: PropTypes.string,' : ''}
     ${config.hasIcon ? 'iconPosition: PropTypes.oneOf([\'left\', \'right\']),' : ''}
     ${config.isAsync ? 'loading: PropTypes.bool,' : ''}
     className: PropTypes.string,
     children: PropTypes.node,
     disabled: PropTypes.bool,
     ${config.features.includes('Controlled/Uncontrolled') ? 'value: PropTypes.any,' : ''}
     ${config.features.includes('Controlled/Uncontrolled') ? 'defaultValue: PropTypes.any,' : ''}
     ${config.features.includes('Controlled/Uncontrolled') ? 'onChange: PropTypes.func,' : ''}
   };

   ${hasRef ? componentName + '.displayName = \'' + componentName + '\';' : ''}
   `;

       await fs.writeFile(
         path.join(componentPath, `${componentName}.jsx`),
         this.formatCode(template)
       );
     }

     async generateStyleFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       const camelName = camelCase(config.name);
       
       const template = `
   /* ${componentName} Styles */
   
   .${camelName} {
     /* Base styles using design tokens */
     display: inline-flex;
     align-items: center;
     justify-content: center;
     gap: var(--space-2);
     font-family: var(--font-sans);
     font-weight: var(--font-medium);
     line-height: 1;
     text-align: center;
     text-decoration: none;
     white-space: nowrap;
     cursor: pointer;
     user-select: none;
     transition: all var(--transition-base);
     position: relative;
     
     /* Remove default button styles */
     background: none;
     border: none;
     margin: 0;
     padding: 0;
   }

   /* Variants */
   ${config.variants.map(variant => `
   .${variant} {
     ${this.generateVariantStyles(variant)}
   }
   `).join('\n')}

   /* Sizes */
   ${config.sizes.map(size => `
   .${size} {
     ${this.generateSizeStyles(size, config.category)}
   }
   `).join('\n')}

   /* States */
   .${camelName}:hover:not(.disabled):not(.loading) {
     transform: translateY(-1px);
     box-shadow: var(--shadow-md);
   }

   .${camelName}:active:not(.disabled):not(.loading) {
     transform: translateY(0);
     box-shadow: var(--shadow-sm);
   }

   .${camelName}:focus-visible {
     outline: 2px solid var(--color-primary-500);
     outline-offset: 2px;
   }

   .disabled {
     opacity: 0.5;
     cursor: not-allowed;
   }

   ${config.isAsync ? `
   /* Loading state */
   .loading {
     color: transparent;
   }

   .spinner {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     animation: spin 1s linear infinite;
   }

   @keyframes spin {
     from { transform: translate(-50%, -50%) rotate(0deg); }
     to { transform: translate(-50%, -50%) rotate(360deg); }
   }
   ` : ''}

   ${config.hasIcon ? `
   /* Icon support */
   .icon {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     width: 1em;
     height: 1em;
   }

   .hasIcon {
     gap: var(--space-2);
   }
   ` : ''}

   ${config.features.includes('Responsive') ? `
   /* Responsive */
   @media (max-width: 640px) {
     .${camelName} {
       width: 100%;
     }
   }
   ` : ''}

   ${config.features.includes('Animation') ? `
   /* Animations */
   .${camelName} {
     animation: fadeIn var(--transition-base) ease-out;
   }

   @keyframes fadeIn {
     from {
       opacity: 0;
       transform: translateY(4px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ` : ''}
   `;

       await fs.writeFile(
         path.join(componentPath, `${componentName}.module.css`),
         this.formatCode(template)
       );
     }

     async generateTestFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       
       const template = `
   import { render, screen, fireEvent } from '@testing-library/react';
   import { ${componentName} } from './${componentName}';

   describe('${componentName}', () => {
     it('renders children correctly', () => {
       render(<${componentName}>Test Content</${componentName}>);
       expect(screen.getByText('Test Content')).toBeInTheDocument();
     });

     ${config.variants.map(variant => `
     it('renders ${variant} variant', () => {
       render(<${componentName} variant="${variant}">Test</${componentName}>);
       expect(screen.getByText('Test')).toHaveClass('${variant}');
     });
     `).join('\n')}

     ${config.sizes.map(size => `
     it('renders ${size} size', () => {
       render(<${componentName} size="${size}">Test</${componentName}>);
       expect(screen.getByText('Test')).toHaveClass('${size}');
     });
     `).join('\n')}

     it('handles disabled state', () => {
       render(<${componentName} disabled>Test</${componentName}>);
       const element = screen.getByText('Test');
       expect(element).toHaveClass('disabled');
       expect(element).toHaveAttribute('aria-disabled', 'true');
     });

     ${config.isAsync ? `
     it('shows loading state', () => {
       render(<${componentName} loading>Test</${componentName}>);
       expect(screen.getByText('Test')).toHaveClass('loading');
       expect(screen.getByLabelText('Loading')).toBeInTheDocument();
     });
     ` : ''}

     it('applies custom className', () => {
       render(<${componentName} className="custom-class">Test</${componentName}>);
       expect(screen.getByText('Test')).toHaveClass('custom-class');
     });

     ${config.features.includes('Controlled/Uncontrolled') ? `
     it('works as controlled component', () => {
       const handleChange = jest.fn();
       const { rerender } = render(
         <${componentName} value="test" onChange={handleChange}>
           Test
         </${componentName}>
       );
       
       // Simulate change
       fireEvent.click(screen.getByText('Test'));
       expect(handleChange).toHaveBeenCalled();
     });

     it('works as uncontrolled component', () => {
       render(<${componentName} defaultValue="test">Test</${componentName}>);
       const element = screen.getByText('Test');
       
       // Should maintain internal state
       fireEvent.click(element);
       // Add assertions based on component behavior
     });
     ` : ''}

     ${config.features.includes('Accessibility (ARIA)') ? `
     it('has proper ARIA attributes', () => {
       render(<${componentName}>Test</${componentName}>);
       const element = screen.getByText('Test');
       expect(element).toHaveAttribute('role', '${this.getAriaRole(config.category)}');
     });
     ` : ''}
   });
   `;

       await fs.writeFile(
         path.join(componentPath, `${componentName}.test.js`),
         this.formatCode(template)
       );
     }

     async generateStoryFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       
       const template = `
   import { ${componentName} } from './${componentName}';

   export default {
     title: '${config.category}/${componentName}',
     component: ${componentName},
     parameters: {
       docs: {
         description: {
           component: 'A ${componentName} component following the design system patterns.'
         }
       }
     },
     argTypes: {
       variant: {
         control: { type: 'select' },
         options: [${config.variants.map(v => `'${v}'`).join(', ')}],
         description: 'Visual style variant'
       },
       size: {
         control: { type: 'select' },
         options: [${config.sizes.map(s => `'${s}'`).join(', ')}],
         description: 'Component size'
       },
       ${config.hasIcon ? `
       icon: {
         control: { type: 'text' },
         description: 'Icon name to display'
       },
       iconPosition: {
         control: { type: 'radio' },
         options: ['left', 'right'],
         description: 'Icon position relative to content'
       },
       ` : ''}
       ${config.isAsync ? `
       loading: {
         control: { type: 'boolean' },
         description: 'Loading state'
       },
       ` : ''}
       disabled: {
         control: { type: 'boolean' },
         description: 'Disabled state'
       }
     }
   };

   // Default story
   export const Default = {
     args: {
       children: '${componentName}',
       variant: '${config.variants[0] || 'primary'}',
       size: '${config.sizes.includes('md') ? 'md' : config.sizes[0] || 'md'}'
     }
   };

   // Variants
   ${config.variants.map(variant => `
   export const ${pascalCase(variant)} = {
     args: {
       ...Default.args,
       variant: '${variant}'
     }
   };
   `).join('\n')}

   // Sizes
   export const Sizes = {
     render: () => (
       <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         ${config.sizes.map(size => `
         <${componentName} size="${size}">${size.toUpperCase()}</${componentName}>
         `).join('')}
       </div>
     )
   };

   // States
   export const States = {
     render: () => (
       <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
         <${componentName}>Default</${componentName}>
         <${componentName} disabled>Disabled</${componentName}>
         ${config.isAsync ? `<${componentName} loading>Loading</${componentName}>` : ''}
       </div>
     )
   };

   ${config.hasIcon ? `
   // With Icons
   export const WithIcons = {
     render: () => (
       <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
         <${componentName} icon="plus">Add Item</${componentName}>
         <${componentName} icon="download" iconPosition="right">Download</${componentName}>
         <${componentName} icon="settings" variant="secondary">Settings</${componentName}>
       </div>
     )
   };
   ` : ''}

   // Playground
   export const Playground = {
     args: {
       children: 'Customize me!',
       variant: 'primary',
       size: 'md'
     }
   };
   `;

       await fs.writeFile(
         path.join(componentPath, `${componentName}.stories.js`),
         this.formatCode(template)
       );
     }

     async generateTypeFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       
       const template = `
   import { ComponentPropsWithRef, ReactNode } from 'react';

   export interface ${componentName}Props extends ComponentPropsWithRef<'div'> {
     /**
      * Visual style variant
      * @default '${config.variants[0] || 'primary'}'
      */
     variant?: ${config.variants.map(v => `'${v}'`).join(' | ')};
     
     /**
      * Component size
      * @default '${config.sizes.includes('md') ? 'md' : config.sizes[0] || 'md'}'
      */
     size?: ${config.sizes.map(s => `'${s}'`).join(' | ')};
     
     ${config.hasIcon ? `
     /**
      * Icon to display
      */
     icon?: string;
     
     /**
      * Icon position relative to content
      * @default 'left'
      */
     iconPosition?: 'left' | 'right';
     ` : ''}
     
     ${config.isAsync ? `
     /**
      * Loading state
      * @default false
      */
     loading?: boolean;
     ` : ''}
     
     /**
      * Component content
      */
     children?: ReactNode;
     
     /**
      * Disabled state
      * @default false
      */
     disabled?: boolean;
     
     /**
      * Additional CSS classes
      */
     className?: string;
     
     ${config.features.includes('Controlled/Uncontrolled') ? `
     /**
      * Controlled value
      */
     value?: any;
     
     /**
      * Default value for uncontrolled mode
      */
     defaultValue?: any;
     
     /**
      * Change handler
      */
     onChange?: (value: any) => void;
     ` : ''}
   }
   `;

       await fs.writeFile(
         path.join(componentPath, `${componentName}.types.ts`),
         this.formatCode(template)
       );
     }

     async generateIndexFile(componentPath, config) {
       const componentName = pascalCase(config.name);
       
       const template = `
   export { ${componentName} } from './${componentName}';
   export type { ${componentName}Props } from './${componentName}.types';
   `;

       await fs.writeFile(
         path.join(componentPath, 'index.js'),
         this.formatCode(template)
       );
     }

     generateVariantStyles(variant) {
       const variantStyles = {
         primary: `
       background-color: var(--color-primary-500);
       color: var(--color-white);
       border: 2px solid transparent;
     `,
         secondary: `
       background-color: var(--color-gray-100);
       color: var(--color-gray-900);
       border: 2px solid transparent;
     `,
         success: `
       background-color: var(--color-green-500);
       color: var(--color-white);
       border: 2px solid transparent;
     `,
         danger: `
       background-color: var(--color-red-500);
       color: var(--color-white);
       border: 2px solid transparent;
     `,
         warning: `
       background-color: var(--color-yellow-500);
       color: var(--color-gray-900);
       border: 2px solid transparent;
     `,
         ghost: `
       background-color: transparent;
       color: var(--color-gray-700);
       border: 2px solid transparent;
     `,
         outline: `
       background-color: transparent;
       color: var(--color-primary-600);
       border: 2px solid currentColor;
     `
       };

       return variantStyles[variant] || variantStyles.primary;
     }

     generateSizeStyles(size, category) {
       const sizeStyles = {
         xs: `
       padding: var(--space-1) var(--space-2);
       font-size: var(--text-xs);
       min-height: 24px;
     `,
         sm: `
       padding: var(--space-2) var(--space-3);
       font-size: var(--text-sm);
       min-height: 32px;
     `,
         md: `
       padding: var(--space-2) var(--space-4);
       font-size: var(--text-base);
       min-height: 40px;
     `,
         lg: `
       padding: var(--space-3) var(--space-5);
       font-size: var(--text-lg);
       min-height: 48px;
     `,
         xl: `
       padding: var(--space-4) var(--space-6);
       font-size: var(--text-xl);
       min-height: 56px;
     `
       };

       return sizeStyles[size] || sizeStyles.md;
     }

     getAriaRole(category) {
       const roleMap = {
         'Basic': 'button',
         'Navigation': 'navigation',
         'Feedback': 'alert',
         'Form': 'form',
         'Data Display': 'region',
         'Layout': 'region',
         'Utility': 'complementary'
       };

       return roleMap[category] || 'region';
     }

     formatCode(code) {
       // Remove leading/trailing whitespace and fix indentation
       return code
         .trim()
         .replace(/^\s{3,}/gm, '')
         .replace(/\n{3,}/g, '\n\n');
     }

     async updateExports(config) {
       const indexPath = path.join(process.cwd(), 'src/components/index.js');
       const componentName = pascalCase(config.name);
       
       let content = '';
       if (await fs.pathExists(indexPath)) {
         content = await fs.readFile(indexPath, 'utf8');
       }
       
       // Add export if not already present
       if (!content.includes(componentName)) {
         content += `\nexport { ${componentName} } from './${componentName}';`;
         await fs.writeFile(indexPath, content.trim() + '\n');
       }
     }
   }

   // Run generator
   const generator = new ComponentGenerator();
   generator.run().catch(console.error);
   ```

2. **Create Component Documentation Generator**
   ```javascript
   // scripts/generate-docs.js
   class DocumentationGenerator {
     async generateLibraryDocs(componentsPath) {
       const components = await this.scanComponents(componentsPath);
       const docs = this.generateDocumentation(components);
       
       await fs.writeFile(
         path.join(process.cwd(), 'docs/components.md'),
         docs
       );
     }

     async scanComponents(componentsPath) {
       const componentDirs = await fs.readdir(componentsPath);
       const components = [];

       for (const dir of componentDirs) {
         const componentPath = path.join(componentsPath, dir);
         const stat = await fs.stat(componentPath);
         
         if (stat.isDirectory()) {
           const component = await this.analyzeComponent(componentPath, dir);
           components.push(component);
         }
       }

       return components;
     }

     generateDocumentation(components) {
       return `
   # Component Library Documentation

   Generated on ${new Date().toLocaleDateString()}

   ## Table of Contents

   ${components.map(c => `- [${c.name}](#${c.name.toLowerCase()})`).join('\n')}

   ## Components

   ${components.map(component => this.generateComponentDoc(component)).join('\n\n')}

   ## Design Tokens Usage

   All components use design tokens from the design system:

   \`\`\`css
   /* Color tokens */
   var(--color-primary-500)
   var(--color-gray-100)

   /* Spacing tokens */
   var(--space-2)
   var(--space-4)

   /* Typography tokens */
   var(--text-base)
   var(--font-medium)
   \`\`\`

   ## Accessibility

   All components follow WCAG 2.1 AA guidelines:
   - Proper ARIA attributes
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus indicators

   ## Browser Support

   - Chrome/Edge: Last 2 versions
   - Firefox: Last 2 versions
   - Safari: Last 2 versions
   - Mobile browsers: iOS 12+, Android 8+
   `;
     }

     generateComponentDoc(component) {
       return `
   ### ${component.name}

   ${component.description || 'Component description'}

   #### Import

   \`\`\`javascript
   import { ${component.name} } from '@/components/${component.name}';
   \`\`\`

   #### Basic Usage

   \`\`\`jsx
   <${component.name} variant="primary" size="md">
     Content
   </${component.name}>
   \`\`\`

   #### Props

   | Prop | Type | Default | Description |
   |------|------|---------|-------------|
   ${component.props.map(prop => 
     `| ${prop.name} | \`${prop.type}\` | \`${prop.default}\` | ${prop.description} |`
   ).join('\n')}

   #### Variants

   ${component.variants.map(variant => `
   ##### ${variant}
   \`\`\`jsx
   <${component.name} variant="${variant}">
     ${variant} variant
   </${component.name}>
   \`\`\`
   `).join('\n')}

   #### Examples

   ${component.examples.map(example => `
   ##### ${example.title}
   \`\`\`jsx
   ${example.code}
   \`\`\`
   `).join('\n')}
   `;
     }
   }
   ```

### Phase 3: CLAUDE.md Workflow (10 minutes)

Create a specialized CLAUDE.md for component development:

```markdown
# Component Library - Claude Code Assistant Guide

## Overview
This is a component library built with the FlexiTheme design system. All components follow consistent patterns and use design tokens.

## Quick Commands

### Component Creation
```
@create-component Button primary,secondary sm,md,lg
```

### Component Analysis
```
@analyze-component Button
```

### Token Check
```
@check-design-tokens Button
```

## Component Creation Workflow

When creating a new component:

1. **Run the generator**
   ```bash
   npm run generate:component
   ```

2. **Follow the design system**
   - Use only design tokens (never hardcode colors/spacing)
   - Follow existing component patterns
   - Include all standard variants and sizes

3. **Required files**
   - Component.jsx - Main component
   - Component.module.css - Styles using design tokens
   - Component.test.js - Unit tests
   - Component.stories.js - Storybook stories
   - Component.types.ts - TypeScript definitions
   - index.js - Exports

## Design Token Usage

### Colors
```css
/* Always use token variables */
background-color: var(--color-primary-500);
color: var(--color-text);
border-color: var(--color-border);

/* Never hardcode */
background-color: #3b82f6; ❌
```

### Spacing
```css
/* Use spacing tokens */
padding: var(--space-4);
margin: var(--space-2);

/* Never use arbitrary values */
padding: 16px; ❌
```

### Typography
```css
/* Use typography tokens */
font-size: var(--text-base);
font-weight: var(--font-medium);
line-height: var(--leading-normal);
```

## Component Patterns

### Base Structure
```jsx
export const Component = forwardRef(({ 
  variant = 'primary',
  size = 'md',
  ...props 
}, ref) => {
  // Implementation
});
```

### Styling Pattern
```css
.component {
  /* Base styles */
}

.primary { /* Variant styles */ }
.secondary { /* Variant styles */ }

.sm { /* Size styles */ }
.md { /* Size styles */ }
.lg { /* Size styles */ }

.disabled { /* State styles */ }
.loading { /* State styles */ }
```

### Testing Pattern
```javascript
describe('Component', () => {
  it('renders correctly', () => {});
  it('handles variants', () => {});
  it('handles sizes', () => {});
  it('handles states', () => {});
  it('is accessible', () => {});
});
```

## Common Tasks

### Add a new variant
1. Update component props
2. Add variant styles using tokens
3. Update stories and tests
4. Update TypeScript types

### Add responsive behavior
1. Use CSS custom properties
2. Add media queries with breakpoint tokens
3. Test on all device sizes

### Add animation
1. Use transition tokens
2. Respect prefers-reduced-motion
3. Keep animations subtle

## Accessibility Checklist

- [ ] Proper ARIA attributes
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Color contrast passes WCAG AA
- [ ] No motion for reduced-motion preference

## Performance Guidelines

- Use CSS modules for style isolation
- Lazy load heavy components
- Memoize expensive computations
- Use forwardRef for DOM access
- Avoid inline styles

## Documentation Standards

Every component must have:
1. JSDoc comments on props
2. Storybook stories for all variants
3. Usage examples in stories
4. Accessibility notes
5. Performance considerations
```

### Phase 4: Component Library Showcase (10 minutes)

Create an interactive showcase page:

```html
<!-- components/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Library - FlexiTheme</title>
  <link rel="stylesheet" href="./src/styles/tokens.css">
  <link rel="stylesheet" href="./src/styles/showcase.css">
</head>
<body>
  <div class="showcase-app">
    <aside class="sidebar">
      <h1>FlexiTheme Components</h1>
      <nav class="component-nav">
        <section>
          <h3>Basic</h3>
          <a href="#button">Button</a>
          <a href="#input">Input</a>
          <a href="#card">Card</a>
        </section>
        <section>
          <h3>Layout</h3>
          <a href="#grid">Grid</a>
          <a href="#stack">Stack</a>
          <a href="#container">Container</a>
        </section>
        <!-- More categories -->
      </nav>
    </aside>

    <main class="showcase-content">
      <section id="button" class="component-section">
        <h2>Button</h2>
        <p>Buttons trigger actions throughout the application.</p>
        
        <div class="example-group">
          <h3>Variants</h3>
          <div class="example">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-danger">Danger</button>
          </div>
          <details>
            <summary>View Code</summary>
            <pre><code>&lt;button class="btn btn-primary"&gt;Primary&lt;/button&gt;</code></pre>
          </details>
        </div>

        <div class="example-group">
          <h3>Sizes</h3>
          <div class="example">
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary btn-md">Medium</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
        </div>

        <div class="example-group">
          <h3>States</h3>
          <div class="example">
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary" disabled>Disabled</button>
            <button class="btn btn-primary loading">Loading</button>
          </div>
        </div>
      </section>
      <!-- More components -->
    </main>

    <aside class="properties-panel">
      <h3>Design Tokens</h3>
      <div class="token-display">
        <h4>Colors</h4>
        <div class="color-grid">
          <!-- Dynamically populated -->
        </div>
        <h4>Spacing</h4>
        <div class="spacing-grid">
          <!-- Dynamically populated -->
        </div>
      </div>
    </aside>
  </div>

  <script src="./src/scripts/showcase.js"></script>
</body>
</html>
```

### Final Component Library Structure

The component library builder generates:

1. **Component generator CLI** that creates consistent components
2. **Full component structure** with all required files
3. **Automated documentation** generation
4. **Interactive showcase** for viewing components
5. **Storybook integration** for development
6. **Testing setup** for quality assurance
7. **CLAUDE.md workflow** for ongoing development

Users can now:
- Generate new components with consistent patterns
- View all components in the showcase
- Test components in Storybook
- Maintain design system consistency
- Share components across projects
```

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Define structured output format for design system", "status": "completed", "priority": "high"}, {"id": "2", "content": "Create workflow 1: Analyze and replace existing project theme", "status": "completed", "priority": "high"}, {"id": "3", "content": "Create workflow 2: Setup new project with design system", "status": "completed", "priority": "high"}, {"id": "4", "content": "Create workflow 3: Component library generator", "status": "completed", "priority": "high"}, {"id": "5", "content": "Define user preference collection patterns", "status": "completed", "priority": "medium"}]