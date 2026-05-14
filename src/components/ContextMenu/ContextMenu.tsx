import type { HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import styles from './ContextMenu.module.css';
import { Icon } from '../Icon/Icon';

export interface ContextMenuItem {
  label: string;
  state?: 'default' | 'danger' | 'destructive' | 'disabled';
  hasIcon?: boolean;
  hasDivider?: boolean;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
}

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  items?: ContextMenuItem[];
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onSelectedIndexChange?: (index: number, item: ContextMenuItem) => void;
  children?: ReactNode;
  className?: string;
}

const stateClassMap = {
  default: styles.default,
  selected: styles.selected,
  danger: styles.danger,
  destructive: styles.danger,
  disabled: styles.disabled,
};

const renderItemIcon = (item: ContextMenuItem) => {
  if (!item.hasIcon) return null;

  if (item.icon) {
    return <span className={styles.icon}>{item.icon}</span>;
  }

  if (item.iconSrc) {
    return <img className={styles.iconImage} src={item.iconSrc} alt={item.iconAlt ?? ''} aria-hidden={item.iconAlt ? undefined : true} />;
  }

  return <span className={styles.icon}><Icon name="more" size={18} /></span>;
};

/** ContextMenu는 항목을 클릭하면 내부 선택 인덱스를 갱신하고, 선택된 항목에 체크 아이콘을 보여줘요. */
export const ContextMenu = ({
  items,
  selectedIndex,
  defaultSelectedIndex,
  onSelectedIndexChange,
  children,
  className = '',
  ...divProps
}: ContextMenuProps) => {
  const initialSelectedIndex = defaultSelectedIndex ?? -1;
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(initialSelectedIndex);
  const activeIndex = selectedIndex ?? internalSelectedIndex;
  const classNames = [styles.contextMenu, className].filter(Boolean).join(' ');

  const handleItemClick = (index: number, item: ContextMenuItem) => {
    if (item.state === 'disabled') return;

    if (selectedIndex === undefined) {
      setInternalSelectedIndex(index);
    }

    onSelectedIndexChange?.(index, item);
    item.onClick?.();
  };

  return (
    <div className={classNames} role="menu" {...divProps}>
      {children ??
        items?.map((item, index) => {
          const isSelected = index === activeIndex;
          const isDanger = item.state === 'danger' || item.state === 'destructive';
          const isDisabled = item.state === 'disabled';
          const visualState: keyof typeof stateClassMap = isDisabled
            ? 'disabled'
            : isDanger
              ? 'danger'
              : isSelected
                ? 'selected'
                : 'default';
          const shouldShowDivider = item.hasDivider ?? true;

          return (
            <div key={`${item.label}-${index}`} className={styles.itemBlock}>
              <button
                type="button"
                className={[styles.menuItem, stateClassMap[visualState]].filter(Boolean).join(' ')}
                role="menuitemradio"
                aria-checked={isSelected}
                disabled={isDisabled}
                onClick={() => handleItemClick(index, item)}
              >
                {renderItemIcon(item)}
                <span className={styles.label}>{item.label}</span>
                {isSelected && !isDanger ? <Icon name="check" size={16} /> : null}
              </button>
              {shouldShowDivider ? <span className={styles.divider} aria-hidden="true" /> : null}
            </div>
          );
        })}
    </div>
  );
};
