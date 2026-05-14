import type { HTMLAttributes, ReactNode } from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** SectionHeader는 제목/설명 영역과 우측 액션 슬롯을 분리해서 섹션 상단 레이아웃을 안정적으로 유지해요. */
export const SectionHeader = ({
  title = 'Section title',
  description,
  action,
  className = '',
  ...divProps
}: SectionHeaderProps) => {
  return (
    <div className={[styles.sectionHeader, className].filter(Boolean).join(' ')} {...divProps}>
      <div className={styles.textGroup}>
        <h3 className={styles.title}>{title}</h3>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
};
