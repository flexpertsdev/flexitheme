# Design System Generator - Self-Executing Workflow

## Project Overview

Build a comprehensive, interactive design system generator that allows users to:
1. Choose base UI styles with detailed design principles
2. Select page layouts for their specific app needs
3. Customize navigation patterns for mobile/desktop
4. Configure authentication states (signed in/out)
5. Generate color palettes and typography
6. Export a complete design system as markdown with embedded interactive wireframes

## Technical Requirements

### Core Technologies
- **Frontend**: Vanilla HTML/CSS/JavaScript (no external dependencies)
- **Architecture**: Progressive enhancement, mobile-first
- **Output Format**: Markdown with embedded HTML snippets
- **Persistence**: localStorage for session state, file export capabilities

### Performance Requirements
- < 3 second load time
- 60fps animations and interactions
- Responsive design (320px - 2560px)
- Keyboard accessible navigation

## File Structure

```
design-system-generator/
├── index.html                 # Main application
├── styles/
│   ├── base.css              # Core styles and CSS variables
│   ├── themes.css            # Theme-specific styles
│   ├── components.css        # Reusable component styles
│   └── wireframes.css        # Wireframe styling system
├── scripts/
│   ├── app.js                # Main application logic
│   ├── theme-engine.js       # Theme generation and management
│   ├── wireframe-engine.js   # Interactive wireframe system
│   ├── design-system.js      # Design system generation
│   └── export.js             # Markdown export functionality
├── data/
│   ├── themes.json           # Theme configurations and principles
│   ├── page-types.json       # Page layout definitions
│   └── design-tokens.json    # Color, typography, spacing systems
├── templates/
│   ├── wireframe-base.html   # Base wireframe template
│   └── design-system.md      # Output template
└── README.md
```

## Implementation Steps

### Phase 1: Core Infrastructure

#### 1.1 Base Application Structure (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design System Generator</title>
    <link rel="stylesheet" href="styles/base.css">
    <link rel="stylesheet" href="styles/themes.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/wireframes.css">
</head>
<body>
    <!-- Multi-step wizard interface -->
    <div id="app">
        <!-- Step indicators -->
        <div class="step-indicator">
            <div class="step active" data-step="1">Style</div>
            <div class="step" data-step="2">Pages</div>
            <div class="step" data-step="3">Navigation</div>
            <div class="step" data-step="4">States</div>
            <div class="step" data-step="5">Design</div>
            <div class="step" data-step="6">Export</div>
        </div>

        <!-- Step content container -->
        <div class="step-content">
            <!-- Dynamic content populated by JavaScript -->
        </div>

        <!-- Navigation controls -->
        <div class="wizard-controls">
            <button id="prev-btn" class="btn-secondary">Previous</button>
            <button id="next-btn" class="btn-primary">Next</button>
        </div>
    </div>

    <!-- Wireframe preview panel (collapsible) -->
    <div id="preview-panel" class="preview-panel">
        <div class="preview-header">
            <h3>Live Preview</h3>
            <button id="toggle-preview">✕</button>
        </div>
        <div class="preview-viewport">
            <div class="device-selector">
                <button class="device-btn active" data-device="mobile">📱</button>
                <button class="device-btn" data-device="tablet">📱</button>
                <button class="device-btn" data-device="desktop">🖥️</button>
            </div>
            <div class="wireframe-container">
                <!-- Interactive wireframe rendered here -->
            </div>
        </div>
    </div>

    <script src="scripts/app.js"></script>
    <script src="scripts/theme-engine.js"></script>
    <script src="scripts/wireframe-engine.js"></script>
    <script src="scripts/design-system.js"></script>
    <script src="scripts/export.js"></script>
</body>
</html>
```

#### 1.2 CSS Architecture (styles/base.css)
```css
/* CSS Custom Properties for theming */
:root {
    /* Spacing scale */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Typography scale */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    
    /* Layout */
    --max-width-sm: 640px;
    --max-width-md: 768px;
    --max-width-lg: 1024px;
    --max-width-xl: 1280px;
    
    /* Animation */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Z-index scale */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal: 1040;
    --z-popover: 1050;
    --z-tooltip: 1060;
}

