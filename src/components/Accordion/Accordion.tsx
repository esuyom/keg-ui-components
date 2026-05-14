import React, { useId, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './Accordion.module.css';
import { Asset } from '../Asset/Asset';
import { Icon } from '../Icon/Icon';

const caretRightIcon = new URL('../../assets/images/bottom-tab-caret-right.svg?no-inline', import.meta.url).href;
const caretDownIcon = new URL('../../assets/images/bottom-tab-caret-down.svg?no-inline', import.meta.url).href;

export interface AccordionItem {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface AccordionProps {
  label: string;
  isExpanded?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  items?: AccordionItem[];
  onItemClick?: (item: AccordionItem, index: number) => void;
  children?: React.ReactNode;
  className?: string;
}

const CaretIcon = ({ icon }: { icon: string }) => (
  <span
    className={styles.caretSvg}
    style={{ '--accordion-caret-icon': `url("${icon}")` } as CSSProperties}
    aria-hidden="true"
  />
);

/** 헤더 버튼이 펼침 상태를 제어하고, 아이콘과 화살표는 Asset 슬롯 안에서 같은 크기로 정렬해요. */
export const Accordion: React.FC<AccordionProps> = ({
  label,
  isExpanded,
  expanded,
  defaultExpanded,
  onExpandedChange,
  disabled = false,
  leadingIcon,
  items,
  onItemClick,
  children,
  className = '',
}) => {
  const contentId = useId();
  const [internalExpanded, setInternalExpanded] = useState(
    defaultExpanded ?? isExpanded ?? false
  );
  const isControlled = expanded !== undefined;
  const isOpen = expanded ?? internalExpanded;
  const resolvedLeadingIcon = leadingIcon === undefined ? <Icon name="siren" size={14} /> : leadingIcon;

  const handleToggle = () => {
    if (disabled) return;

    const nextExpanded = !isOpen;
    if (!isControlled) {
      setInternalExpanded(nextExpanded);
    }
    onExpandedChange?.(nextExpanded);
  };

  const handleItemClick = (item: AccordionItem, index: number) => {
    if (item.disabled) return;

    item.onClick?.();
    onItemClick?.(item, index);
  };

  return (
    <div
      className={[
        styles.accordion,
        isOpen ? styles.expanded : '',
        disabled ? styles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className={styles.header}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={styles.headerContent}>
          {resolvedLeadingIcon && (
            // 좌측 아이콘은 배경이 있는 Asset으로 감싸서 Figma의 rounded 아이콘 슬롯과 맞춰요.
            <Asset
              variant="icon"
              shape="rounded"
              size={24}
              iconSize={14}
              hasContainer
              className={styles.leadingIcon}
            >
              {resolvedLeadingIcon}
            </Asset>
          )}
          <span className={styles.label}>{label}</span>
        </span>
        {/* 화살표는 열림 상태에 따라 방향만 바꾸고, 클릭 이벤트는 헤더 버튼 하나에서 처리해요. */}
        <Asset
          variant="icon"
          hasContainer={false}
          custom
          size={16}
          iconSize={16}
          className={styles.caretIcon}
        >
          <CaretIcon icon={isOpen ? caretDownIcon : caretRightIcon} />
        </Asset>
      </button>

      {isOpen && (
        <div id={contentId} className={styles.content}>
          <div className={styles.contentRow}>
            {resolvedLeadingIcon && <span className={styles.iconSpacer} aria-hidden="true" />}
            <div className={styles.contentList}>
              {items
                ? items.map((item, index) => (
                    <button
                      key={`${item.label}-${index}`}
                      type="button"
                      className={[
                        styles.contentItem,
                        item.selected ? styles.itemSelected : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={item.disabled}
                      aria-current={item.selected ? 'page' : undefined}
                      onClick={() => handleItemClick(item, index)}
                    >
                      {item.label}
                    </button>
                  ))
                : children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
