import type { HTMLAttributes, ReactNode } from 'react';
import styles from './TopHeader.module.css';
import { Asset } from '../Asset/Asset';
import { Badge } from '../Badge/Badge';

export interface TopHeaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'md';
  resource?: 'Badge' | 'Asset';
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  lg: styles['size-lg'],
  md: styles['size-md'],
};

const resourceClassMap = {
  Badge: styles.resourceBadge,
  Asset: styles.resourceAsset,
};

/** TopHeader는 Badge 또는 Asset 리소스를 제목 위에 붙이고, 우측 액션 슬롯을 별도로 받을 수 있어요. */
export const TopHeader = ({
  size = 'lg',
  resource = 'Badge',
  title = 'Header title',
  subtitle,
  action,
  className = '',
  ...divProps
}: TopHeaderProps) => {
  return (
    <header className={[styles.topHeader, sizeClassMap[size], resourceClassMap[resource], className].filter(Boolean).join(' ')} {...divProps}>
      <div className={styles.copy}>
        <div className={styles.resource}>
          {resource === 'Badge' ? <Badge size="sm">NEW</Badge> : <Asset variant="icon" size="sm" hasContainer />}
        </div>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
};
