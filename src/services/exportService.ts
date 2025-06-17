import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DesignSystemState, GeneratedOutput } from '../types';
import { TokenService } from './tokenService';
import { WireframeService } from './wireframeService';
import { ComponentGeneratorService } from './componentGeneratorService';
import { DocumentationService } from './documentationService';
import { ConfigGeneratorService } from './configGeneratorService';

export class ExportService {
  static async exportDesignSystem(
    state: DesignSystemState,
    onProgress?: (progress: number, step: string) => void,
  ): Promise<void> {
    onProgress?.(0, 'Initializing export...');

    const output = await this.generateOutput(state, onProgress);

    onProgress?.(90, 'Creating export file...');

    switch (state.exportFormat.type) {
      case 'json':
        this.exportJSON(state);
        break;
      case 'css':
        this.exportCSS(output, state);
        break;
      case 'scss':
        this.exportSCSS(state);
        break;
      case 'tailwind':
        this.exportTailwind(state);
        break;
      case 'styled-components':
        this.exportStyledComponents(state);
        break;
      default:
        await this.exportZip(output, state, onProgress);
    }

    onProgress?.(100, 'Export complete!');
  }

  private static async generateOutput(
    state: DesignSystemState,
    onProgress?: (progress: number, step: string) => void,
  ): Promise<GeneratedOutput> {
    onProgress?.(10, 'Preparing design tokens...');
    const tokens = state.designTokens;

    onProgress?.(20, 'Generating styles...');
    const styles = this.generateStyles(state);

    onProgress?.(40, 'Generating components...');
    const components = await ComponentGeneratorService.generateComponents(state);

    onProgress?.(60, 'Creating documentation...');
    const documentation = DocumentationService.generateReadme(state);

    onProgress?.(70, 'Generating examples...');
    const examples = this.generateExamples();

    onProgress?.(80, 'Creating wireframe...');
    const wireframe = WireframeService.generateWireframe(state);

    return {
      tokens,
      styles,
      components,
      documentation,
      examples,
      wireframe,
    };
  }

  private static generateStyles(state: DesignSystemState): Record<string, string> {
    const styles: Record<string, string> = {};

    styles['variables.css'] = TokenService.generateCSSVariables(state.designTokens);
    styles['reset.css'] = this.generateResetCSS();
    styles['utilities.css'] = this.generateUtilityClasses(state);
    styles['components.css'] = this.generateComponentStyles(state);

    return styles;
  }

  private static generateResetCSS(): string {
    return `/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  color: var(--color-neutral-900);
  background-color: var(--color-neutral-50);
  line-height: var(--leading-normal);
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
}`;
  }

  private static generateUtilityClasses(state: DesignSystemState): string {
    const utilities: string[] = [];

    // Text utilities
    Object.entries(state.designTokens.typography.fontSize).forEach(([size, value]) => {
      utilities.push(`.text-${size} { font-size: ${value}; }`);
    });

    // Color utilities
    Object.entries(state.designTokens.colors).forEach(([colorName, scale]) => {
      Object.entries(scale).forEach(([shade, value]) => {
        utilities.push(`.text-${colorName}-${shade} { color: ${value}; }`);
        utilities.push(`.bg-${colorName}-${shade} { background-color: ${value}; }`);
        utilities.push(`.border-${colorName}-${shade} { border-color: ${value}; }`);
      });
    });

    // Spacing utilities
    Object.entries(state.designTokens.spacing).forEach(([size, value]) => {
      utilities.push(`.p-${size} { padding: ${value}; }`);
      utilities.push(`.m-${size} { margin: ${value}; }`);
      utilities.push(`.px-${size} { padding-left: ${value}; padding-right: ${value}; }`);
      utilities.push(`.py-${size} { padding-top: ${value}; padding-bottom: ${value}; }`);
      utilities.push(`.mx-${size} { margin-left: ${value}; margin-right: ${value}; }`);
      utilities.push(`.my-${size} { margin-top: ${value}; margin-bottom: ${value}; }`);
    });

    // Border radius utilities
    Object.entries(state.designTokens.borderRadius).forEach(([size, value]) => {
      utilities.push(`.rounded-${size} { border-radius: ${value}; }`);
    });

    // Shadow utilities
    Object.entries(state.designTokens.shadows).forEach(([size, value]) => {
      utilities.push(`.shadow-${size} { box-shadow: ${value}; }`);
    });

    return utilities.join('\n');
  }

