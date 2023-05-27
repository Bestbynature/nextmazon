import { PaginationBarProps } from '@/lib/types/types';
import Link from 'next/link';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const PaginationBar = ({ currentPage, totalPage }: PaginationBarProps) => {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10));

  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];
  for (let i = minPage; i <= maxPage; i++) {
    numberedPageItems.push(
      <Link
        href={`?page=${i}`}
        key={i}
        className={`join-item btn ${i === currentPage ? 'btn-active pointer-events-none' : ''}`}
      >
        {i}
      </Link>
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>

      <div className="join flex sm:hidden">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            <KeyboardDoubleArrowLeftIcon />
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          page {currentPage} of {totalPage}
        </button>
        {currentPage < totalPage && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            <KeyboardDoubleArrowRightIcon />
          </Link>
        )}
      </div>
    </>
  );
};

export default PaginationBar;