/* Reset and base styles */
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-primary);
}

/* Component base classes */
.btn {
    padding: var(--space-sm) var(--space-md);
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-fast);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
}

.btn-primary {
    background: var(--color-primary);
    color: white;
}

.btn-secondary {
    background: var(--color-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
}

.card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: var(--space-lg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive grid system */
.grid {
    display: grid;
    gap: var(--space-md);
}

.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
}
```

### Phase 2: Theme System and Design Principles

#### 2.1 Theme Data Structure (data/themes.json)
```json
{
  "minimal": {
    "name": "Minimal",
    "description": "Clean, spacious design focused on content and usability",
    "principles": {
      "hierarchy": "Clear typography hierarchy with ample white space",
      "spacing": "Generous margins and padding, 8px base unit",
      "colors": "Monochromatic with single accent color",
      "typography": "System fonts, limited type styles",
      "components": "Simple borders, subtle shadows, minimal decoration"
    },
    "tokens": {
      "colors": {
        "primary": "#1e293b",
        "secondary": "#64748b",
        "accent": "#3b82f6",
        "bg-primary": "#ffffff",
        "bg-secondary": "#f8fafc",
        "border": "#e2e8f0",
        "text-primary": "#1e293b",
        "text-secondary": "#64748b"
      },
      "spacing": {
        "unit": 8,
        "scale": [4, 8, 16, 24, 32, 48, 64, 96]
      },
      "typography": {
        "font-family": "system-ui, -apple-system, sans-serif",
        "scale": [12, 14, 16, 18, 20, 24, 30, 36, 48],
        "weights": [400, 500, 600]
      },
      "borders": {
        "radius": [0, 4, 6, 8, 12],
        "width": [1, 2]
      },
      "shadows": {
        "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px rgba(0, 0, 0, 0.1)"
      }
    },
    "navigation": {
      "mobile": {
        "type": "hamburger",
        "position": "top",
        "height": 56
      },
      "desktop": {
        "type": "horizontal",
        "position": "top",
        "height": 64
      }
    }
  },
  "modern": {
    "name": "Modern",
    "description": "Contemporary design with gradients and elevated elements",
    "principles": {
      "hierarchy": "Bold typography with gradient accents",
      "spacing": "Comfortable spacing with visual rhythm",
      "colors": "Vibrant gradients with neutral base",
      "typography": "Modern sans-serif with varied weights",
      "components": "Elevated cards, gradient buttons, smooth animations"
    },
    "tokens": {
      "colors": {
        "primary": "#667eea",
        "secondary": "#764ba2",
        "accent": "#f093fb",
        "bg-primary": "#ffffff",
        "bg-secondary": "#f8fafc",
        "border": "#e5e7eb",
        "text-primary": "#111827",
        "text-secondary": "#6b7280"
      },
      "gradients": {
        "primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "accent": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "neutral": "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)"
      },
      "spacing": {
        "unit": 8,
        "scale": [4, 8, 12, 16, 24, 32, 48, 64, 96]
      },
      "typography": {
        "font-family": "'Inter', system-ui, sans-serif",
        "scale": [12, 14, 16, 18, 20, 24, 30, 36, 48, 60],
        "weights": [300, 400, 500, 600, 700]
      },
      "borders": {
        "radius": [4, 8, 12, 16, 24],
        "width": [1, 2, 3]
      },
      "shadows": {
        "sm": "0 2px 4px rgba(0, 0, 0, 0.06)",
        "md": "0 8px 16px rgba(0, 0, 0, 0.1)",
        "lg": "0 20px 40px rgba(0, 0, 0, 0.15)",
        "glow": "0 0 20px rgba(102, 126, 234, 0.3)"
      }
    },
    "navigation": {
      "mobile": {
        "type": "bottom-tabs",
        "position": "bottom",
        "height": 64
      },
      "desktop": {
        "type": "sidebar",
        "position": "left",
        "width": 240
      }
    }
  }
}
```

#### 2.2 Page Type Definitions (data/page-types.json)
```json
{
  "landing-public": {
    "name": "Public Landing Page",
    "description": "Marketing page for non-authenticated users",
    "category": "Landing",
    "sections": [
      {
        "type": "hero",
        "required": true,
        "props": {
          "title": "Main headline",
          "subtitle": "Supporting text",
          "cta": "Primary action",
          "background": "image|gradient|video"
        }
      },
      {
        "type": "features",
        "required": true,
        "props": {
          "layout": "grid|list|carousel",
          "count": "3-6",
          "style": "cards|minimal|icons"
        }
      },
      {
        "type": "social-proof",
        "required": false,
        "props": {
          "type": "testimonials|logos|stats",
          "layout": "carousel|grid|inline"
        }
      },
      {
        "type": "cta-section",
        "required": true,
        "props": {
          "style": "banner|card|inline"
        }
      }
    ],
    "navigation": {
      "mobile": ["hamburger", "bottom-tabs"],
      "desktop": ["horizontal", "sidebar"]
    },
    "responsive": {
      "mobile": {
        "hero": "single-column, reduced height",
        "features": "stacked cards",
        "navigation": "collapsed"
      },
      "tablet": {
        "hero": "two-column option",
        "features": "2-column grid",
        "navigation": "hybrid"
      },
      "desktop": {
        "hero": "full-width with side content",
        "features": "3-4 column grid",
        "navigation": "full visibility"
      }
    }
  },
  "dashboard": {
    "name": "User Dashboard",
    "description": "Personalized landing for authenticated users",
    "category": "Application",
    "sections": [
      {
        "type": "header",
        "required": true,
        "props": {
          "user-info": "avatar|name|notifications",
          "actions": "search|settings|profile"
        }
      },
      {
        "type": "stats-overview",
        "required": true,
        "props": {
          "layout": "cards|banner|sidebar",
          "metrics": "2-6 key numbers"
        }
      },
      {
        "type": "activity-feed",
        "required": false,
        "props": {
          "style": "timeline|cards|list",
          "pagination": "infinite|load-more|pages"
        }
      },
      {
        "type": "quick-actions",
        "required": true,
        "props": {
          "layout": "grid|toolbar|floating",
          "count": "3-8 actions"
        }
      }
    ],
    "navigation": {
      "mobile": ["bottom-tabs", "hamburger"],
      "desktop": ["sidebar", "top-nav"]
    }
  }
}
```

### Phase 3: Interactive Wireframe Engine

#### 3.1 Wireframe Engine (scripts/wireframe-engine.js)
```javascript
class WireframeEngine {
    constructor() {
        this.currentDevice = 'mobile';
        this.currentTheme = null;
        this.currentPage = null;
        this.animations = new Map();
    }

