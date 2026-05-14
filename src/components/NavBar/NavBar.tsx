import type { HTMLAttributes, ReactNode } from 'react';
import styles from './NavBar.module.css';
import { Icon } from '../Icon/Icon';
import { SearchField } from '../SearchField/SearchField';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  variant?: 'titleLeft' | 'titleCenter' | 'logo' | 'search';
  background?: boolean;
  hasTitle?: boolean;
  title?: string;
  leftAction?: ReactNode;
  rightAction1?: ReactNode;
  rightAction2?: ReactNode;
  className?: string;
}

const variantClassMap = {
  titleLeft: styles.titleLeft,
  titleCenter: styles.titleCenter,
  logo: styles.logo,
  search: styles.search,
};

/** NavBar는 좌우 액션과 중앙 영역을 고정 그리드로 배치하고, search variant에서는 SearchField를 재사용해요. */
export const NavBar = ({
  variant = 'titleLeft',
  background = true,
  hasTitle = true,
  title = 'KEG',
  leftAction,
  rightAction1,
  rightAction2,
  className = '',
  ...navProps
}: NavBarProps) => {
  return (
    <nav className={[styles.navBar, variantClassMap[variant], background ? styles.background : '', className].filter(Boolean).join(' ')} {...navProps}>
      <div className={styles.leftSlot}>
        {leftAction ?? <Icon name="arrowLeft" size={22} />}
      </div>
      <div className={styles.centerSlot}>
        {variant === 'search' ? (
          <SearchField searchButton={false} />
        ) : hasTitle ? (
          <span className={styles.title}>{title}</span>
        ) : null}
      </div>
      <div className={styles.rightSlot}>
        {rightAction1 === undefined ? <Icon name="bell" size={22} /> : rightAction1}
        {rightAction2 === undefined ? <Icon name="menu" size={22} /> : rightAction2}
      </div>
    </nav>
  );
};