  private static generateComponentStyles(state: DesignSystemState): string {
    // Basic component styles based on selected components
    const styles: string[] = [];

    if (state.selectedComponents.some((c) => c.id === 'button')) {
      styles.push(this.generateButtonStyles());
    }

    if (state.selectedComponents.some((c) => c.id === 'card')) {
      styles.push(this.generateCardStyles());
    }

    if (state.selectedComponents.some((c) => c.id === 'input-field')) {
      styles.push(this.generateInputStyles());
    }

    return styles.join('\n\n');
  }

  private static generateButtonStyles(): string {
    return `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
}

.btn-secondary {
  background-color: var(--color-secondary-600);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-700);
}`;
  }

  private static generateCardStyles(): string {
    return `.card {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-fast);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  margin-bottom: var(--space-sm);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-900);
}

.card-content {
  color: var(--color-neutral-700);
}`;
  }

  private static generateInputStyles(): string {
    return `.input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: all var(--transition-fast);
}

.input:hover {
  border-color: var(--color-neutral-400);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: var(--color-error-500);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}`;
  }

  private static generateExamples(): Record<string, string> {
    const examples: Record<string, string> = {};

    examples['button-examples.html'] = this.generateButtonExamples();
    examples['form-examples.html'] = this.generateFormExamples();
    examples['card-examples.html'] = this.generateCardExamples();

    return examples;
  }

  private static generateButtonExamples(): string {
    return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../styles/variables.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/utilities.css">
  <link rel="stylesheet" href="../styles/components.css">
</head>
<body class="p-xl">
  <h1 class="text-3xl mb-lg">Button Examples</h1>
  
  <h2 class="text-xl mb-md">Primary Buttons</h2>
  <div class="mb-lg">
    <button class="btn btn-primary">Default</button>
    <button class="btn btn-primary" disabled>Disabled</button>
  </div>
  
  <h2 class="text-xl mb-md">Secondary Buttons</h2>
  <div class="mb-lg">
    <button class="btn btn-secondary">Default</button>
    <button class="btn btn-secondary" disabled>Disabled</button>
  </div>
</body>
</html>`;
  }

  private static generateFormExamples(): string {
    return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../styles/variables.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/utilities.css">
  <link rel="stylesheet" href="../styles/components.css">
</head>
<body class="p-xl">
  <h1 class="text-3xl mb-lg">Form Examples</h1>
  
  <form class="max-w-md">
    <div class="mb-md">
      <label class="block text-sm font-medium mb-xs">Email</label>
      <input type="email" class="input" placeholder="you@example.com">
    </div>
    
    <div class="mb-md">
      <label class="block text-sm font-medium mb-xs">Password</label>
      <input type="password" class="input" placeholder="••••••••">
    </div>
    
    <div class="mb-md">
      <label class="block text-sm font-medium mb-xs">Error State</label>
      <input type="text" class="input input-error" placeholder="This field has an error">
      <p class="text-sm text-error-600 mt-xs">Please fix this error</p>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</body>
</html>`;
  }

