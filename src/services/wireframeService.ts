import { DesignSystemState, PageTemplate } from '../types';

export class WireframeService {
  static generateWireframe(state: DesignSystemState): string {
    const { wireframeConfig, selectedPages } = state;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.projectInfo.name} - Interactive Wireframe</title>
  <style>
    ${this.generateWireframeStyles(state)}
  </style>
</head>
<body>
  <div class="wireframe-container">
    <header class="wireframe-header">
      <h1>${state.projectInfo.name} Wireframe</h1>
      <div class="viewport-controls">
        <button class="viewport-btn" data-viewport="mobile">Mobile</button>
        <button class="viewport-btn" data-viewport="tablet">Tablet</button>
        <button class="viewport-btn active" data-viewport="desktop">Desktop</button>
      </div>
    </header>
    
    <div class="wireframe-viewport ${wireframeConfig.viewport}" id="viewport">
      ${selectedPages.map((page) => this.generatePageWireframe(page, state)).join('\n')}
    </div>
    
    <aside class="wireframe-sidebar">
      <h2>Pages</h2>
      <nav class="page-nav">
        ${selectedPages
          .map(
            (page, index) => `
          <button class="page-nav-item ${index === 0 ? 'active' : ''}" data-page="${page.id}">
            ${page.name}
          </button>
        `,
          )
          .join('')}
      </nav>
      
      <h2>Settings</h2>
      <div class="settings">
        <label>
          <input type="checkbox" id="showGrid" ${wireframeConfig.showGrid ? 'checked' : ''}>
          Show Grid
        </label>
        <label>
          <input type="checkbox" id="showLabels" ${wireframeConfig.showLabels ? 'checked' : ''}>
          Show Labels
        </label>
        <label>
          <input type="checkbox" id="interactive" ${wireframeConfig.interactive ? 'checked' : ''}>
          Interactive Mode
        </label>
      </div>
    </aside>
  </div>
  
