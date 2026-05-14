import type { CSSProperties, ReactNode } from 'react';
import styles from './Icon.module.css';

const sirenIcon = new URL('../../assets/images/accordion-siren.svg?no-inline', import.meta.url).href;

export type IconName =
  | 'placeholder'
  | 'arrowLeft'
  | 'bell'
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'close'
  | 'home'
  | 'image'
  | 'menu'
  | 'minus'
  | 'more'
  | 'plus'
  | 'search'
  | 'siren';

export interface IconProps {
  /** 실제 사용 중인 아이콘 이름만 camelCase로 정리해서 받아요. */
  name?: IconName;
  size?: number;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const pathMap: Record<Exclude<IconName, 'siren'>, ReactNode> = {
  placeholder: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M8 14l2.5-3 2.5 3 2-2.25L20 17" />
    </>
  ),
  arrowLeft: <path d="M15 18l-6-6 6-6" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v11h14V10" />
    </>
  ),
  image: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M8 13l2.5-3 3 4 2-2.5L20 17" />
      <path d="M8 8h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  minus: <path d="M5 12h14" />,
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
      <path d="M21 21l-4.35-4.35" />
    </>
  ),
};

/** Icon은 title이 있을 때만 이미지 역할로 노출하고, 없으면 장식 아이콘으로 숨겨요. */
export const Icon = ({ name = 'placeholder', size = 20, title, children, className = '' }: IconProps) => {
  const style = { '--icon-size': `${size}px` } as CSSProperties;

  if (name === 'siren' && !children) {
    return (
      <span
        className={[styles.icon, styles.maskIcon, className].filter(Boolean).join(' ')}
        style={{ ...style, '--icon-url': `url("${sirenIcon}")` } as CSSProperties}
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      />
    );
  }

  return (
    <svg
      className={[styles.icon, className].filter(Boolean).join(' ')}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {/* 별도 아이콘 자산이 필요하면 children으로 직접 넣거나 name map만 확장하면 돼요. */}
      {children ?? (name === 'siren' ? null : pathMap[name])}
    </svg>
  );
};
