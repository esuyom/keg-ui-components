import type { HTMLAttributes } from 'react';
import styles from './StatusBar.module.css';

export interface StatusBarProps extends HTMLAttributes<HTMLDivElement> {
  mode?: 'light' | 'dark';
  time?: string;
  className?: string;
}

const modeClassMap = {
  light: styles.light,
  dark: styles.dark,
};

/** StatusBar는 모바일 상태 표시줄 예시로, mode에 따라 밝은/어두운 배경에서 색상을 바꿔요. */
export const StatusBar = ({ mode = 'light', time = '9:41', className = '', ...divProps }: StatusBarProps) => {
  return (
    <div className={[styles.statusBar, modeClassMap[mode], className].filter(Boolean).join(' ')} {...divProps}>
      <span>{time}</span>
      <span className={styles.indicators}>5G 100%</span>
    </div>
  );
};
