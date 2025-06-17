import { DesignSystemState } from '../types';

export class DocumentationService {
  static generateReadme(state: DesignSystemState): string {
    return `# ${state.projectInfo.name}

${state.projectInfo.description}

## Overview

This design system was generated using FlexiTheme and includes:

- **UI Style**: ${state.uiStyle?.name || 'Custom'}
- **Target Framework**: ${state.projectInfo.targetFramework}
- **Version**: ${state.projectInfo.version}
- **Author**: ${state.projectInfo.author}

## Quick Start

### Installation

\`\`\`bash
# Clone this design system
git clone [your-repo-url]

# Install dependencies (if applicable)
npm install
\`\`\`

### Usage

#### CSS Variables

Include the CSS file in your project:

\`\`\`html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/utilities.css">
<link rel="stylesheet" href="styles/components.css">
\`\`\`

#### React Components

Import components as needed:

\`\`\`jsx
import { Button } from './components/Button';
import { Card } from './components/Card';

function App() {
  return (
    <Card>
      <h1>Welcome</h1>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
\`\`\`

## Design Tokens

### Colors

The design system includes a comprehensive color palette:

${Object.entries(state.designTokens.colors)
  .map(
    ([name]) => `
#### ${name.charAt(0).toUpperCase() + name.slice(1)}
- Uses: ${
      name === 'primary'
        ? 'Primary actions, links, focus states'
        : name === 'secondary'
          ? 'Secondary actions, accents'
          : name === 'neutral'
            ? 'Text, backgrounds, borders'
            : name === 'success'
              ? 'Success states, confirmations'
              : name === 'warning'
                ? 'Warning states, cautions'
                : name === 'error'
                  ? 'Error states, destructive actions'
                  : 'Information and highlights'
    }
`,
  )
  .join('\n')}

### Typography

Font families and sizes are defined for consistent text rendering across your application.

### Spacing

A consistent spacing scale ensures proper alignment and visual rhythm.

## Components

This design system includes ${state.selectedComponents.length} components:

${state.selectedComponents.map((comp) => `- **${comp.name}** (${comp.category})`).join('\n')}

## Page Templates

Pre-built page templates for common use cases:

${state.selectedPages.map((page) => `- **${page.name}** - ${page.description}`).join('\n')}

## File Structure

\`\`\`
${state.projectInfo.name}/
├── README.md              # This file
├── tokens/               # Design tokens in various formats
│   ├── tokens.json
│   ├── variables.css
│   └── variables.scss
├── styles/               # Compiled styles
│   ├── reset.css
│   ├── utilities.css
│   └── components.css
├── components/           # Component implementations
│   └── [components...]
├── examples/             # Usage examples
│   ├── button-examples.html
│   ├── form-examples.html
│   └── card-examples.html
└── wireframe.html        # Interactive wireframe preview
\`\`\`

## Customization

### Modifying Design Tokens

Edit the design tokens in \`tokens/tokens.json\` and regenerate the CSS variables:

\`\`\`json
{
  "colors": {
    "primary": {
      "500": "#your-color"
    }
  }
}
\`\`\`

### Adding New Components

1. Create a new component file in the \`components/\` directory
2. Follow the existing component patterns
3. Update the component styles in \`styles/components.css\`

## Browser Support

This design system supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

To contribute to this design system:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This design system is proprietary to ${state.projectInfo.author}.

---

Generated with [FlexiTheme](https://flexitheme.com) - The Design System Generator
`;
  }

