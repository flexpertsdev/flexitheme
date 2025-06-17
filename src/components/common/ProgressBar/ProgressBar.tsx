import { FC } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={styles.container}>
      {(label || showPercentage) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showPercentage && (
            <span className={styles.percentage}>{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`}>
        <div
          className={`${styles.bar} ${styles[variant]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
