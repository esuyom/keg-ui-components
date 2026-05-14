import type { InputHTMLAttributes } from 'react';
import styles from './Check.module.css';

export interface CheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Figma의 형태(shape) variant입니다. line은 체크 표시만, circle은 원형 배경 안에 표시해요. */
  shape?: 'line' | 'circle';
  /** Figma의 크기(size) variant입니다. */
  size?: 'md' | 'sm';
  /** Figma의 상태(state) variant를 uncontrolled 초기값으로도 사용해요. */
  state?: 'unchecked' | 'checked';
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  color?: 'default' | 'primary' | 'gray';
  className?: string;
}

const shapeClassMap = {
  line: styles['shape-line'],
  circle: styles['shape-circle'],
};

const sizeClassMap = {
  md: styles['size-md'],
  sm: styles['size-sm'],
};

const colorClassMap = {
  default: styles['color-default'],
  primary: styles['color-primary'],
  gray: styles['color-gray'],
};

/** 실제 checkbox input을 숨기고 시각 컨트롤만 꾸며서 키보드와 폼 접근성을 유지해요. */
export const Check = ({
  shape = 'line',
  size = 'md',
  state = 'unchecked',
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  color = 'default',
  className = '',
  'aria-label': ariaLabel,
  onChange,
  ...inputProps
}: CheckProps) => {
  const classNames = [
    styles.check,
    shapeClassMap[shape],
    sizeClassMap[size],
    colorClassMap[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const controlledProps =
    checked === undefined
      ? { defaultChecked: defaultChecked ?? state === 'checked' }
      : { checked };

  return (
    <label className={classNames}>
      <input
        className={styles.input}
        type="checkbox"
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        {...controlledProps}
        {...inputProps}
      />
      <span className={styles.control} aria-hidden="true">
        <svg className={styles.icon} viewBox="0 0 18 13" fill="none">
          <path
            d="M1.5 6.5L6.5 11.5L16.5 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
};
