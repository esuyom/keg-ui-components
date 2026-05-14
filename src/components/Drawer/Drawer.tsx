import type { HTMLAttributes } from 'react';
import styles from './Drawer.module.css';
import { Accordion } from '../Accordion/Accordion';
import { NavBar } from '../NavBar/NavBar';

export interface DrawerMenuItem {
  label: string;
  selected?: boolean;
}

export interface DrawerSection {
  label: string;
  items?: DrawerMenuItem[];
  isExpanded?: boolean;
  disabled?: boolean;
}

export interface DrawerProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  sections?: DrawerSection[];
  className?: string;
}

/** Drawer는 NavBar와 Accordion을 조합해 좌측 메뉴 구조를 만들고, 섹션 배열로 메뉴를 구성해요. */
export const Drawer = ({
  title = 'Menu',
  sections = [
    { label: '학원 소식', isExpanded: true, items: [{ label: '공지사항', selected: true }, { label: '이벤트' }] },
    { label: '수업 관리', items: [{ label: '강의실 현황' }, { label: '출결 관리' }] },
  ],
  className = '',
  ...asideProps
}: DrawerProps) => {
  return (
    <aside className={[styles.drawer, className].filter(Boolean).join(' ')} {...asideProps}>
      <NavBar variant="titleLeft" title={title} rightAction1={null} rightAction2={null} />
      <div className={styles.menu}>
        {sections.map((section) => (
          <Accordion
            key={section.label}
            label={section.label}
            isExpanded={section.isExpanded}
            disabled={section.disabled}
            items={section.items}
          />
        ))}
      </div>
    </aside>
  );
};