  <script>
    ${this.generateWireframeScript()}
  </script>
</body>
</html>`;
  }

  private static generateWireframeStyles(state: DesignSystemState): string {
    const tokens = state.designTokens;

    return `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: ${tokens.typography.fontFamily.sans};
        background: #f5f5f5;
        color: #333;
      }
      
      .wireframe-container {
        display: grid;
        grid-template-columns: 1fr 250px;
        grid-template-rows: auto 1fr;
        height: 100vh;
        gap: 1px;
        background: #ddd;
      }
      
      .wireframe-header {
        grid-column: 1 / -1;
        background: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .wireframe-header h1 {
        font-size: 1.5rem;
        color: ${tokens.colors.primary[700]};
      }
      
      .viewport-controls {
        display: flex;
        gap: 0.5rem;
      }
      
      .viewport-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s;
      }
      
      .viewport-btn:hover {
        background: #f5f5f5;
      }
      
      .viewport-btn.active {
        background: ${tokens.colors.primary[600]};
        color: white;
        border-color: ${tokens.colors.primary[600]};
      }
      
      .wireframe-viewport {
        background: white;
        overflow: auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
      
      .wireframe-viewport.mobile {
        padding: 2rem 0;
      }
      
      .wireframe-viewport.mobile .page-wireframe {
        max-width: 375px;
        margin: 0 auto;
      }
      
      .wireframe-viewport.tablet .page-wireframe {
        max-width: 768px;
        margin: 0 auto;
      }
      
      .wireframe-viewport.desktop .page-wireframe {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .page-wireframe {
        width: 100%;
        min-height: 100vh;
        background: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        display: none;
        position: relative;
      }
      
      .page-wireframe.active {
        display: block;
      }
      
      .page-wireframe.show-grid {
        background-image: 
          repeating-linear-gradient(0deg, #f0f0f0 0px, transparent 1px, transparent 20px, #f0f0f0 21px),
          repeating-linear-gradient(90deg, #f0f0f0 0px, transparent 1px, transparent 20px, #f0f0f0 21px);
      }
      
      .wireframe-sidebar {
        background: white;
        padding: 1.5rem;
        overflow-y: auto;
      }
      
      .wireframe-sidebar h2 {
        font-size: 1.125rem;
        margin-bottom: 1rem;
        color: ${tokens.colors.neutral[800]};
      }
      
      .page-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;
      }
      
      .page-nav-item {
        padding: 0.75rem;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        border-radius: 4px;
        text-align: left;
        transition: all 0.2s;
      }
      
      .page-nav-item:hover {
        background: #f5f5f5;
      }
      
      .page-nav-item.active {
        background: ${tokens.colors.primary[100]};
        border-color: ${tokens.colors.primary[300]};
        color: ${tokens.colors.primary[800]};
      }
      
      .settings {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .settings label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      
      /* Wireframe Components */
      .wireframe-component {
        position: relative;
        padding: 1rem;
        margin: 0.5rem;
        border: 2px dashed #ddd;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fafafa;
        transition: all 0.2s;
      }
      
      .wireframe-component.show-labels::before {
        content: attr(data-component);
        position: absolute;
        top: -10px;
        left: 10px;
        background: white;
        padding: 0 0.5rem;
        font-size: 0.75rem;
        color: #666;
        font-weight: 500;
      }
      
      .wireframe-component.interactive:hover {
        border-color: ${tokens.colors.primary[400]};
        background: ${tokens.colors.primary[50]};
        cursor: pointer;
      }
      
      /* Layout Components */
      .wireframe-navbar {
        height: 60px;
        background: #f0f0f0;
        border-color: #ccc;
      }
      
      .wireframe-hero {
        min-height: 400px;
        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
      }
      
      .wireframe-sidebar-layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        min-height: calc(100vh - 60px);
      }
      
      .wireframe-sidebar-nav {
        background: #f8f8f8;
        border-right: 1px solid #ddd;
      }
      
      .wireframe-content {
        padding: 2rem;
      }
      
      .wireframe-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        padding: 1rem;
      }
      
      .wireframe-card {
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        min-height: 150px;
      }
      
      .wireframe-form {
        max-width: 500px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      
      .wireframe-footer {
        min-height: 200px;
        background: #2c3e50;
        color: white;
        margin-top: auto;
      }
    `;
  }

  private static generatePageWireframe(page: PageTemplate, state: DesignSystemState): string {
    const showLabels = state.wireframeConfig.showLabels ? 'show-labels' : '';
    const interactive = state.wireframeConfig.interactive ? 'interactive' : '';
    const showGrid = state.wireframeConfig.showGrid ? 'show-grid' : '';

    return `
      <div class="page-wireframe ${showGrid}" data-page="${page.id}">
        ${this.generateLayoutComponents(page, `${showLabels} ${interactive}`)}
      </div>
    `;
  }

  private static generateLayoutComponents(page: PageTemplate, classes: string): string {
    switch (page.layout) {
      case 'single-column':
        return this.generateSingleColumnLayout(page, classes);
      case 'sidebar-layout':
        return this.generateSidebarLayout(page, classes);
      case 'two-column':
        return this.generateTwoColumnLayout(page, classes);
      case 'centered-form':
        return this.generateCenteredFormLayout(page, classes);
      case 'centered-auth':
        return this.generateCenteredAuthLayout(page, classes);
      default:
        return this.generateSingleColumnLayout(page, classes);
    }
  }

  private static generateSingleColumnLayout(page: PageTemplate, classes: string): string {
    return `
      ${
        page.components.includes('Navigation')
          ? `
        <div class="wireframe-component wireframe-navbar ${classes}" data-component="Navigation">
          Navigation Bar
        </div>
      `
          : ''
      }
      
      ${
        page.components.includes('Hero')
          ? `
        <div class="wireframe-component wireframe-hero ${classes}" data-component="Hero">
          Hero Section
        </div>
      `
          : ''
      }
      
      <div class="wireframe-content">
        ${page.components
          .filter((c) => !['Navigation', 'Hero', 'Footer'].includes(c))
          .map(
            (component) => `
          <div class="wireframe-component ${classes}" data-component="${component}">
            ${component}
          </div>
        `,
          )
          .join('')}
      </div>
      
      ${
        page.components.includes('Footer')
          ? `
        <div class="wireframe-component wireframe-footer ${classes}" data-component="Footer">
          Footer
        </div>
      `
          : ''
      }
    `;
  }

  private static generateSidebarLayout(page: PageTemplate, classes: string): string {
    return `
      ${
        page.components.includes('Header')
          ? `
        <div class="wireframe-component wireframe-navbar ${classes}" data-component="Header">
          Header
        </div>
      `
          : ''
      }
      
      <div class="wireframe-sidebar-layout">
        ${
          page.components.includes('Sidebar')
            ? `
          <div class="wireframe-component wireframe-sidebar-nav ${classes}" data-component="Sidebar">
            Sidebar
          </div>
        `
            : ''
        }
        
        <div class="wireframe-content">
          ${page.components
            .filter((c) => !['Header', 'Sidebar', 'Footer'].includes(c))
            .map(
              (component) => `
            <div class="wireframe-component ${classes}" data-component="${component}">
              ${component}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    `;
  }

  private static generateTwoColumnLayout(page: PageTemplate, classes: string): string {
    return `
      ${
        page.components.includes('Navigation')
          ? `
        <div class="wireframe-component wireframe-navbar ${classes}" data-component="Navigation">
          Navigation
        </div>
      `
          : ''
      }
      
      <div class="wireframe-grid" style="grid-template-columns: 2fr 1fr;">
        <div>
          ${page.components
            .filter((c) => !['Navigation', 'Footer', 'Sidebar', 'Filters'].includes(c))
            .map(
              (component) => `
            <div class="wireframe-component ${classes}" data-component="${component}">
              ${component}
            </div>
          `,
            )
            .join('')}
        </div>
        
        <div>
          ${page.components
            .filter((c) => ['Sidebar', 'Filters'].includes(c))
            .map(
              (component) => `
            <div class="wireframe-component ${classes}" data-component="${component}">
              ${component}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
      
      ${
        page.components.includes('Footer')
          ? `
        <div class="wireframe-component wireframe-footer ${classes}" data-component="Footer">
          Footer
        </div>
      `
          : ''
      }
    `;
  }

  private static generateCenteredFormLayout(page: PageTemplate, classes: string): string {
    return `
      ${
        page.components.includes('Navigation')
          ? `
        <div class="wireframe-component wireframe-navbar ${classes}" data-component="Navigation">
          Navigation
        </div>
      `
          : ''
      }
      
      <div class="wireframe-form">
        ${page.components
          .filter((c) => !['Navigation', 'Footer'].includes(c))
          .map(
            (component) => `
          <div class="wireframe-component ${classes}" data-component="${component}">
            ${component}
          </div>
        `,
          )
          .join('')}
      </div>
      
      ${
        page.components.includes('Footer')
          ? `
        <div class="wireframe-component wireframe-footer ${classes}" data-component="Footer">
          Footer
        </div>
      `
          : ''
      }
    `;
  }

  private static generateCenteredAuthLayout(page: PageTemplate, classes: string): string {
    return `
      <div class="wireframe-form" style="margin-top: 10vh;">
        ${page.components
          .map(
            (component) => `
          <div class="wireframe-component ${classes}" data-component="${component}">
            ${component}
          </div>
        `,
          )
          .join('')}
      </div>
    `;
  }

  private static generateWireframeScript(): string {
    return `
      // Viewport controls
      document.querySelectorAll('.viewport-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const viewport = e.target.dataset.viewport;
          const viewportEl = document.getElementById('viewport');
          
          document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          
          viewportEl.className = 'wireframe-viewport ' + viewport;
        });
      });
      
      // Page navigation
      document.querySelectorAll('.page-nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const pageId = e.target.dataset.page;
          
          document.querySelectorAll('.page-nav-item').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          
          document.querySelectorAll('.page-wireframe').forEach(page => {
            page.classList.remove('active');
            if (page.dataset.page === pageId) {
              page.classList.add('active');
            }
          });
        });
      });
      
      // Settings controls
      document.getElementById('showGrid').addEventListener('change', (e) => {
        document.querySelectorAll('.page-wireframe').forEach(page => {
          page.classList.toggle('show-grid', e.target.checked);
        });
      });
      
      document.getElementById('showLabels').addEventListener('change', (e) => {
        document.querySelectorAll('.wireframe-component').forEach(comp => {
          comp.classList.toggle('show-labels', e.target.checked);
        });
      });
      
      document.getElementById('interactive').addEventListener('change', (e) => {
        document.querySelectorAll('.wireframe-component').forEach(comp => {
          comp.classList.toggle('interactive', e.target.checked);
        });
      });
      
      // Interactive mode clicks
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('wireframe-component') && e.target.classList.contains('interactive')) {
          const componentName = e.target.dataset.component;
          alert('Component clicked: ' + componentName + '\\n\\nIn a real implementation, this would show component details or allow editing.');
        }
      });
      
      // Show first page by default
      document.querySelector('.page-wireframe')?.classList.add('active');
    `;
  }
}
