import type { HTMLAttributes } from 'react';
import styles from './SkeletonUI.module.css';

export interface SkeletonUIProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'text' | 'list' | 'card';
  className?: string;
}

const typeClassMap = {
  text: styles.text,
  list: styles.list,
  card: styles.card,
};

/** SkeletonUI는 실제 데이터 대신 표시하는 로딩 자리이며 type에 따라 줄 수와 카드 형태를 바꿔요. */
export const SkeletonUI = ({ type = 'text', className = '', ...divProps }: SkeletonUIProps) => {
  return (
    <div className={[styles.skeleton, typeClassMap[type], className].filter(Boolean).join(' ')} aria-hidden="true" {...divProps}>
      <span />
      {type !== 'text' ? <span /> : null}
      {type === 'list' ? <span /> : null}
    </div>
  );
};