    init() {
        this.setupDeviceSelector();
        this.setupInteractionHandlers();
        this.initializeAnimations();
    }

    generateWireframe(pageType, theme, device = 'mobile') {
        const container = document.querySelector('.wireframe-container');
        
        // Create device frame
        const frame = this.createDeviceFrame(device);
        
        // Generate page sections based on page type and theme
        const sections = this.generatePageSections(pageType, theme, device);
        
        // Add interactive behaviors
        sections.forEach(section => {
            this.addInteractiveBehavior(section, theme);
        });
        
        frame.appendChild(sections);
        container.innerHTML = '';
        container.appendChild(frame);
        
        // Trigger entrance animations
        this.animateEntrance(frame);
    }

    createDeviceFrame(device) {
        const frame = document.createElement('div');
        frame.className = `device-frame device-${device}`;
        
        const dimensions = {
            mobile: { width: 375, height: 667 },
            tablet: { width: 768, height: 1024 },
            desktop: { width: 1200, height: 800 }
        };
        
        const { width, height } = dimensions[device];
        frame.style.width = `${width}px`;
        frame.style.height = `${height}px`;
        
        // Add device chrome (notches, bezels, etc.)
        if (device === 'mobile') {
            frame.classList.add('has-notch');
        }
        
        return frame;
    }

