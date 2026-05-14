import type { HTMLAttributes } from 'react';
import styles from './HomeIndicator.module.css';

export interface HomeIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'light' | 'dark';
  className?: string;
}

const modeClassMap = {
  light: styles.light,
  dark: styles.dark,
};

/** HomeIndicator는 모바일 하단 제스처 바를 mode에 맞는 색상으로 단순 표시해요. */
export const HomeIndicator = ({ mode = 'light', className = '', ...divProps }: HomeIndicatorProps) => {
  return (
    <div className={[styles.homeIndicator, modeClassMap[mode], className].filter(Boolean).join(' ')} {...divProps}>
      <span aria-hidden="true" />
    </div>
  );
};