  private static generateCardExamples(): string {
    return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../styles/variables.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/utilities.css">
  <link rel="stylesheet" href="../styles/components.css">
</head>
<body class="p-xl bg-neutral-100">
  <h1 class="text-3xl mb-lg">Card Examples</h1>
  
  <div class="grid grid-cols-3 gap-md">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Basic Card</h3>
      </div>
      <div class="card-content">
        <p>This is a basic card with header and content.</p>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Interactive Card</h3>
      </div>
      <div class="card-content">
        <p>Hover over this card to see the shadow effect.</p>
        <button class="btn btn-primary mt-md">Action</button>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Card with List</h3>
      </div>
      <div class="card-content">
        <ul class="list-disc pl-md">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  private static exportJSON(state: DesignSystemState): void {
    const blob = new Blob([TokenService.generateJSONTokens(state.designTokens)], {
      type: 'application/json',
    });
    saveAs(blob, `${state.projectInfo.name}-tokens.json`);
  }

  private static exportCSS(output: GeneratedOutput, state: DesignSystemState): void {
    const cssContent = Object.values(output.styles).join('\n\n');
    const blob = new Blob([cssContent], { type: 'text/css' });
    saveAs(blob, `${state.projectInfo.name}-styles.css`);
  }

  private static exportSCSS(state: DesignSystemState): void {
    const scssContent = TokenService.generateSCSSVariables(state.designTokens);
    const blob = new Blob([scssContent], { type: 'text/scss' });
    saveAs(blob, `${state.projectInfo.name}-variables.scss`);
  }

  private static exportTailwind(state: DesignSystemState): void {
    const configContent = TokenService.generateTailwindConfig(state.designTokens);
    const blob = new Blob([configContent], { type: 'text/javascript' });
    saveAs(blob, 'tailwind.config.js');
  }

  private static exportStyledComponents(state: DesignSystemState): void {
    const themeContent = TokenService.generateStyledComponentsTheme(state.designTokens);
    const blob = new Blob([themeContent], { type: 'text/javascript' });
    saveAs(blob, 'theme.js');
  }

  private static async exportZip(
    output: GeneratedOutput,
    state: DesignSystemState,
    onProgress?: (progress: number, step: string) => void,
  ): Promise<void> {
    const zip = new JSZip();

    onProgress?.(92, 'Adding files to archive...');

    // Add documentation
    if (state.exportFormat.includeDocumentation) {
      zip.file('README.md', output.documentation);
      zip.file('STYLE_GUIDE.html', DocumentationService.generateStyleGuide(state));
      zip.file('COMPONENT_DOCS.md', DocumentationService.generateComponentDocumentation(state));
    }

    // Add configuration files
    zip.file('package.json', ConfigGeneratorService.generatePackageJson(state));
    zip.file('.gitignore', ConfigGeneratorService.generateGitignore());
    zip.file('postcss.config.js', ConfigGeneratorService.generatePostCSSConfig());
    zip.file(
      '.eslintrc.json',
      ConfigGeneratorService.generateEslintConfig(state.projectInfo.targetFramework),
    );
    zip.file('.prettierrc', ConfigGeneratorService.generatePrettierConfig());

    if (state.projectInfo.targetFramework !== 'vanilla') {
      zip.file(
        'tsconfig.json',
        ConfigGeneratorService.generateTsConfig(state.projectInfo.targetFramework),
      );
      zip.file('vite.config.js', ConfigGeneratorService.generateViteConfig(state));
    }

    if (state.projectInfo.targetFramework === 'react') {
      zip.file('.babelrc', ConfigGeneratorService.generateBabelConfig('react'));
    }

    // Add GitHub Actions workflow
    const githubFolder = zip.folder('.github');
    const workflowsFolder = githubFolder?.folder('workflows');
    if (workflowsFolder) {
      workflowsFolder.file('ci-cd.yml', ConfigGeneratorService.generateCICDWorkflow(state));
    }

    // Add styles
    const stylesFolder = zip.folder('styles');
    if (stylesFolder) {
      Object.entries(output.styles).forEach(([filename, content]) => {
        stylesFolder.file(filename, content);
      });
    }

    // Add components
    const componentsFolder = zip.folder('components');
    if (componentsFolder) {
      Object.entries(output.components).forEach(([filename, content]) => {
        componentsFolder.file(filename, content);
      });
    }

    // Add examples
    if (state.exportFormat.includeExamples) {
      const examplesFolder = zip.folder('examples');
      if (examplesFolder) {
        Object.entries(output.examples).forEach(([filename, content]) => {
          examplesFolder.file(filename, content);
        });
      }
    }

    // Add wireframe
    zip.file('wireframe.html', output.wireframe);

    // Add tokens in various formats
    const tokensFolder = zip.folder('tokens');
    if (tokensFolder) {
      tokensFolder.file('tokens.json', TokenService.generateJSONTokens(state.designTokens));
      tokensFolder.file('variables.css', TokenService.generateCSSVariables(state.designTokens));
      tokensFolder.file('variables.scss', TokenService.generateSCSSVariables(state.designTokens));
      tokensFolder.file(
        'tailwind.config.js',
        TokenService.generateTailwindConfig(state.designTokens),
      );
      tokensFolder.file('theme.js', TokenService.generateStyledComponentsTheme(state.designTokens));
    }

    // Add source directory structure for development
    const srcFolder = zip.folder('src');
    if (srcFolder) {
      const srcStylesFolder = srcFolder.folder('styles');
      if (srcStylesFolder) {
        Object.entries(output.styles).forEach(([filename, content]) => {
          srcStylesFolder.file(filename, content);
        });
      }

      const srcComponentsFolder = srcFolder.folder('components');
      if (srcComponentsFolder) {
        Object.entries(output.components).forEach(([filename, content]) => {
          srcComponentsFolder.file(filename, content);
        });
      }
    }

    onProgress?.(98, 'Compressing files...');
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(
      content,
      `${state.projectInfo.name.toLowerCase().replace(/\s+/g, '-')}-design-system.zip`,
    );
  }
}
