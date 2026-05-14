import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Modal.module.css';
import { CTAButton } from '../CTAButton/CTAButton';
import { Overlay } from '../Overlay/Overlay';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  hasDescription?: boolean;
  hasCustomContent?: boolean;
  customContainer?: ReactNode;
  hasOverlay?: boolean;
  hasDim?: boolean;
  actionLayout?: 'single' | 'double';
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const actionLayoutClassMap = {
  single: styles.singleAction,
  double: styles.doubleAction,
};

/** Modal은 dialog 역할의 패널 안에서 제목, 설명, 커스텀 콘텐츠와 CTAButton 액션을 조합해요. */
export const Modal = ({
  title = '알림',
  description = '내용을 확인해주세요.',
  hasDescription = true,
  hasCustomContent = false,
  customContainer,
  hasOverlay,
  hasDim = true,
  actionLayout = 'double',
  primaryLabel = '확인',
  secondaryLabel = '취소',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
  ...divProps
}: ModalProps) => {
  // 기존 hasDim을 유지하면서, 오버레이 유무를 더 명확하게 제어할 수 있도록 hasOverlay를 우선 사용해요.
  const showOverlay = hasOverlay ?? hasDim;

  return (
    <div className={[styles.modalRoot, className].filter(Boolean).join(' ')} {...divProps}>
      <Overlay open={showOverlay} className={styles.overlay} aria-hidden="true" />
      <section className={styles.panel} role="dialog" aria-modal={showOverlay} aria-labelledby="keg-modal-title">
        <div className={styles.content}>
          <h2 id="keg-modal-title" className={styles.title}>{title}</h2>
          {hasDescription ? <p className={styles.description}>{description}</p> : null}
          {hasCustomContent ? <div className={styles.customContent}>{customContainer}</div> : null}
        </div>
        <div className={[styles.actions, actionLayoutClassMap[actionLayout]].filter(Boolean).join(' ')}>
          {actionLayout === 'double' ? <CTAButton variant="secondary" fullWidth onClick={onSecondaryClick}>{secondaryLabel}</CTAButton> : null}
          <CTAButton fullWidth onClick={onPrimaryClick}>{primaryLabel}</CTAButton>
        </div>
      </section>
    </div>
  );
};