    generatePageSections(pageType, theme, device) {
        const container = document.createElement('div');
        container.className = 'page-container';
        
        const pageConfig = this.getPageConfig(pageType);
        const themeConfig = this.getThemeConfig(theme);
        
        // Generate navigation
        const nav = this.generateNavigation(pageConfig, themeConfig, device);
        container.appendChild(nav);
        
        // Generate page sections
        pageConfig.sections.forEach(sectionConfig => {
            const section = this.generateSection(sectionConfig, themeConfig, device);
            container.appendChild(section);
        });
        
        return container;
    }

    generateNavigation(pageConfig, themeConfig, device) {
        const navConfig = themeConfig.navigation[device];
        const nav = document.createElement('nav');
        nav.className = `navigation nav-${navConfig.type}`;
        
        switch (navConfig.type) {
            case 'hamburger':
                nav.innerHTML = this.generateHamburgerNav(themeConfig);
                this.addHamburgerBehavior(nav);
                break;
            case 'bottom-tabs':
                nav.innerHTML = this.generateBottomTabs(themeConfig);
                this.addTabBehavior(nav);
                break;
            case 'sidebar':
                nav.innerHTML = this.generateSidebar(themeConfig);
                this.addSidebarBehavior(nav);
                break;
            case 'horizontal':
                nav.innerHTML = this.generateHorizontalNav(themeConfig);
                break;
        }
        
        return nav;
    }

    generateHamburgerNav(theme) {
        return `
            <div class="nav-header">
                <div class="nav-logo"></div>
                <button class="hamburger-btn" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="nav-menu hidden">
                <div class="nav-item">Home</div>
                <div class="nav-item">Features</div>
                <div class="nav-item">About</div>
                <div class="nav-item">Contact</div>
            </div>
        `;
    }

    addHamburgerBehavior(nav) {
        const hamburgerBtn = nav.querySelector('.hamburger-btn');
        const menu = nav.querySelector('.nav-menu');
        
        hamburgerBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            hamburgerBtn.classList.toggle('active');
            
            // Animate menu items
            const items = menu.querySelectorAll('.nav-item');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('slide-in');
            });
        });
    }

    generateSection(sectionConfig, theme, device) {
        const section = document.createElement('section');
        section.className = `page-section section-${sectionConfig.type}`;
        
        switch (sectionConfig.type) {
            case 'hero':
                section.innerHTML = this.generateHeroSection(sectionConfig, theme, device);
                this.addHeroAnimations(section);
                break;
            case 'features':
                section.innerHTML = this.generateFeaturesSection(sectionConfig, theme, device);
                this.addScrollAnimations(section);
                break;
            case 'stats-overview':
                section.innerHTML = this.generateStatsSection(sectionConfig, theme, device);
                this.addCounterAnimations(section);
                break;
            // Add more section types...
        }
        
        return section;
    }

    generateHeroSection(config, theme, device) {
        const isMobile = device === 'mobile';
        return `
            <div class="hero-content">
                <div class="hero-text">
                    <div class="hero-title animated-element" data-animation="fadeInUp"></div>
                    <div class="hero-subtitle animated-element" data-animation="fadeInUp" data-delay="0.2s"></div>
                    <div class="hero-cta animated-element" data-animation="fadeInUp" data-delay="0.4s"></div>
                </div>
                ${!isMobile ? '<div class="hero-visual animated-element" data-animation="fadeInRight"></div>' : ''}
            </div>
        `;
    }

    addInteractiveBehavior(section, theme) {
        // Add click handlers for interactive elements
        section.querySelectorAll('.interactive').forEach(element => {
            element.addEventListener('click', (e) => {
                this.handleInteraction(e, theme);
            });
        });
        
        // Add scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        });
        
        section.querySelectorAll('.animated-element').forEach(el => {
            observer.observe(el);
        });
    }

    triggerAnimation(element) {
        const animation = element.dataset.animation;
        const delay = element.dataset.delay || '0s';
        
        element.style.animationDelay = delay;
        element.classList.add(animation);
    }

    // Scroll simulation for demonstration
    simulateScrolling(container) {
        let scrollPosition = 0;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        const scrollInterval = setInterval(() => {
            scrollPosition += 2;
            container.scrollTop = scrollPosition;
            
            if (scrollPosition >= maxScroll) {
                clearInterval(scrollInterval);
                setTimeout(() => {
                    container.scrollTop = 0;
                    this.simulateScrolling(container);
                }, 2000);
            }
        }, 50);
    }
}
```

### Phase 4: Design System Generation

#### 4.1 Design System Generator (scripts/design-system.js)
```javascript
class DesignSystemGenerator {
    constructor() {
        this.selectedTheme = null;
        this.selectedPages = [];
        this.customizations = {};
        this.generatedTokens = {};
    }

