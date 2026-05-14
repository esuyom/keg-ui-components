import type { HTMLAttributes, ReactNode } from 'react';
import styles from './BottomCTA.module.css';
import { CTAButton } from '../CTAButton/CTAButton';

export interface BottomCTAProps extends HTMLAttributes<HTMLDivElement> {
  layout?: 'horizontal' | 'vertical';
  hasSecondaryAction?: boolean;
  /** 실제 개발에서는 Home Indicator를 직접 렌더링하지 않고 safe-area padding으로 하단 여백을 확보해요. */
  hasHomeIndicator?: boolean;
  hasTopFade?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  supportingText?: ReactNode;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const layoutClassMap = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};

/** 하단 액션 영역은 CTAButton을 재사용하고, 홈 인디케이터 영역은 CSS safe-area padding으로 처리해요. */
export const BottomCTA = ({
  layout = 'horizontal',
  hasSecondaryAction = true,
  hasTopFade = true,
  primaryLabel = '다음',
  secondaryLabel = '이전',
  supportingText,
  onPrimaryClick,
  onSecondaryClick,
  className = '',
  ...divProps
}: BottomCTAProps) => {
  return (
    <div
      className={[styles.bottomCTA, layoutClassMap[layout], hasTopFade ? styles.topFade : '', className]
        .filter(Boolean)
        .join(' ')}
      {...divProps}
    >
      {supportingText ? <div className={styles.supportingText}>{supportingText}</div> : null}
      <div className={styles.actions}>
        {hasSecondaryAction ? (
          <CTAButton variant="secondary" fullWidth onClick={onSecondaryClick}>
            {secondaryLabel}
          </CTAButton>
        ) : null}
        <CTAButton fullWidth onClick={onPrimaryClick}>{primaryLabel}</CTAButton>
      </div>
    </div>
  );
};
