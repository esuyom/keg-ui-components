import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from './BottomTabBar.module.css';

const bottomTabIconMap = {
  home: new URL('../../assets/images/bottom-tab-home.svg?no-inline', import.meta.url).href,
  mentor: new URL('../../assets/images/bottom-tab-mentor.svg?no-inline', import.meta.url).href,
  community: new URL('../../assets/images/bottom-tab-community.svg?no-inline', import.meta.url).href,
  study: new URL('../../assets/images/bottom-tab-study.svg?no-inline', import.meta.url).href,
  my: new URL('../../assets/images/bottom-tab-my.svg?no-inline', import.meta.url).href,
};

type BottomTabIconName = keyof typeof bottomTabIconMap;

export interface BottomTabItem {
  label: string;
  iconName?: BottomTabIconName;
  icon?: ReactNode;
}

export interface BottomTabBarProps extends HTMLAttributes<HTMLElement> {
  styleVariant?: 'default' | 'glass';
  /** 탭 개수 값은 2~5개 메뉴를 노출하는 용도로 사용해요. */
  itemCount?: 2 | 3 | 4 | 5;
  /** 현재 활성화된 탭 인덱스예요. 아이콘과 라벨을 함께 강조해요. */
  selectedIndex?: number;
  items?: BottomTabItem[];
  onTabChange?: (index: number) => void;
  className?: string;
}

const styleClassMap = {
  default: styles.default,
  glass: styles.glass,
};

const defaultItems: BottomTabItem[] = [
  { label: '홈', iconName: 'home' },
  { label: '멘토', iconName: 'mentor' },
  { label: '커뮤니티', iconName: 'community' },
  { label: '수강정보', iconName: 'study' },
  { label: '마이', iconName: 'my' },
];

const BottomTabIcon = ({ name }: { name: BottomTabIconName }) => (
  <span
    className={styles.icon}
    style={{ '--bottom-tab-icon': `url("${bottomTabIconMap[name]}")` } as CSSProperties}
    aria-hidden="true"
  />
);

/** 하단 탭은 기본 5개 메뉴를 보여주고, 활성 탭은 아이콘과 라벨을 함께 강조해요. */
export const BottomTabBar = ({
  styleVariant = 'default',
  itemCount = 5,
  selectedIndex = 0,
  items = defaultItems,
  onTabChange,
  className = '',
  ...navProps
}: BottomTabBarProps) => {
  const visibleItems = items.slice(0, itemCount);
  const activeIndex = Math.min(Math.max(selectedIndex, 0), visibleItems.length - 1);

  return (
    <nav
      className={[styles.bottomTabBar, styleClassMap[styleVariant], className].filter(Boolean).join(' ')}
      aria-label="주요 화면"
      {...navProps}
    >
      <div className={styles.container}>
        {visibleItems.map((item, index) => {
          const selected = index === activeIndex;

          return (
            <button
              key={`${item.label}-${index}`}
              className={[styles.tab, selected ? styles.selected : ''].filter(Boolean).join(' ')}
              type="button"
              aria-current={selected ? 'page' : undefined}
              aria-label={item.label}
              onClick={() => onTabChange?.(index)}
            >
              {item.icon ?? <BottomTabIcon name={item.iconName ?? 'home'} />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