    generateDesignSystem(config) {
        const designSystem = {
            meta: this.generateMetadata(config),
            tokens: this.generateDesignTokens(config),
            components: this.generateComponents(config),
            pages: this.generatePageTemplates(config),
            guidelines: this.generateGuidelines(config)
        };

        return designSystem;
    }

    generateDesignTokens(config) {
        const baseTokens = config.theme.tokens;
        const customTokens = config.customizations;
        
        return {
            colors: this.generateColorSystem(baseTokens.colors, customTokens.colors),
            typography: this.generateTypographySystem(baseTokens.typography, customTokens.typography),
            spacing: this.generateSpacingSystem(baseTokens.spacing),
            layout: this.generateLayoutSystem(config),
            motion: this.generateMotionSystem(baseTokens)
        };
    }

    generateColorSystem(baseColors, customColors = {}) {
        const colors = { ...baseColors, ...customColors };
        
        // Generate color variations
        const colorSystem = {};
        Object.entries(colors).forEach(([name, value]) => {
            if (name.includes('primary') || name.includes('accent')) {
                colorSystem[name] = {
                    50: this.lighten(value, 0.9),
                    100: this.lighten(value, 0.8),
                    200: this.lighten(value, 0.6),
                    300: this.lighten(value, 0.4),
                    400: this.lighten(value, 0.2),
                    500: value,
                    600: this.darken(value, 0.1),
                    700: this.darken(value, 0.2),
                    800: this.darken(value, 0.3),
                    900: this.darken(value, 0.4)
                };
            } else {
                colorSystem[name] = value;
            }
        });
        
        return colorSystem;
    }

    generateTypographySystem(baseTypography, customTypography = {}) {
        const typography = { ...baseTypography, ...customTypography };
        
        return {
            fontFamily: {
                sans: typography['font-family'],
                mono: "'JetBrains Mono', 'Fira Code', monospace"
            },
            fontSize: this.generateTypeScale(typography.scale),
            fontWeight: typography.weights.reduce((acc, weight) => {
                const name = this.getWeightName(weight);
                acc[name] = weight;
                return acc;
            }, {}),
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
        };
    }

    generateComponents(config) {
        const components = {};
        
        // Generate component definitions based on selected pages
        config.selectedPages.forEach(pageType => {
            const pageConfig = this.getPageConfig(pageType);
            pageConfig.sections.forEach(section => {
                const componentName = this.getComponentName(section.type);
                if (!components[componentName]) {
                    components[componentName] = this.generateComponentDefinition(section, config);
                }
            });
        });
        
        return components;
    }

    generateComponentDefinition(section, config) {
        return {
            name: section.type,
            description: `${section.type} component`,
            props: section.props,
            variants: this.generateComponentVariants(section, config),
            responsive: this.generateResponsiveBehavior(section, config),
            accessibility: this.generateA11yGuidelines(section),
            code: this.generateComponentCode(section, config)
        };
    }

    generatePageTemplates(config) {
        const templates = {};
        
        config.selectedPages.forEach(pageType => {
            templates[pageType] = {
                name: pageType,
                wireframe: this.generateWireframeCode(pageType, config),
                breakpoints: this.generateBreakpointBehavior(pageType, config),
                interactions: this.generateInteractionPatterns(pageType, config)
            };
        });
        
        return templates;
    }

