import type { HTMLAttributes, ReactNode } from 'react';
import { Children } from 'react';
import styles from './CardSlot.module.css';

export interface CardSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** index는 한 줄 전체 카드(single)인지, 같은 줄의 2개 카드 그룹(multiple)인지 결정해요. */
  index?: 'single' | 'multiple';
  size?: 'sm' | 'md' | 'lg';
  hasPadding?: boolean;
  hasShadow?: boolean;
  shadow?: boolean;
  children?: ReactNode;
  className?: string;
}

const indexClassMap = {
  single: styles.single,
  multiple: styles.multiple,
};

const sizeClassMap = {
  sm: styles['size-sm'],
  md: styles['size-md'],
  lg: styles['size-lg'],
};

/** CardSlot은 실제 콘텐츠 카드가 들어갈 자리만 맞추고, multiple이면 동일 너비 슬롯 2개를 만들어줘요. */
export const CardSlot = ({
  index = 'single',
  size = 'lg',
  hasPadding = true,
  hasShadow,
  shadow = true,
  children,
  className = '',
  ...divProps
}: CardSlotProps) => {
  const showShadow = hasShadow ?? shadow;
  const childItems = Children.toArray(children).slice(0, 2);
  const classNames = [
    styles.cardSlot,
    indexClassMap[index],
    sizeClassMap[size],
    hasPadding ? styles.hasPadding : styles.noPadding,
    showShadow ? styles.shadow : styles.noShadow,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...divProps}>
      {index === 'multiple' ? (
        <div className={styles.slotGroup}>
          {[0, 1].map((slotIndex) => (
            <div className={styles.slot} key={slotIndex}>
              {childItems[slotIndex]}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.slot}>{children}</div>
      )}
    </div>
  );
};
