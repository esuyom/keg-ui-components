import type { InputHTMLAttributes } from 'react';
import styles from './SearchField.module.css';
import { Icon } from '../Icon/Icon';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  state?: 'default' | 'focus' | 'filled';
  searchButton?: boolean;
  className?: string;
}

const stateClassMap = {
  default: styles.default,
  focus: styles.focus,
  filled: styles.filled,
};

/** SearchField는 입력값 유무로 filled 상태를 계산하고, 검색 액션 버튼은 옵션으로 노출해요. */
export const SearchField = ({
  state = 'default',
  searchButton = true,
  className = '',
  value,
  placeholder = '검색어를 입력하세요',
  disabled = false,
  ...inputProps
}: SearchFieldProps) => {
  const hasValue = value !== undefined && String(value).length > 0;
  const resolvedState = hasValue ? 'filled' : state;
  const valueProps = value === undefined ? {} : { value };
  const classNames = [
    styles.searchField,
    stateClassMap[resolvedState],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classNames}>
      <Icon name="search" size={18} />
      <input
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        {...valueProps}
        {...inputProps}
      />
      {searchButton ? (
        <button className={styles.action} type="button" disabled={disabled} aria-label="검색">
          <Icon name="chevronRight" size={16} />
        </button>
      ) : null}
    </label>
  );
};
