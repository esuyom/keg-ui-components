import type { CSSProperties, ReactNode } from 'react';
import styles from './Asset.module.css';

type AssetSize = 'sm' | 'md' | 'lg';

export interface AssetProps {
  /** 아이콘과 이미지를 같은 크기 규칙으로 보여줘요. */
  variant?: 'icon' | 'image';
  /** circle은 원형, rounded는 둥근 사각형, square는 직각 사각형으로 렌더링해요. */
  shape?: 'circle' | 'rounded' | 'square';
  size?: AssetSize | number;
  /** false면 배경과 패딩 없이 아이콘 자체만 렌더링해요. */
  hasContainer?: boolean;
  /** 조합 컴포넌트에서 직접 크기를 정해야 할 때 사용해요. */
  custom?: boolean;
  /** 컨테이너 크기와 실제 아이콘 크기를 분리해야 할 때 사용해요. */
  iconSize?: number;
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

const sizeValueMap: Record<AssetSize, number> = {
  sm: 24,
  md: 40,
  lg: 52,
};

const iconSizeValueMap: Record<AssetSize, number> = {
  sm: 14,
  md: 28,
  lg: 36,
};

const FadersIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 3v12M9 3v12M14 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.5 7h3M7.5 11h3M12.5 6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Asset은 아이콘과 이미지를 정해진 크기 안에 중앙 정렬하고, 이미지 타입은 영역을 꽉 채워 보여줘요. */
export const Asset = ({
  variant = 'icon',
  shape = 'circle',
  size = 'sm',
  hasContainer = false,
  custom = false,
  iconSize,
  src,
  alt = '',
  children,
  className = '',
}: AssetProps) => {
  const resolvedSize = typeof size === 'number' ? size : sizeValueMap[size];
  const shouldRenderContainer = variant === 'image' ? true : hasContainer;
  const resolvedIconSize =
    iconSize ??
    (!shouldRenderContainer && variant === 'icon' ? resolvedSize : typeof size === 'number' ? resolvedSize : iconSizeValueMap[size]);

  // variant, shape, 컨테이너 여부를 CSS Module class로 조합해서 props 변경만으로 형태를 바꿔요.
  const classNames = [
    styles.asset,
    styles[`variant-${variant}`],
    styles[`shape-${shape}`],
    typeof size === 'string' ? styles[`size-${size}`] : '',
    !shouldRenderContainer ? styles.noContainer : '',
    custom ? styles.custom : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    '--asset-size': `${resolvedSize}px`,
    '--asset-icon-size': `${resolvedIconSize}px`,
  } as CSSProperties;

  return (
    <span className={classNames} style={style}>
      {variant === 'image' ? (
        <span className={styles.imageAtom}>
          {src ? <img className={styles.image} src={src} alt={alt} /> : children}
        </span>
      ) : (
        <span className={styles.iconAtom} aria-hidden="true">
          {children ?? <FadersIcon />}
        </span>
      )}
    </span>
  );
};
