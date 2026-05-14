import type { HTMLAttributes, ReactNode } from 'react';
import styles from './StepIndicator.module.css';

export interface StepIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md';
  custom?: boolean;
  count?: number;
  current?: number;
  carouselContainer?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  sm: styles['size-sm'],
  md: styles['size-md'],
};

/** StepIndicator는 현재 인덱스를 긴 dot으로 강조하고, custom이면 외부 캐러셀 슬롯을 그대로 보여줘요. */
export const StepIndicator = ({
  size = 'sm',
  custom = false,
  count = 3,
  current = 0,
  carouselContainer,
  className = '',
  ...divProps
}: StepIndicatorProps) => {
  return (
    <div className={[styles.stepIndicator, sizeClassMap[size], custom ? styles.custom : '', className].filter(Boolean).join(' ')} {...divProps}>
      {custom && carouselContainer ? (
        carouselContainer
      ) : (
        Array.from({ length: count }, (_, index) => (
          <span
            key={index}
            className={[styles.dot, index === current ? styles.active : ''].filter(Boolean).join(' ')}
            aria-current={index === current ? 'step' : undefined}
          />
        ))
      )}
    </div>
  );
};
