import { FC } from 'react';
import styles from './StepIndicator.module.css';

interface Step {
  id: number;
  title: string;
  isComplete: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className={styles.container}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isPast = step.id < currentStep;
        const isClickable = onStepClick && (step.isComplete || isPast);

        return (
          <div key={step.id} className={styles.stepWrapper}>
            <button
              className={[
                styles.step,
                isActive && styles.active,
                isPast && styles.past,
                step.isComplete && styles.complete,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={styles.stepNumber}>{step.isComplete ? '✓' : step.id}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={[styles.connector, isPast && styles.connectorComplete]
                  .filter(Boolean)
                  .join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
