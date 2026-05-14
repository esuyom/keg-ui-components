import type { HTMLAttributes, ReactNode } from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | number;
  size?: 'sm' | 'md' | 'lg';
  custom?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  sm: styles['size-sm'],
  md: styles['size-md'],
  lg: styles['size-lg'],
};

/** ProgressBar는 value를 0부터 100 사이로 보정하고 role=progressbar 값으로 진행률을 전달해요. */
export const ProgressBar = ({
  value = 0,
  size = 'md',
  custom,
  className = '',
  ...divProps
}: ProgressBarProps) => {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className={[styles.progressBar, sizeClassMap[size], className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedValue}
      {...divProps}
    >
      {custom ?? <span className={styles.fill} style={{ width: `${normalizedValue}%` }} />}
    </div>
  );
};
