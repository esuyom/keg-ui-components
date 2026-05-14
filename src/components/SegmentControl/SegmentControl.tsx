import type { HTMLAttributes } from 'react';
import styles from './SegmentControl.module.css';

export interface SegmentItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentControlProps extends HTMLAttributes<HTMLDivElement> {
  items?: SegmentItem[];
  value?: string;
  layout?: 'fixed' | 'scroll';
  onValueChange?: (value: string) => void;
  className?: string;
}

const layoutClassMap = {
  fixed: styles.fixed,
  scroll: styles.scroll,
};

/** SegmentControl은 tablist 역할로 옵션을 묶고, value와 onValueChange로 선택 상태를 외부에 전달해요. */
export const SegmentControl = ({
  items = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ],
  value,
  layout = 'fixed',
  onValueChange,
  className = '',
  ...divProps
}: SegmentControlProps) => {
  const currentValue = value ?? items[0]?.value;
  const classNames = [styles.segmentControl, layoutClassMap[layout], className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="tablist" {...divProps}>
      {items.map((item) => {
        const selected = item.value === currentValue;

        return (
          <button
            key={item.value}
            className={[styles.item, selected ? styles.selected : ''].filter(Boolean).join(' ')}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={item.disabled}
            onClick={() => onValueChange?.(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
