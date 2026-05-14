import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import styles from './InputField.module.css';

type InputFieldState = 'default' | 'focused' | 'filled' | 'error' | 'disabled' | 'readonly';
type InputFieldSize = 'md' | 'lg';
type HintColor = 'gray' | 'navy' | 'red';

export interface FieldLabelProps {
  label?: string;
  supportingText?: string;
  hasLabel?: boolean;
  isRequired?: boolean;
}

export interface HintTextProps {
  children?: ReactNode;
  color?: HintColor;
  id?: string;
}

export interface ErrorTextProps {
  children?: ReactNode;
  id?: string;
}

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Figma layout variant를 single, split, custom으로 매핑해요. */
  layout?: 'single' | 'split' | 'custom';
  /** 시각 상태는 error가 가장 우선이고, disabled/readOnly는 실제 input 속성과 함께 처리해요. */
  state?: InputFieldState;
  size?: InputFieldSize;
  label?: string;
  supportingText?: string;
  hasLabel?: boolean;
  isRequired?: boolean;
  helperText?: string;
  hintText?: string;
  hintColor?: HintColor;
  errorText?: string;
  prefixSlot?: ReactNode;
  inputSlot?: ReactNode;
  suffixText?: string;
  trailingSlot?: ReactNode;
  className?: string;
}

const layoutClassMap = {
  single: styles.single,
  split: styles.split,
  custom: styles.custom,
};

const sizeClassMap = {
  md: styles.md,
  lg: styles.lg,
};

const stateClassMap: Record<InputFieldState, string> = {
  default: styles.default,
  focused: styles.focused,
  filled: styles.filled,
  error: styles.error,
  disabled: styles.disabled,
  readonly: styles.readonly,
};

const hintColorClassMap: Record<HintColor, string> = {
  gray: styles.hintGray,
  navy: styles.hintNavy,
  red: styles.hintRed,
};

export const FieldLabel = ({
  label,
  supportingText,
  hasLabel = Boolean(label),
  isRequired = false,
}: FieldLabelProps) => {
  if (!hasLabel || !label) return null;

  return (
    <span className={styles.fieldLabel}>
      <span className={styles.labelText}>
        {label}
        {isRequired ? <span className={styles.requiredMark} aria-hidden="true">*</span> : null}
      </span>
      {supportingText ? <span className={styles.supportingText}>{supportingText}</span> : null}
    </span>
  );
};

export const HintText = ({ children, color = 'gray', id }: HintTextProps) => {
  if (!children) return null;

  return (
    <span id={id} className={[styles.message, hintColorClassMap[color]].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

export const ErrorText = ({ children, id }: ErrorTextProps) => {
  if (!children) return null;

  return (
    <span id={id} className={[styles.message, styles.errorMessage].join(' ')} role="alert">
      {children}
    </span>
  );
};

/** InputField는 라벨, 입력 컨테이너, 힌트/에러 텍스트를 분리해서 상태 우선순위에 맞게 조합해요. */
export const InputField = ({
  layout = 'single',
  state,
  size = 'lg',
  label,
  supportingText,
  hasLabel,
  isRequired = false,
  helperText,
  hintText,
  hintColor = 'gray',
  errorText,
  prefixSlot,
  inputSlot,
  suffixText,
  trailingSlot,
  className = '',
  disabled = false,
  readOnly = false,
  value,
  defaultValue,
  id,
  ...inputProps
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasValue = value !== undefined
    ? String(value).length > 0
    : defaultValue !== undefined && String(defaultValue).length > 0;
  const visualState: InputFieldState = disabled
    ? 'disabled'
    : readOnly
      ? 'readonly'
      : errorText
        ? 'error'
        : state ?? (hasValue ? 'filled' : 'default');
  const messageText = visualState === 'error' ? errorText : hintText ?? helperText;
  const describedBy = messageText ? messageId : inputProps['aria-describedby'];

  const classNames = [
    styles.inputField,
    layoutClassMap[layout],
    sizeClassMap[size],
    stateClassMap[visualState],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classNames} htmlFor={inputSlot ? undefined : inputId}>
      <span className={styles.container}>
        <FieldLabel
          label={label}
          supportingText={supportingText}
          hasLabel={hasLabel ?? Boolean(label)}
          isRequired={isRequired}
        />
        <span className={styles.control}>
          {prefixSlot ? <span className={styles.prefixSlot}>{prefixSlot}</span> : null}
          {inputSlot ?? (
            <input
              id={inputId}
              className={styles.input}
              disabled={disabled}
              readOnly={readOnly}
              required={isRequired}
              value={value}
              defaultValue={defaultValue}
              aria-invalid={visualState === 'error' ? true : undefined}
              aria-describedby={describedBy}
              {...inputProps}
            />
          )}
          {suffixText ? <span className={styles.suffixText}>{suffixText}</span> : null}
          {trailingSlot ? <span className={styles.trailingSlot}>{trailingSlot}</span> : null}
        </span>
      </span>
      {visualState === 'error' ? (
        <ErrorText id={messageId}>{errorText}</ErrorText>
      ) : (
        <HintText id={messageId} color={hintColor}>{messageText}</HintText>
      )}
    </label>
  );
};
