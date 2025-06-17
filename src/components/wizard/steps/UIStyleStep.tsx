import { FC } from 'react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import { uiStyles } from '../../../data/uiStyles';
import styles from './UIStyleStep.module.css';

export const UIStyleStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const selectedStyleId = state.uiStyle?.id;

  const handleSelectStyle = (styleId: string) => {
    const style = uiStyles.find((s) => s.id === styleId);
    if (style) {
      dispatch({ type: 'SET_UI_STYLE', payload: style });
    }
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Choose Your UI Style</h2>
        <p>Select a pre-designed style or start with a custom theme.</p>
      </div>

      <div className={styles.styleGrid}>
        {uiStyles.map((style) => (
          <Card
            key={style.id}
            variant={selectedStyleId === style.id ? 'elevated' : 'bordered'}
            className={styles.styleCard}
          >
            <div
              className={`${styles.stylePreview} ${
                selectedStyleId === style.id ? styles.selected : ''
              }`}
              onClick={() => handleSelectStyle(style.id)}
            >
              <div className={styles.previewPlaceholder}>
                {/* In a real app, this would show an actual preview */}
                <div className={styles.previewMockup}>
                  <div className={styles.previewHeader} />
                  <div className={styles.previewContent}>
                    <div className={styles.previewButton} />
                    <div className={styles.previewText} />
                    <div className={styles.previewText} />
                  </div>
                </div>
              </div>
              <h3>{style.name}</h3>
              <p>{style.description}</p>
            </div>
          </Card>
        ))}

        <Card variant="bordered" className={styles.styleCard}>
          <div
            className={`${styles.stylePreview} ${styles.customStyle} ${
              selectedStyleId === 'custom' ? styles.selected : ''
            }`}
            onClick={() => handleSelectStyle('custom')}
          >
            <div className={styles.customIcon}>+</div>
            <h3>Custom Style</h3>
            <p>Start from scratch with your own design tokens</p>
          </div>
        </Card>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handleBack} size="lg">
          Back
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedStyleId} size="lg">
          Next: Customize Design Tokens
        </Button>
      </div>
    </div>
  );
};
