import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Overlay.module.css';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  children?: ReactNode;
  className?: string;
}

/** Overlay는 open이 false면 렌더링하지 않고, 열려 있을 때만 전체 덮개와 자식 콘텐츠를 표시해요. */
export const Overlay = ({ open = true, children, className = '', ...divProps }: OverlayProps) => {
  if (!open) return null;

  return (
    <div className={[styles.overlay, className].filter(Boolean).join(' ')} {...divProps}>
      {children}
    </div>
  );
};