    generateWireframeCode(pageType, config) {
        // Generate HTML/CSS for interactive wireframe
        const pageConfig = this.getPageConfig(pageType);
        const theme = config.theme;
        
        return {
            html: this.generatePageHTML(pageConfig, theme),
            css: this.generatePageCSS(pageConfig, theme),
            js: this.generatePageJS(pageConfig, theme)
        };
    }

    generateMarkdownOutput(designSystem) {
        return `
# ${designSystem.meta.name} Design System

Generated on ${new Date().toLocaleDateString()}

## Overview

${designSystem.meta.description}

**Theme**: ${designSystem.meta.theme}
**Pages**: ${designSystem.meta.pages.join(', ')}

## Design Tokens

### Colors

\`\`\`css
${this.generateColorCSS(designSystem.tokens.colors)}
\`\`\`

### Typography

\`\`\`css
${this.generateTypographyCSS(designSystem.tokens.typography)}
\`\`\`

### Spacing

\`\`\`css
${this.generateSpacingCSS(designSystem.tokens.spacing)}
\`\`\`

## Components

${Object.entries(designSystem.components).map(([name, component]) => 
    this.generateComponentMarkdown(name, component)
).join('\n\n')}

## Page Templates

${Object.entries(designSystem.pages).map(([name, page]) => 
    this.generatePageMarkdown(name, page)
).join('\n\n')}

## Guidelines

${this.generateGuidelinesMarkdown(designSystem.guidelines)}
        `;
    }

    generateComponentMarkdown(name, component) {
        return `
### ${component.name}

${component.description}

**Props**: ${Object.keys(component.props).join(', ')}

#### Variants
${component.variants.map(variant => `- ${variant}`).join('\n')}

#### Responsive Behavior
${component.responsive}

#### Accessibility
${component.accessibility}

#### Code

\`\`\`html
${component.code.html}
\`\`\`

\`\`\`css
${component.code.css}
\`\`\`
        `;
    }

    generatePageMarkdown(name, page) {
        return `
### ${page.name}

#### Interactive Wireframe

<div class="wireframe-embed">
${page.wireframe.html}
<style>
${page.wireframe.css}
</style>
<script>
${page.wireframe.js}
</script>
</div>

#### Responsive Breakpoints

${Object.entries(page.breakpoints).map(([breakpoint, behavior]) => 
    `**${breakpoint}**: ${behavior}`
).join('\n')}

#### Interaction Patterns

${page.interactions.map(interaction => `- ${interaction}`).join('\n')}
        `;
    }
}
```

### Phase 5: Application Logic and State Management

#### 5.1 Main Application (scripts/app.js)
```javascript
class DesignSystemApp {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 6;
        this.state = {
            selectedTheme: null,
            selectedPages: [],
            navigationPreferences: {},
            authenticationStates: {},
            designCustomizations: {},
            generatedSystem: null
        };
        
