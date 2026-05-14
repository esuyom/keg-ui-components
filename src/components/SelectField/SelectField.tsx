import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './SelectField.module.css';
import { Icon } from '../Icon/Icon';

export interface SelectFieldProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  helperText?: string;
  children?: ReactNode;
  className?: string;
}

/** SelectField는 트리거와 드롭다운 슬롯을 함께 관리하고, 열림 상태를 aria-expanded로 표시해요. */
export const SelectField = ({
  label,
  value,
  placeholder = '선택하세요',
  isOpen = false,
  helperText,
  children,
  className = '',
  disabled = false,
  type = 'button',
  ...buttonProps
}: SelectFieldProps) => {
  const hasValue = Boolean(value);
  const classNames = [
    styles.selectField,
    isOpen ? styles.open : '',
    hasValue ? styles.filled : styles.placeholder,
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <button
        type={type}
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...buttonProps}
      >
        <span className={styles.value}>{value ?? placeholder}</span>
        <Icon name="chevronDown" size={18} />
      </button>
      {isOpen && children ? <div className={styles.menu}>{children}</div> : null}
      {helperText ? <span className={styles.helper}>{helperText}</span> : null}
    </div>
  );
};
