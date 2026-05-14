import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  hasLabel?: boolean;
  state?: 'default' | 'selected';
  disabled?: boolean;
  className?: string;
}

/** RadioButton은 실제 radio input을 유지하고, state는 uncontrolled 초기 선택값으로만 사용해요. */
export const RadioButton = ({
  label = 'Radio',
  hasLabel = true,
  state = 'default',
  checked,
  disabled = false,
  className = '',
  onChange,
  ...inputProps
}: RadioButtonProps) => {
  const initialState = state === 'selected';
  const classNames = [styles.radioButton, className].filter(Boolean).join(' ');
  const controlledProps =
    checked === undefined
      ? { defaultChecked: inputProps.defaultChecked ?? initialState }
      : { checked };

  return (
    <label className={classNames}>
      <input
        className={styles.input}
        type="radio"
        disabled={disabled}
        readOnly={checked !== undefined && onChange === undefined}
        onChange={onChange}
        {...controlledProps}
        {...inputProps}
      />
      <span className={styles.control} aria-hidden="true" />
      {hasLabel ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
};
