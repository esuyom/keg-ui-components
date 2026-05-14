import type { HTMLAttributes, ReactNode } from 'react';
import styles from './GuidePopup.module.css';
import { CTAButton } from '../CTAButton/CTAButton';

export interface GuidePopupProps extends HTMLAttributes<HTMLDivElement> {
  hasDim?: boolean;
  hasMedia?: boolean;
  media?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/** GuidePopup은 안내 미디어, 문구, CTAButton을 묶어 가이드 확인 액션까지 한 번에 처리해요. */
export const GuidePopup = ({
  hasDim = true,
  hasMedia = true,
  media,
  title = '사용 가이드',
  description = '새 기능을 더 쉽게 사용할 수 있도록 안내해요.',
  actionLabel = '확인',
  onAction,
  className = '',
  ...divProps
}: GuidePopupProps) => {
  return (
    <div className={[styles.guidePopupRoot, hasDim ? styles.dimmed : '', className].filter(Boolean).join(' ')} {...divProps}>
      <section className={styles.popup}>
        {hasMedia ? <div className={styles.media}>{media}</div> : null}
        <div className={styles.copy}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <CTAButton fullWidth onClick={onAction}>{actionLabel}</CTAButton>
      </section>
    </div>
  );
};
