import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  layout?: 'full' | 'noLeading' | 'noTrailing' | 'centerOnly';
  state?: 'default' | 'selected' | 'disabled';
  padding?: boolean;
  leadingSlot?: ReactNode;
  centerContent?: ReactNode;
  trailingSlot?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}

const layoutClassMap = {
  full: styles.full,
  noLeading: styles.noLeading,
  noTrailing: styles.noTrailing,
  centerOnly: styles.centerOnly,
};

const stateClassMap = {
  default: styles.default,
  selected: styles.selected,
  disabled: styles.disabledState,
};

/** ListItem은 leading, center, trailing 슬롯을 layout 값에 따라 열고 닫아 목록 행을 구성해요. */
export const ListItem = ({
  layout = 'full',
  state = 'default',
  padding = true,
  leadingSlot,
  centerContent,
  trailingSlot,
  title = 'List item',
  description,
  className = '',
  disabled,
  type = 'button',
  ...buttonProps
}: ListItemProps) => {
  const isDisabled = disabled ?? state === 'disabled';
  const classNames = [
    styles.listItem,
    layoutClassMap[layout],
    stateClassMap[state],
    padding ? styles.hasPadding : styles.noPadding,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} disabled={isDisabled} {...buttonProps}>
      {layout !== 'noLeading' && layout !== 'centerOnly' ? (
        <span className={styles.leading}>{leadingSlot}</span>
      ) : null}
      <span className={styles.center}>
        {centerContent ?? (
          <>
            <span className={styles.title}>{title}</span>
            {description ? <span className={styles.description}>{description}</span> : null}
          </>
        )}
      </span>
      {layout !== 'noTrailing' && layout !== 'centerOnly' ? (
        <span className={styles.trailing}>{trailingSlot}</span>
      ) : null}
    </button>
  );
};