  static generateStyleGuide(state: DesignSystemState): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.projectInfo.name} - Style Guide</title>
  <link rel="stylesheet" href="./styles/variables.css">
  <link rel="stylesheet" href="./styles/reset.css">
  <link rel="stylesheet" href="./styles/utilities.css">
  <link rel="stylesheet" href="./styles/components.css">
  <style>
    body {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section {
      margin-bottom: 4rem;
    }
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--color-neutral-200);
    }
    .subsection {
      margin-bottom: 2rem;
    }
    .subsection-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .color-group {
      background: white;
      border: 1px solid var(--color-neutral-200);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    .color-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-transform: capitalize;
    }
    .color-swatches {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .color-swatch {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .swatch {
      width: 40px;
      height: 40px;
      border-radius: 0.25rem;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .swatch-label {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    .typography-samples {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .type-sample {
      padding: 1rem;
      background: var(--color-neutral-50);
      border-radius: 0.5rem;
    }
    .type-label {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
      margin-bottom: 0.5rem;
    }
    .spacing-demo {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
    .space-item {
      text-align: center;
    }
    .space-box {
      background: var(--color-primary-500);
      margin-bottom: 0.5rem;
    }
    .component-examples {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .example-group {
      padding: 2rem;
      background: var(--color-neutral-50);
      border-radius: 0.5rem;
    }
    .example-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .example-items {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-start;
    }
  </style>
</head>
<body>
  <h1>${state.projectInfo.name} Style Guide</h1>
  <p>${state.projectInfo.description}</p>

  <section class="section">
    <h2 class="section-title">Colors</h2>
    <div class="color-grid">
      ${Object.entries(state.designTokens.colors)
        .map(
          ([name, colorScale]) => `
        <div class="color-group">
          <div class="color-name">${name}</div>
          <div class="color-swatches">
            ${Object.entries(colorScale)
              .map(
                ([shade, value]) => `
              <div class="color-swatch">
                <div class="swatch" style="background-color: ${value}"></div>
                <span class="swatch-label">${shade}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Typography</h2>
    
    <div class="subsection">
      <h3 class="subsection-title">Font Sizes</h3>
      <div class="typography-samples">
        ${Object.entries(state.designTokens.typography.fontSize)
          .map(
            ([size, value]) => `
          <div class="type-sample">
            <div class="type-label">${size} (${value})</div>
            <div style="font-size: ${value}">The quick brown fox jumps over the lazy dog</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="subsection">
      <h3 class="subsection-title">Font Weights</h3>
      <div class="typography-samples">
        ${Object.entries(state.designTokens.typography.fontWeight)
          .map(
            ([weight, value]) => `
          <div class="type-sample">
            <div class="type-label">${weight} (${value})</div>
            <div style="font-weight: ${value}">The quick brown fox jumps over the lazy dog</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Spacing</h2>
    <div class="spacing-demo">
      ${Object.entries(state.designTokens.spacing)
        .map(
          ([size, value]) => `
        <div class="space-item">
          <div class="space-box" style="width: ${value}; height: ${value}"></div>
          <div>${size}</div>
          <div style="font-size: 0.875rem; color: var(--color-neutral-600)">${value}</div>
        </div>
      `,
        )
        .join('')}
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Components</h2>
    <div class="component-examples">
      
      <div class="example-group">
        <h3 class="example-title">Buttons</h3>
        <div class="example-items">
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn btn-outline">Outline Button</button>
          <button class="btn btn-primary" disabled>Disabled</button>
        </div>
      </div>

      <div class="example-group">
        <h3 class="example-title">Cards</h3>
        <div class="example-items">
          <div class="card" style="width: 300px">
            <div class="card-header">
              <h4 class="card-title">Card Title</h4>
            </div>
            <div class="card-content">
              This is a card component with header and content areas.
            </div>
          </div>
        </div>
      </div>

      <div class="example-group">
        <h3 class="example-title">Form Elements</h3>
        <div class="example-items" style="flex-direction: column; align-items: stretch; max-width: 400px">
          <div class="input-group">
            <label class="input-label">Input Label</label>
            <input type="text" class="input" placeholder="Enter text...">
          </div>
          <div class="input-group">
            <label class="input-label">Select</label>
            <select class="input">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Utility Classes</h2>
    <p>This design system includes utility classes for:</p>
    <ul>
      <li>Text colors: <code>.text-primary-500</code>, <code>.text-neutral-700</code>, etc.</li>
      <li>Background colors: <code>.bg-primary-100</code>, <code>.bg-neutral-50</code>, etc.</li>
      <li>Spacing: <code>.p-md</code>, <code>.m-lg</code>, <code>.px-sm</code>, etc.</li>
      <li>Border radius: <code>.rounded-sm</code>, <code>.rounded-lg</code>, etc.</li>
      <li>Shadows: <code>.shadow-sm</code>, <code>.shadow-lg</code>, etc.</li>
    </ul>
  </section>
</body>
</html>`;
  }

  static generateComponentDocumentation(state: DesignSystemState): string {
    return `# Component Documentation

## Overview

This document provides detailed information about each component in the ${state.projectInfo.name} design system.

${state.selectedComponents
  .map(
    (component) => `
## ${component.name}

**Category**: ${component.category}  
**Variants**: ${component.variants.join(', ')}

### Usage

\`\`\`${state.projectInfo.targetFramework === 'react' ? 'jsx' : 'html'}
${this.getComponentExample(component, state.projectInfo.targetFramework)}
\`\`\`

### Props/Attributes

${this.getComponentProps(component)}

### Variants

${component.variants.map((variant) => `- **${variant}**: ${this.getVariantDescription(component.id, variant)}`).join('\n')}

---
`,
  )
  .join('\n')}

## Best Practices

1. **Consistency**: Always use the design system components instead of creating custom alternatives
2. **Accessibility**: All components follow WCAG 2.1 AA guidelines
3. **Responsive**: Components are designed to work across all screen sizes
4. **Performance**: Components are optimized for performance and minimal bundle size

## Customization

Components can be customized using:
- CSS custom properties (design tokens)
- Variant props
- Additional CSS classes
- Component composition

## Contributing

When adding new components:
1. Follow the existing component structure
2. Include all necessary variants
3. Add comprehensive documentation
4. Ensure accessibility compliance
5. Test across all supported browsers
`;
  }

  private static getComponentExample(component: any, framework: string): string {
    switch (framework) {
      case 'react':
        return `<${component.name} variant="primary" size="medium">
  Content
</${component.name}>`;
      case 'vue':
        return `<${component.name} variant="primary" size="medium">
  Content
</${component.name}>`;
      default:
        return `<div class="${component.id} ${component.id}-primary ${component.id}-medium">
  Content
</div>`;
    }
  }

  private static getComponentProps(_component: any): string {
    const commonProps = [
      '- `variant`: Visual style variant',
      '- `size`: Component size',
      '- `className/class`: Additional CSS classes',
      '- `disabled`: Disabled state (if applicable)',
      '- `onClick/click`: Click handler (if applicable)',
    ];

    return commonProps.join('\n');
  }

  private static getVariantDescription(componentId: string, variant: string): string {
    const descriptions: Record<string, Record<string, string>> = {
      button: {
        default: 'Standard button appearance',
        primary: 'Primary action button',
        secondary: 'Secondary action button',
        outline: 'Outlined button style',
        ghost: 'Minimal button style',
      },
      card: {
        default: 'Standard card with subtle border',
        bordered: 'Card with prominent border',
        elevated: 'Card with shadow elevation',
        minimal: 'Card with minimal styling',
      },
    };

    return descriptions[componentId]?.[variant] || `${variant} style variant`;
  }
}
