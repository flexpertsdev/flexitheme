import { FC, useState } from 'react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { Select } from '../../common/Select';
import { Modal } from '../../common/Modal';
import { ProgressBar } from '../../common/ProgressBar';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import { ExportService } from '../../../services/exportService';
import { WireframePreview } from '../../preview/WireframePreview';
import styles from './PreviewExportStep.module.css';

export const PreviewExportStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStep, setExportStep] = useState('');

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 5 });
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStep('Preparing export...');

    try {
      await ExportService.exportDesignSystem(state, (progress, step) => {
        setExportProgress(progress);
        setExportStep(step);
      });
      setExportComplete(true);
    } catch (error) {
      // Log error for debugging (allowed in catch blocks)
      // eslint-disable-next-line no-console
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewProject = () => {
    dispatch({ type: 'RESET_STATE' });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
  };

  const updateWireframeConfig = (key: keyof typeof state.wireframeConfig, value: any) => {
    dispatch({
      type: 'UPDATE_WIREFRAME_CONFIG',
      payload: { [key]: value },
    });
  };

  const updateExportFormat = (key: keyof typeof state.exportFormat, value: any) => {
    dispatch({
      type: 'SET_EXPORT_FORMAT',
      payload: { ...state.exportFormat, [key]: value },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Preview & Export</h2>
        <p>Review your design system and export in your preferred format.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.preview}>
          <Card className={styles.previewCard}>
            <h3>Design System Summary</h3>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Project Name</span>
                <span className={styles.value}>{state.projectInfo.name}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>UI Style</span>
                <span className={styles.value}>{state.uiStyle?.name || 'Custom'}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Target Framework</span>
                <span className={styles.value}>{state.projectInfo.targetFramework}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Pages</span>
                <span className={styles.value}>{state.selectedPages.length} selected</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Components</span>
                <span className={styles.value}>{state.selectedComponents.length} selected</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.label}>Version</span>
                <span className={styles.value}>{state.projectInfo.version}</span>
              </div>
            </div>

            <div className={styles.tokenPreview}>
              <h4>Color Palette</h4>
              <div className={styles.colorSwatches}>
                {Object.entries(state.designTokens.colors.primary)
                  .slice(0, 5)
                  .map(([shade, color]) => (
                    <div key={shade} className={styles.swatch}>
                      <div className={styles.swatchColor} style={{ backgroundColor: color }} />
                      <span className={styles.swatchLabel}>{shade}</span>
                    </div>
                  ))}
              </div>
            </div>
          </Card>

          <Card className={styles.miniPreviewCard}>
            <h3>Wireframe Preview</h3>
            <div className={styles.miniPreview}>
              <WireframePreview />
            </div>
          </Card>

          <Card className={styles.settingsCard}>
            <h3>Wireframe Settings</h3>
            <div className={styles.settings}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.wireframeConfig.showGrid}
                  onChange={(e) => updateWireframeConfig('showGrid', e.target.checked)}
                />
                Show Grid
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.wireframeConfig.showLabels}
                  onChange={(e) => updateWireframeConfig('showLabels', e.target.checked)}
                />
                Show Component Labels
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.wireframeConfig.interactive}
                  onChange={(e) => updateWireframeConfig('interactive', e.target.checked)}
                />
                Interactive Mode
              </label>
            </div>

            <Select
              label="Default Viewport"
              options={[
                { value: 'mobile', label: 'Mobile' },
                { value: 'tablet', label: 'Tablet' },
                { value: 'desktop', label: 'Desktop' },
              ]}
              value={state.wireframeConfig.viewport}
              onChange={(e) => updateWireframeConfig('viewport', e.target.value as any)}
              fullWidth
            />
          </Card>
        </div>

        <div className={styles.exportOptions}>
          <Card className={styles.exportCard}>
            <h3>Export Options</h3>

            <Select
              label="Export Format"
              options={[
                { value: 'json', label: 'JSON Tokens' },
                { value: 'css', label: 'CSS Variables' },
                { value: 'scss', label: 'SCSS Variables' },
                { value: 'tailwind', label: 'Tailwind Config' },
                { value: 'styled-components', label: 'Styled Components Theme' },
              ]}
              value={state.exportFormat.type}
              onChange={(e) => updateExportFormat('type', e.target.value as any)}
              fullWidth
            />

            <div className={styles.exportSettings}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.exportFormat.includeDocumentation}
                  onChange={(e) => updateExportFormat('includeDocumentation', e.target.checked)}
                />
                Include Documentation
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={state.exportFormat.includeExamples}
                  onChange={(e) => updateExportFormat('includeExamples', e.target.checked)}
                />
                Include Code Examples
              </label>
            </div>

            {!exportComplete ? (
              <>
                {isExporting && (
                  <div className={styles.exportProgress}>
                    <ProgressBar
                      progress={exportProgress}
                      label={exportStep}
                      variant="default"
                      size="md"
                    />
                  </div>
                )}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? 'Exporting...' : 'Export Design System'}
                </Button>
              </>
            ) : (
              <div className={styles.exportSuccess}>
                <div className={styles.successIcon}>✓</div>
                <h4>Export Complete!</h4>
                <p>Your design system has been downloaded.</p>
                <Button variant="outline" size="sm" onClick={handleNewProject}>
                  Create New Project
                </Button>
              </div>
            )}

            <div className={styles.additionalActions}>
              <Button variant="ghost" size="sm" fullWidth onClick={() => setShowPreview(true)}>
                Preview Wireframe
              </Button>
              <Button variant="ghost" size="sm" fullWidth>
                Share Project
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handleBack} size="lg">
          Back
        </Button>
      </div>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} size="fullscreen">
        <WireframePreview fullscreen onClose={() => setShowPreview(false)} />
      </Modal>
    </div>
  );
};
