import type { HTMLAttributes } from 'react';
import styles from './Keyboard.module.css';

export interface KeyboardProps extends HTMLAttributes<HTMLDivElement> {
  keys?: string[];
  className?: string;
}

/** Keyboard는 전달받은 키 배열을 버튼 격자로 렌더링해서 모바일 키보드 예시를 표현해요. */
export const Keyboard = ({
  keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  className = '',
  ...divProps
}: KeyboardProps) => {
  return (
    <div className={[styles.keyboard, className].filter(Boolean).join(' ')} {...divProps}>
      {keys.map((key) => (
        <button key={key} className={styles.key} type="button">
          {key}
        </button>
      ))}
    </div>
  );
};
