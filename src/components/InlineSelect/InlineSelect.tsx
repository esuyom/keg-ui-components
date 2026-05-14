import type { ButtonHTMLAttributes } from 'react';
import styles from './InlineSelect.module.css';
import { Icon } from '../Icon/Icon';

export interface InlineSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  value?: string;
  isOpen?: boolean;
  state?: 'placeholder' | 'default' | 'disabled';
  className?: string;
}

const stateClassMap = {
  placeholder: styles.placeholder,
  default: styles.default,
  disabled: styles.disabledState,
};

/** InlineSelect는 작은 문장 안에서 쓰는 선택 버튼이며, 열림 상태를 aria-expanded로 전달해요. */
export const InlineSelect = ({
  label,
  value = '선택',
  isOpen = false,
  state = 'default',
  className = '',
  disabled,
  type = 'button',
  ...buttonProps
}: InlineSelectProps) => {
  const isDisabled = disabled ?? state === 'disabled';
  const classNames = [
    styles.inlineSelect,
    stateClassMap[state],
    isOpen ? styles.open : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...buttonProps}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.value}>{value}</span>
      <Icon name="chevronDown" size={16} />
    </button>
  );
};
