import type { HTMLAttributes, ReactNode } from 'react';
import styles from './EmptyState.module.css';
import { Asset } from '../Asset/Asset';
import { CTAButton } from '../CTAButton/CTAButton';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  layout?: 'compact' | 'fullscreen';
  hasAsset?: boolean;
  hasCTA?: boolean;
  title?: string;
  description?: string;
  assetContainer?: ReactNode;
  cta?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const layoutClassMap = {
  compact: styles.compact,
  fullscreen: styles.fullscreen,
};

/** EmptyState는 빈 상태 안내를 layout, asset 표시 여부, CTA 표시 여부로 조합해 보여줘요. */
export const EmptyState = ({
  layout = 'fullscreen',
  hasAsset = true,
  hasCTA,
  title = '현재 수강중인 강의가 없어요.',
  description = '맞춤 강의를 확인해보세요!',
  assetContainer,
  cta,
  actionLabel = '버튼',
  onAction,
  className = '',
  ...divProps
}: EmptyStateProps) => {
  const shouldShowCTA = hasCTA ?? Boolean(cta);

  return (
    <div className={[styles.emptyState, layoutClassMap[layout], className].filter(Boolean).join(' ')} {...divProps}>
      {hasAsset ? (
        <div className={styles.assetContainer}>
          {assetContainer ?? (
            <Asset variant="icon" size={'lg'}  custom />
          )}
        </div>
      ) : null}
      <div className={styles.textGroup}>
        <strong className={styles.title}>{title}</strong>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {shouldShowCTA ? cta ?? (
        <CTAButton size="sm" onClick={onAction}>{actionLabel}</CTAButton>
      ) : null}
    </div>
  );
};
