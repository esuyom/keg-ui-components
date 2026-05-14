import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Chip.module.css';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  size?: 'sm' | 'md';
  state?: 'default' | 'selected';
  disabled?: boolean;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  sm: styles['size-sm'],
  md: styles['size-md'],
};

const stateClassMap = {
  default: styles.default,
  selected: styles.selected,
};

/** Chip은 size, state, disabled 조합을 className으로 나누고 선택 여부를 aria-pressed로 알려줘요. */
export const Chip = ({
  label = 'Chip',
  size = 'sm',
  state = 'default',
  disabled = false,
  hasLeadingIcon = false,
  hasTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  type = 'button',
  ...buttonProps
}: ChipProps) => {
  const classNames = [
    styles.chip,
    sizeClassMap[size],
    stateClassMap[state],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      aria-pressed={state === 'selected'}
      {...buttonProps}
    >
      {hasLeadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      <span className={styles.label}>{children ?? label}</span>
      {hasTrailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
    </button>
  );
};
