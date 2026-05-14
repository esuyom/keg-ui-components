import type { HTMLAttributes } from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  pageCount?: number;
  currentPage?: number;
  scrollHint?: 'none' | 'start' | 'end' | 'both';
  onPageChange?: (page: number) => void;
  className?: string;
}

const scrollHintClassMap = {
  none: '',
  start: styles.hintStart,
  end: styles.hintEnd,
  both: styles.hintBoth,
};

/** Pagination은 pageCount로 버튼을 만들고 currentPage에 aria-current를 붙여 현재 위치를 알려줘요. */
export const Pagination = ({
  pageCount = 5,
  currentPage = 1,
  scrollHint = 'none',
  onPageChange,
  className = '',
  ...divProps
}: PaginationProps) => {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className={[styles.pagination, scrollHintClassMap[scrollHint], className].filter(Boolean).join(' ')} {...divProps}>
      {pages.map((page) => (
        <button
          key={page}
          className={[styles.page, page === currentPage ? styles.current : ''].filter(Boolean).join(' ')}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
