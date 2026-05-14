import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './CTAButton.module.css';

export interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** variant는 CTAButton의 행동 성격을 색상과 텍스트 굵기로 구분해요. */
  variant?: 'primary' | 'secondary' | 'danger' | 'text' | 'custom';
  size?: 'sm' | 'lg';
  /** fullWidth가 true면 부모 너비를 채우고, false면 Figma의 inline 최소 너비를 유지해요. */
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const variantClassMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  text: styles.text,
  custom: styles.custom,
};

const sizeClassMap = {
  sm: styles['size-sm'],
  lg: styles['size-lg'],
};

/** CTAButton은 variant와 fullWidth를 기본 축으로 삼고, loading 중에는 중복 클릭을 막아요. */
export const CTAButton = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  loading = false,
  pressed = false,
  leadingIcon,
  trailingIcon,
  children = '버튼',
  className = '',
  type = 'button',
  ...buttonProps
}: CTAButtonProps) => {
  const isDisabled = disabled || loading;
  const classNames = [
    styles.button,
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? styles.fullWidth : styles.fitWidth,
    pressed ? styles.pressed : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-pressed={pressed || undefined}
      {...buttonProps}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      {!loading && leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {!loading && trailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
    </button>
  );
};
