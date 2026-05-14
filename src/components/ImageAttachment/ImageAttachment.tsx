import type { HTMLAttributes, ReactNode } from 'react';
import styles from './ImageAttachment.module.css';
import { Icon } from '../Icon/Icon';

export interface ImageAttachmentProps extends HTMLAttributes<HTMLDivElement> {
  state?: 'empty' | 'attached' | 'disabled';
  src?: string;
  alt?: string;
  imageContainer?: ReactNode;
  isRemovable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const stateClassMap = {
  empty: styles.empty,
  attached: styles.attached,
  disabled: styles.disabled,
};

/** 이미지 첨부 슬롯은 empty/attached/disabled 상태에 따라 아이콘, 이미지, 제거 버튼을 바꿔 보여줘요. */
export const ImageAttachment = ({
  state = 'empty',
  src,
  alt = '',
  imageContainer,
  isRemovable = false,
  onRemove,
  className = '',
  ...divProps
}: ImageAttachmentProps) => {
  const classNames = [styles.imageAttachment, stateClassMap[state], className].filter(Boolean).join(' ');
  const hasImage = state === 'attached' && (src || imageContainer);

  return (
    <div className={classNames} {...divProps}>
      {hasImage ? (
        imageContainer ?? <img className={styles.image} src={src} alt={alt} />
      ) : (
        <span className={styles.placeholder}>
          <Icon name="image" size={20} />
        </span>
      )}
      {isRemovable && state === 'attached' ? (
        <button className={styles.removeButton} type="button" onClick={onRemove} aria-label="이미지 제거">
          <Icon name="close" size={14} />
        </button>
      ) : null}
    </div>
  );
};
