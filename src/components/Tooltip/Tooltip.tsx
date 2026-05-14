import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: 'sm' | 'md';
  arrowPlacement?: 'top' | 'bottom' | 'left' | 'right';
  arrowAlign?: 'start' | 'center' | 'end' | 'custom';
  customArrow?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  sm: styles['size-sm'],
  md: styles['size-md'],
};

const placementClassMap = {
  top: styles.top,
  bottom: styles.bottom,
  left: styles.left,
  right: styles.right,
};

const alignClassMap = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  custom: styles.alignCustom,
};

/** Tooltip은 메시지 박스와 꼬리 위치/정렬을 class 조합으로 바꿔 안내 문구를 표시해요. */
export const Tooltip = ({
  message = 'Tooltip',
  size = 'sm',
  arrowPlacement = 'bottom',
  arrowAlign = 'center',
  customArrow,
  className = '',
  ...divProps
}: TooltipProps) => {
  return (
    <div
      className={[
        styles.tooltip,
        sizeClassMap[size],
        placementClassMap[arrowPlacement],
        alignClassMap[arrowAlign],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="tooltip"
      {...divProps}
    >
      <span className={styles.message}>{message}</span>
      {customArrow ?? <span className={styles.arrow} aria-hidden="true" />}
    </div>
  );
};
