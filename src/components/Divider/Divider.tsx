import styles from './Divider.module.css';

export interface DividerProps {
  /** 두께(thickness) variant를 thin/thick으로 매핑했어요. */
  thickness?: 'thin' | 'thick';
  className?: string;
}

const thicknessClassMap = {
  thin: styles.thin,
  thick: styles.thick,
};

/** Divider는 두께와 방향만 받아 시각 구분선과 role=separator 접근성 정보를 함께 제공해요. */
export const Divider = ({
  thickness = 'thin',
  className = '',
}: DividerProps) => {
  const classNames = [
    styles.divider,
    thicknessClassMap[thickness],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames} role="separator" />;
};
