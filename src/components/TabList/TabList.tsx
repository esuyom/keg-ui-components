import type { HTMLAttributes } from 'react';
import styles from './TabList.module.css';

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  tabs?: TabItem[];
  value?: string;
  layout?: 'equal' | 'fixed';
  hasLeadingScrollHint?: boolean;
  hasTrailingScrollHint?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
}

const layoutClassMap = {
  equal: styles.equal,
  fixed: styles.fixed,
};

/** TabList는 tab 역할 버튼을 렌더링하고, equal/fixed 레이아웃으로 탭 너비 전략을 바꿔요. */
export const TabList = ({
  tabs = [
    { label: 'Tab 1', value: '1' },
    { label: 'Tab 2', value: '2' },
  ],
  value,
  layout = 'equal',
  hasLeadingScrollHint = false,
  hasTrailingScrollHint = false,
  onValueChange,
  className = '',
  ...divProps
}: TabListProps) => {
  const currentValue = value ?? tabs[0]?.value;
  const classNames = [
    styles.tabList,
    layoutClassMap[layout],
    hasLeadingScrollHint ? styles.leadingHint : '',
    hasTrailingScrollHint ? styles.trailingHint : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="tablist" {...divProps}>
      {tabs.map((tab) => {
        const selected = tab.value === currentValue;

        return (
          <button
            key={tab.value}
            className={[styles.tab, selected ? styles.selected : ''].filter(Boolean).join(' ')}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={tab.disabled}
            onClick={() => onValueChange?.(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
