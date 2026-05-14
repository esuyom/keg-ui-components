import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  label?: string;
  /** Figma의 크기(size) variant를 그대로 sm/md로 매핑했어요. */
  size?: 'md' | 'sm';
  /** 상태나 분류를 표현하는 색상 variant입니다. */
  color?: 'primary' | 'green' | 'yellow' | 'red' | 'gray';
  /** solid는 강한 강조, soft는 보조 강조에 사용해요. */
  emphasis?: 'solid' | 'soft';
  children?: ReactNode;
  className?: string;
}

const sizeClassMap = {
  md: styles['size-md'],
  sm: styles['size-sm'],
};

const colorClassMap = {
  primary: styles['color-primary'],
  green: styles['color-green'],
  yellow: styles['color-yellow'],
  red: styles['color-red'],
  gray: styles['color-gray'],
};

const emphasisClassMap = {
  solid: styles['emphasis-solid'],
  soft: styles['emphasis-soft'],
};

/** size, color, emphasis 조합만으로 상태 배지를 만들고 내부 텍스트는 children이 있으면 우선 사용해요. */
export const Badge = ({
  label = 'Badge',
  size = 'md',
  color = 'primary',
  emphasis = 'soft',
  children,
  className = '',
}: BadgeProps) => {
  // variant class는 map으로 조합해서 Figma variant 추가 시 확장 위치가 명확하도록 했어요.
  const classNames = [
    styles.badge,
    sizeClassMap[size],
    colorClassMap[color],
    emphasisClassMap[emphasis],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children ?? label}</span>;
};
