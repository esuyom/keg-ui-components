import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Figma의 켜짐(isOn) variant입니다. uncontrolled 초기 상태로도 사용할 수 있어요. */
  isOn?: boolean;
  defaultOn?: boolean;
  onChange?: (isOn: boolean) => void;
  className?: string;
}

/** Toggle은 controlled/uncontrolled를 모두 지원하고, role=switch와 aria-checked로 상태를 전달해요. */
export const Toggle = ({
  isOn,
  defaultOn = false,
  onChange,
  disabled = false,
  className = '',
  type = 'button',
  ...buttonProps
}: ToggleProps) => {
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isControlled = isOn !== undefined;
  const currentOn = isOn ?? internalOn;

  const handleClick = () => {
    if (disabled) return;

    const nextOn = !currentOn;
    if (!isControlled) setInternalOn(nextOn);
    onChange?.(nextOn);
  };

  return (
    <button
      type={type}
      className={[styles.toggle, currentOn ? styles.on : styles.off, className].filter(Boolean).join(' ')}
      role="switch"
      aria-checked={currentOn}
      disabled={disabled}
      onClick={handleClick}
      {...buttonProps}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
};
