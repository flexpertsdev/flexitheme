import { FC, useState, useEffect } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { PageTemplate } from '../../types';
import styles from './WireframePreview.module.css';

interface WireframePreviewProps {
  fullscreen?: boolean;
  onClose?: () => void;
}

export const WireframePreview: FC<WireframePreviewProps> = ({ fullscreen = false, onClose }) => {
  const { state } = useDesignSystem();
  const [activePageId, setActivePageId] = useState<string>('');
  const [viewport, setViewport] = useState(state.wireframeConfig.viewport);
  const [showGrid, setShowGrid] = useState(state.wireframeConfig.showGrid);
  const [showLabels, setShowLabels] = useState(state.wireframeConfig.showLabels);
  const [interactive, setInteractive] = useState(state.wireframeConfig.interactive);

  useEffect(() => {
    if (state.selectedPages.length > 0 && !activePageId) {
      setActivePageId(state.selectedPages[0].id);
    }
  }, [state.selectedPages, activePageId]);

  const activePage = state.selectedPages.find((p) => p.id === activePageId);

  const handleComponentClick = (componentName: string) => {
    if (interactive) {
      alert(
        `Component: ${componentName}\n\nIn a real implementation, this would show component details or allow editing.`,
      );
    }
  };

  const renderComponent = (componentName: string, index: number) => {
    const componentClass = `${styles.component} ${showLabels ? styles.showLabels : ''} ${interactive ? styles.interactive : ''}`;

    // Map component names to specific wireframe styles
    const componentStyles: Record<string, string> = {
      Navigation: styles.navbar,
      Hero: styles.hero,
      Features: styles.features,
      Sidebar: styles.sidebar,
      Footer: styles.footer,
      Form: styles.form,
      DataTable: styles.dataTable,
      Cards: styles.cards,
      CTA: styles.cta,
      Header: styles.header,
    };

    const specificStyle = Object.keys(componentStyles).find((key) =>
      componentName.toLowerCase().includes(key.toLowerCase()),
    );

    return (
      <div
        key={`${componentName}-${index}`}
        className={`${componentClass} ${specificStyle ? componentStyles[specificStyle] : ''}`}
        data-component={componentName}
        onClick={() => handleComponentClick(componentName)}
      >
        <div className={styles.componentContent}>{renderComponentMockup(componentName)}</div>
      </div>
    );
  };

  const renderComponentMockup = (componentName: string) => {
    const name = componentName.toLowerCase();

    if (name.includes('navigation') || name.includes('navbar')) {
      return (
        <div className={styles.navMockup}>
          <div className={styles.logo} />
          <div className={styles.navItems}>
            <div className={styles.navItem} />
            <div className={styles.navItem} />
            <div className={styles.navItem} />
            <div className={styles.navItem} />
          </div>
          <div className={styles.navButton} />
        </div>
      );
    }

    if (name.includes('hero')) {
      return (
        <div className={styles.heroMockup}>
          <div className={styles.heroText}>
            <div className={styles.heroTitle} />
            <div className={styles.heroSubtitle} />
            <div className={styles.heroButtons}>
              <div className={styles.button} />
              <div className={styles.button} />
            </div>
          </div>
          <div className={styles.heroImage} />
        </div>
      );
    }

    if (name.includes('features')) {
      return (
        <div className={styles.featureGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon} />
              <div className={styles.featureTitle} />
              <div className={styles.featureText} />
            </div>
          ))}
        </div>
      );
    }

    if (name.includes('form')) {
      return (
        <div className={styles.formMockup}>
          <div className={styles.formField} />
          <div className={styles.formField} />
          <div className={styles.formField} />
          <div className={styles.formButton} />
        </div>
      );
    }

    if (name.includes('card') || name.includes('grid')) {
      return (
        <div className={styles.cardGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.cardMockup}>
              <div className={styles.cardImage} />
              <div className={styles.cardContent}>
                <div className={styles.cardTitle} />
                <div className={styles.cardText} />
                <div className={styles.cardText} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (name.includes('footer')) {
      return (
        <div className={styles.footerMockup}>
          <div className={styles.footerColumns}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.footerColumn}>
                <div className={styles.footerTitle} />
                <div className={styles.footerLink} />
                <div className={styles.footerLink} />
                <div className={styles.footerLink} />
              </div>
            ))}
          </div>
          <div className={styles.footerBottom} />
        </div>
      );
    }

    // Default mockup
    return <div className={styles.defaultMockup}>{componentName}</div>;
  };

  const renderPageLayout = (page: PageTemplate) => {
    if (!page) return null;

    const layoutClass = `${styles.pageLayout} ${styles[page.layout.replace('-', '')]} ${showGrid ? styles.showGrid : ''}`;

    switch (page.layout) {
      case 'sidebar-layout':
        return (
          <div className={layoutClass}>
            {page.components.includes('Header') && renderComponent('Header', 0)}
            <div className={styles.sidebarContainer}>
              {page.components.includes('Sidebar') && (
                <aside className={styles.sidebarAside}>{renderComponent('Sidebar', 1)}</aside>
              )}
              <main className={styles.mainContent}>
                {page.components
                  .filter((c) => !['Header', 'Sidebar', 'Footer'].includes(c))
                  .map((comp, idx) => renderComponent(comp, idx + 2))}
              </main>
            </div>
            {page.components.includes('Footer') && renderComponent('Footer', 99)}
          </div>
        );

      case 'two-column':
        return (
          <div className={layoutClass}>
            {page.components.includes('Navigation') && renderComponent('Navigation', 0)}
            <div className={styles.twoColumnContainer}>
              <main className={styles.mainColumn}>
                {page.components
                  .filter((c) => !['Navigation', 'Footer', 'Sidebar', 'Filters'].includes(c))
                  .map((comp, idx) => renderComponent(comp, idx + 1))}
              </main>
              <aside className={styles.sideColumn}>
                {page.components
                  .filter((c) => ['Sidebar', 'Filters'].includes(c))
                  .map((comp, idx) => renderComponent(comp, idx + 10))}
              </aside>
            </div>
            {page.components.includes('Footer') && renderComponent('Footer', 99)}
          </div>
        );

      case 'centered-form':
      case 'centered-auth':
        return (
          <div className={layoutClass}>
            {page.components.includes('Navigation') && renderComponent('Navigation', 0)}
            <div className={styles.centeredContainer}>
              <div className={styles.centeredContent}>
                {page.components
                  .filter((c) => !['Navigation', 'Footer'].includes(c))
                  .map((comp, idx) => renderComponent(comp, idx + 1))}
              </div>
            </div>
            {page.components.includes('Footer') && renderComponent('Footer', 99)}
          </div>
        );

      default: // single-column
        return (
          <div className={layoutClass}>
            {page.components.map((comp, idx) => renderComponent(comp, idx))}
          </div>
        );
    }
  };

  if (state.selectedPages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No pages selected. Please select pages in Step 4 to see the wireframe preview.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.wireframePreview} ${fullscreen ? styles.fullscreen : ''}`}>
      {fullscreen && (
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      )}

      <div className={styles.previewHeader}>
        <div className={styles.pageSelector}>
          <label>Page:</label>
          <select
            value={activePageId}
            onChange={(e) => setActivePageId(e.target.value)}
            className={styles.pageSelect}
          >
            {state.selectedPages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.viewportControls}>
          <button
            className={`${styles.viewportBtn} ${viewport === 'mobile' ? styles.active : ''}`}
            onClick={() => setViewport('mobile')}
            title="Mobile View"
          >
            📱
          </button>
          <button
            className={`${styles.viewportBtn} ${viewport === 'tablet' ? styles.active : ''}`}
            onClick={() => setViewport('tablet')}
            title="Tablet View"
          >
            📱
          </button>
          <button
            className={`${styles.viewportBtn} ${viewport === 'desktop' ? styles.active : ''}`}
            onClick={() => setViewport('desktop')}
            title="Desktop View"
          >
            💻
          </button>
        </div>

        <div className={styles.previewControls}>
          <label className={styles.control}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Grid
          </label>
          <label className={styles.control}>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            Labels
          </label>
          <label className={styles.control}>
            <input
              type="checkbox"
              checked={interactive}
              onChange={(e) => setInteractive(e.target.checked)}
            />
            Interactive
          </label>
        </div>
      </div>

      <div className={styles.previewContainer}>
        <div className={`${styles.viewport} ${styles[viewport]}`}>
          <div className={styles.viewportFrame}>{activePage && renderPageLayout(activePage)}</div>
        </div>
      </div>
    </div>
  );
};
