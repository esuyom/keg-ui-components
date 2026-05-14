import type { HTMLAttributes } from 'react';
import styles from './AgreementItem.module.css';
import { Check } from '../Check/Check';
import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';

export interface AgreementItemProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  isRequired?: boolean;
  hasDetail?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onDetailClick?: () => void;
  className?: string;
}

/** 약관 행은 Check로 동의 상태를 받고, 상세 보기는 Icon 버튼으로 분리해서 각각의 클릭 책임을 나눠요. */
export const AgreementItem = ({
  label = '이용약관 동의',
  isRequired = true,
  hasDetail = true,
  checked,
  defaultChecked,
  onCheckedChange,
  onDetailClick,
  className = '',
  ...divProps
}: AgreementItemProps) => {
  const checkStateProps =
    checked === undefined
      ? { defaultChecked }
      : { checked };

  return (
    <div className={[styles.agreementItem, className].filter(Boolean).join(' ')} {...divProps}>
      <Check
        shape="line"
        {...checkStateProps}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
      <span className={styles.label}>
        {!isRequired ? <Badge size="sm" color="gray">선택</Badge> : <Badge size="sm" emphasis="solid">필수</Badge>}
        {label}
      </span>
      {hasDetail ? (
        <button className={styles.detailButton} type="button" onClick={onDetailClick} aria-label={`${label} 상세 보기`}>
          <Icon name="chevronRight" size={18} />
        </button>
      ) : null}
    </div>
  );
};