        this.wireframeEngine = new WireframeEngine();
        this.designGenerator = new DesignSystemGenerator();
        this.exporter = new ExportManager();
    }

    init() {
        this.wireframeEngine.init();
        this.setupEventListeners();
        this.loadStepContent(1);
        this.updateStepIndicator();
    }

    setupEventListeners() {
        document.getElementById('next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevStep());
        
        // Device selector in preview panel
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDevice(e.target.dataset.device);
            });
        });
        
        // Preview panel toggle
        document.getElementById('toggle-preview').addEventListener('click', () => {
            this.togglePreviewPanel();
        });
    }

    loadStepContent(step) {
        const contentContainer = document.querySelector('.step-content');
        
        switch(step) {
            case 1:
                contentContainer.innerHTML = this.generateStyleSelectionStep();
                this.setupStyleSelection();
                break;
            case 2:
                contentContainer.innerHTML = this.generatePageSelectionStep();
                this.setupPageSelection();
                break;
            case 3:
                contentContainer.innerHTML = this.generateNavigationStep();
                this.setupNavigationCustomization();
                break;
            case 4:
                contentContainer.innerHTML = this.generateAuthStatesStep();
                this.setupAuthenticationStates();
                break;
            case 5:
                contentContainer.innerHTML = this.generateDesignCustomizationStep();
                this.setupDesignCustomization();
                break;
            case 6:
                contentContainer.innerHTML = this.generateExportStep();
                this.setupExport();
                break;
        }
    }

    generateStyleSelectionStep() {
        return `
            <div class="step-header">
                <h2>Choose Your Base Style</h2>
                <p>Select a design style that matches your project's personality</p>
            </div>
            
            <div class="style-grid">
                ${Object.entries(themes).map(([key, theme]) => `
                    <div class="style-option" data-theme="${key}">
                        <div class="style-preview">
                            ${this.generateStylePreview(theme)}
                        </div>
                        <div class="style-info">
                            <h3>${theme.name}</h3>
                            <p>${theme.description}</p>
                            <div class="design-principles">
                                <h4>Design Principles:</h4>
                                <ul>
                                    ${Object.entries(theme.principles).map(([key, principle]) => 
                                        `<li><strong>${key}:</strong> ${principle}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupStyleSelection() {
        document.querySelectorAll('.style-option').forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.style-option').forEach(opt => 
                    opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Update state
                this.state.selectedTheme = option.dataset.theme;
                
                // Update preview
                this.updatePreview();
                
                // Enable next button
                this.updateNavigationButtons();
            });
        });
    }

    generatePageSelectionStep() {
        return `
            <div class="step-header">
                <h2>Select Page Types</h2>
                <p>Choose the pages your application will need</p>
            </div>
            
            <div class="page-categories">
                ${this.generatePageCategories()}
            </div>
            
            <div class="selected-pages">
                <h3>Selected Pages</h3>
                <div class="selected-pages-list"></div>
            </div>
        `;
    }

    generateNavigationStep() {
        return `
            <div class="step-header">
                <h2>Navigation Patterns</h2>
                <p>Customize navigation for different screen sizes</p>
            </div>
            
            <div class="navigation-config">
                <div class="nav-section">
                    <h3>Mobile Navigation</h3>
                    <div class="nav-options" data-device="mobile">
                        <label class="nav-option">
                            <input type="radio" name="mobile-nav" value="hamburger">
                            <div class="nav-preview">
                                ${this.generateNavPreview('hamburger')}
                            </div>
                            <span>Hamburger Menu</span>
                        </label>
                        <label class="nav-option">
                            <input type="radio" name="mobile-nav" value="bottom-tabs">
                            <div class="nav-preview">
                                ${this.generateNavPreview('bottom-tabs')}
                            </div>
                            <span>Bottom Tabs</span>
                        </label>
                    </div>
                </div>
                
                <div class="nav-section">
                    <h3>Desktop Navigation</h3>
                    <div class="nav-options" data-device="desktop">
                        <label class="nav-option">
                            <input type="radio" name="desktop-nav" value="horizontal">
                            <div class="nav-preview">
                                ${this.generateNavPreview('horizontal')}
                            </div>
                            <span>Horizontal Bar</span>
                        </label>
                        <label class="nav-option">
                            <input type="radio" name="desktop-nav" value="sidebar">
                            <div class="nav-preview">
                                ${this.generateNavPreview('sidebar')}
                            </div>
                            <span>Sidebar</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    updatePreview() {
        if (this.state.selectedTheme) {
            const previewPage = this.state.selectedPages[0] || 'landing-public';
            this.wireframeEngine.generateWireframe(
                previewPage, 
                this.state.selectedTheme, 
                this.wireframeEngine.currentDevice
            );
        }
    }

    nextStep() {
        if (this.currentStep < this.maxSteps && this.isStepValid()) {
            this.currentStep++;
            this.loadStepContent(this.currentStep);
            this.updateStepIndicator();
            this.updateNavigationButtons();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.loadStepContent(this.currentStep);
            this.updateStepIndicator();
            this.updateNavigationButtons();
        }
    }

    isStepValid() {
        switch(this.currentStep) {
            case 1:
                return this.state.selectedTheme !== null;
            case 2:
                return this.state.selectedPages.length > 0;
            case 3:
                return Object.keys(this.state.navigationPreferences).length > 0;
            case 4:
                return true; // Authentication states are optional
            case 5:
                return true; // Design customizations are optional
            default:
                return true;
        }
    }

    generateDesignSystem() {
        const config = {
            theme: themes[this.state.selectedTheme],
            selectedPages: this.state.selectedPages,
            navigationPreferences: this.state.navigationPreferences,
            authenticationStates: this.state.authenticationStates,
            customizations: this.state.designCustomizations
        };
        
        this.state.generatedSystem = this.designGenerator.generateDesignSystem(config);
        return this.state.generatedSystem;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new DesignSystemApp();
    app.init();
});
```

### Phase 6: Export and File Generation

#### 6.1 Export Manager (scripts/export.js)
```javascript
class ExportManager {
    constructor() {
        this.designSystem = null;
    }

    exportAsMarkdown(designSystem) {
        const generator = new DesignSystemGenerator();
        const markdown = generator.generateMarkdownOutput(designSystem);
        
        this.downloadFile('design-system.md', markdown, 'text/markdown');
    }

    exportAsHTML(designSystem) {
        const html = this.generateHTMLOutput(designSystem);
        this.downloadFile('design-system.html', html, 'text/html');
    }

    exportAsJSON(designSystem) {
        const json = JSON.stringify(designSystem, null, 2);
        this.downloadFile('design-system.json', json, 'application/json');
    }

    generateHTMLOutput(designSystem) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${designSystem.meta.name} Design System</title>
    <style>
        ${this.generateDesignSystemCSS(designSystem)}
    </style>
</head>
<body>
    <div class="design-system-doc">
        <header class="doc-header">
            <h1>${designSystem.meta.name}</h1>
            <p>${designSystem.meta.description}</p>
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
            ${this.generateTokensSection(designSystem.tokens)}
            ${this.generateComponentsSection(designSystem.components)}
            ${this.generatePagesSection(designSystem.pages)}
            ${this.generateGuidelinesSection(designSystem.guidelines)}
        </main>
    </div>
    
    <script>
        ${this.generateInteractiveFeatures()}
    </script>
</body>
</html>
        `;
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}
```

## Implementation Timeline

### Phase 1 (Days 1-2): Foundation
- Set up project structure
- Implement base CSS architecture
- Create theme data structure
- Build basic navigation

### Phase 2 (Days 3-4): Core Features
- Implement step-by-step wizard
- Build theme selection with previews
- Create page type selection system
- Add basic wireframe rendering

### Phase 3 (Days 5-6): Interactivity
- Implement interactive wireframe engine
- Add device switching and responsive previews
- Create navigation pattern customization
- Build authentication state configuration

### Phase 4 (Days 7-8): Advanced Features
- Implement design customization (colors, fonts)
- Build comprehensive design token generation
- Create component library generation
- Add animation and interaction patterns

### Phase 5 (Days 9-10): Export and Polish
- Implement markdown export with embedded wireframes
- Add HTML and JSON export options
- Create comprehensive documentation generation
- Polish UI and add keyboard navigation

## Success Criteria

1. **Complete workflow**: User can go from theme selection to exported design system in under 10 minutes
2. **Interactive wireframes**: All page types show realistic scrolling, navigation, and responsive behavior
3. **Comprehensive output**: Generated design system includes tokens, components, guidelines, and interactive examples
4. **Professional quality**: Output is polished enough to use as project documentation
5. **Accessibility**: Full keyboard navigation and screen reader support
6. **Performance**: Smooth 60fps animations and interactions throughout

## Deliverables

1. **Working web application** with full wizard flow
2. **Design system templates** for all supported themes and page types
3. **Interactive wireframe library** with realistic behaviors
4. **Export functionality** generating markdown, HTML, and JSON formats
5. **Documentation** including setup instructions and customization guide
6. **Code quality** with modular architecture and comprehensive comments

This workflow provides everything needed for Claude Code to build a comprehensive, production-ready design system generator that goes far beyond static wireframes to create truly interactive, customizable design systems with embedded working examples.