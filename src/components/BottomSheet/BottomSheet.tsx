import type { HTMLAttributes, ReactNode } from 'react';
import styles from './BottomSheet.module.css';
import { CTAButton } from '../CTAButton/CTAButton';
import { Overlay } from '../Overlay/Overlay';

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  hasDescription?: boolean;
  hasCustomContent?: boolean;
  customContents?: ReactNode;
  hasSecondaryAction?: boolean;
  layout?: 'vertical' | 'horizontal';
  hasOverlay?: boolean;
  hasDim?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const layoutClassMap = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
};

/** 바텀시트는 안내 콘텐츠와 CTAButton 액션을 조합하며, dim 여부와 버튼 방향을 props로 제어해요. */
export const BottomSheet = ({
  title = '타이틀',
  description = '디스크립션',
  hasDescription = true,
  hasCustomContent = false,
  customContents,
  hasSecondaryAction = true,
  layout = 'vertical',
  hasOverlay,
  hasDim = true,
  primaryLabel = '확인',
  secondaryLabel = '취소',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
  children,
  ...divProps
}: BottomSheetProps) => {
  // custom 영역은 SelectField, InputField처럼 서로 다른 입력 컴포넌트가 들어올 수 있는 슬롯으로 사용해요.
  const customSlot = customContents ?? children;
  // 기존 hasDim을 유지하면서, 오버레이 유무를 더 명확하게 제어할 수 있도록 hasOverlay를 우선 사용해요.
  const showOverlay = hasOverlay ?? hasDim;

  return (
    <div className={[styles.bottomSheetRoot, className].filter(Boolean).join(' ')} {...divProps}>
      <Overlay open={showOverlay} className={styles.overlay} aria-hidden="true" />
      <section className={styles.sheet} role="dialog" aria-modal={showOverlay}>
        <div className={styles.handle} aria-hidden="true" />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          {hasDescription ? <p className={styles.description}>{description}</p> : null}
          {hasCustomContent && customSlot ? <div className={styles.customContent}>{customSlot}</div> : null}
        </div>
        <div className={[styles.actions, layoutClassMap[layout]].filter(Boolean).join(' ')}>
          {hasSecondaryAction ? <CTAButton variant="secondary" fullWidth onClick={onSecondaryClick}>{secondaryLabel}</CTAButton> : null}
          <CTAButton fullWidth onClick={onPrimaryClick}>{primaryLabel}</CTAButton>
        </div>
      </section>
    </div>
  );
};
