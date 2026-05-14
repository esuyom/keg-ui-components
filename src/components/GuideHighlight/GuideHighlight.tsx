import type { HTMLAttributes, ReactNode } from 'react';
import styles from './GuideHighlight.module.css';

export interface GuideHighlightProps extends HTMLAttributes<HTMLDivElement> {
  shape?: 'rectangle' | 'rounded' | 'circle';
  dimLevel?: 'soft' | 'medium' | 'strong';
  highlightLevel?: 'soft' | 'medium' | 'strong';
  hasDim?: boolean;
  highlightContainer?: ReactNode;
  className?: string;
}

const shapeClassMap = {
  rectangle: styles.rectangle,
  rounded: styles.rounded,
  circle: styles.circle,
};

const dimClassMap = {
  soft: styles.dimSoft,
  medium: styles.dimMedium,
  strong: styles.dimStrong,
};

const highlightClassMap = {
  soft: styles.highlightSoft,
  medium: styles.highlightMedium,
  strong: styles.highlightStrong,
};

/** 가이드 하이라이트는 dim 강도와 강조 영역 모양을 props로 받아 튜토리얼용 포커스 영역을 만들어요. */
export const GuideHighlight = ({
  shape = 'rounded',
  dimLevel = 'soft',
  highlightLevel = 'soft',
  hasDim = true,
  highlightContainer,
  className = '',
  ...divProps
}: GuideHighlightProps) => {
  return (
    <div
      className={[
        styles.guideHighlight,
        shapeClassMap[shape],
        hasDim ? dimClassMap[dimLevel] : styles.noDim,
        highlightClassMap[highlightLevel],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...divProps}
    >
      <div className={styles.area}>{highlightContainer}</div>
    </div>
  );
};
