import { FC, useState } from 'react';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import styles from './DesignTokensStep.module.css';

export const DesignTokensStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'shadows'>(
    'colors',
  );

  const handleColorChange = (colorType: string, shade: string, value: string) => {
    dispatch({
      type: 'UPDATE_DESIGN_TOKENS',
      payload: {
        colors: {
          ...state.designTokens.colors,
          [colorType]: {
            ...state.designTokens.colors[colorType as keyof typeof state.designTokens.colors],
            [shade]: value,
          },
        },
      },
    });
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
  };

  const renderColorEditor = () => {
    const primaryColor = state.designTokens.colors.primary;

    return (
      <div className={styles.tokenSection}>
        <h3>Primary Color</h3>
        <div className={styles.colorGrid}>
          {Object.entries(primaryColor).map(([shade, value]) => (
            <div key={shade} className={styles.colorItem}>
              <label>{shade}</label>
              <div className={styles.colorInputWrapper}>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange('primary', shade, e.target.value)}
                  className={styles.colorPicker}
                />
                <Input
                  value={value}
                  onChange={(e) => handleColorChange('primary', shade, e.target.value)}
                  placeholder="#000000"
                />
              </div>
              <div className={styles.colorPreview} style={{ backgroundColor: value }} />
            </div>
          ))}
        </div>

        <div className={styles.quickActions}>
          <Button variant="outline" size="sm">
            Generate from Base Color
          </Button>
          <Button variant="outline" size="sm">
            Import from Image
          </Button>
        </div>
      </div>
    );
  };

  const renderTypographyEditor = () => {
    return (
      <div className={styles.tokenSection}>
        <h3>Font Families</h3>
        <div className={styles.inputGrid}>
          <Input
            label="Sans Serif"
            value={state.designTokens.typography.fontFamily.sans}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DESIGN_TOKENS',
                payload: {
                  typography: {
                    ...state.designTokens.typography,
                    fontFamily: {
                      ...state.designTokens.typography.fontFamily,
                      sans: e.target.value,
                    },
                  },
                },
              });
            }}
            fullWidth
          />
          <Input
            label="Serif"
            value={state.designTokens.typography.fontFamily.serif}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DESIGN_TOKENS',
                payload: {
                  typography: {
                    ...state.designTokens.typography,
                    fontFamily: {
                      ...state.designTokens.typography.fontFamily,
                      serif: e.target.value,
                    },
                  },
                },
              });
            }}
            fullWidth
          />
          <Input
            label="Monospace"
            value={state.designTokens.typography.fontFamily.mono}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DESIGN_TOKENS',
                payload: {
                  typography: {
                    ...state.designTokens.typography,
                    fontFamily: {
                      ...state.designTokens.typography.fontFamily,
                      mono: e.target.value,
                    },
                  },
                },
              });
            }}
            fullWidth
          />
        </div>

        <h3>Font Sizes</h3>
        <div className={styles.sizeGrid}>
          {Object.entries(state.designTokens.typography.fontSize).map(([size, value]) => (
            <div key={size} className={styles.sizeItem}>
              <label>{size}</label>
              <Input
                value={value}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE_DESIGN_TOKENS',
                    payload: {
                      typography: {
                        ...state.designTokens.typography,
                        fontSize: {
                          ...state.designTokens.typography.fontSize,
                          [size]: e.target.value,
                        },
                      },
                    },
                  });
                }}
              />
              <div className={styles.sizePreview} style={{ fontSize: value }}>
                Aa
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpacingEditor = () => {
    return (
      <div className={styles.tokenSection}>
        <h3>Spacing Scale</h3>
        <div className={styles.spacingGrid}>
          {Object.entries(state.designTokens.spacing).map(([size, value]) => (
            <div key={size} className={styles.spacingItem}>
              <label>{size}</label>
              <Input
                value={value}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE_DESIGN_TOKENS',
                    payload: {
                      spacing: {
                        ...state.designTokens.spacing,
                        [size]: e.target.value,
                      },
                    },
                  });
                }}
              />
              <div className={styles.spacingPreview}>
                <div className={styles.spacingBox} style={{ width: value, height: value }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderShadowsEditor = () => {
    return (
      <div className={styles.tokenSection}>
        <h3>Shadow Styles</h3>
        <div className={styles.shadowGrid}>
          {Object.entries(state.designTokens.shadows).map(([size, value]) => (
            <div key={size} className={styles.shadowItem}>
              <label>{size}</label>
              <Input
                value={value}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE_DESIGN_TOKENS',
                    payload: {
                      shadows: {
                        ...state.designTokens.shadows,
                        [size]: e.target.value,
                      },
                    },
                  });
                }}
                fullWidth
              />
              <div className={styles.shadowPreview} style={{ boxShadow: value }} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Customize Design Tokens</h2>
        <p>Fine-tune your design system's visual properties.</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'colors' ? styles.active : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'typography' ? styles.active : ''}`}
          onClick={() => setActiveTab('typography')}
        >
          Typography
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'spacing' ? styles.active : ''}`}
          onClick={() => setActiveTab('spacing')}
        >
          Spacing
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'shadows' ? styles.active : ''}`}
          onClick={() => setActiveTab('shadows')}
        >
          Shadows
        </button>
      </div>

      <Card className={styles.editorCard}>
        {activeTab === 'colors' && renderColorEditor()}
        {activeTab === 'typography' && renderTypographyEditor()}
        {activeTab === 'spacing' && renderSpacingEditor()}
        {activeTab === 'shadows' && renderShadowsEditor()}
      </Card>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handleBack} size="lg">
          Back
        </Button>
        <Button variant="primary" onClick={handleNext} size="lg">
          Next: Select Pages
        </Button>
      </div>
    </div>
  );
};
