import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Toast.module.css';
import { Icon } from '../Icon/Icon';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'slot'> {
  message?: string;
  layout?: 'singleLine' | 'multiLine';
  slot?: ReactNode;
  className?: string;
}

const layoutClassMap = {
  singleLine: styles.singleLine,
  multiLine: styles.multiLine,
};

/** Toast는 role=status로 메시지를 알리고, Icon과 선택 슬롯을 함께 배치해요. */
export const Toast = ({
  message = '저장되었습니다.',
  layout = 'singleLine',
  slot,
  className = '',
  ...divProps
}: ToastProps) => {
  return (
    <div className={[styles.toast, layoutClassMap[layout], className].filter(Boolean).join(' ')} role="status" {...divProps}>
      <Icon name="check" size={18} />
      <span className={styles.message}>{message}</span>
      {slot ? <span className={styles.slot}>{slot}</span> : null}
    </div>
  );
};
