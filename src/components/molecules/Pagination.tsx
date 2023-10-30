import React from 'react';
import { TPagination } from '../../common/types';
import Button from '../atoms/Button';

type Props = {
  pagination: TPagination<any>;
  setCurrentPage: (page: number) => void;
};

function Pagination({ pagination, setCurrentPage }: Props) {
  function getAdjacentPages(currentPage: number, totalPages: number) {
    const PAGE_THREE = 2;
    const VIEW_PAGES = 5;

    const arrayOfPages = Array.from(Array(pagination.paginatedData.length).keys());

    if (currentPage <= PAGE_THREE) {
      return arrayOfPages.slice(0, VIEW_PAGES);
    }

    if (currentPage + 2 >= totalPages) {
      return arrayOfPages.slice(-VIEW_PAGES);
    }

    const adjacentPages = [];

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      adjacentPages.push(i);
    }

    return adjacentPages;
  }

  const pages = getAdjacentPages(pagination.currentPage, pagination.totalPages);

  return (
    <>
      {pages.length && (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => setCurrentPage(0)}
            disabled={pagination.currentPage === 0}
          >
            First
          </Button>
          {pages.map((page) => (
            <Button
              className={pagination.currentPage === page ? '!bg-zinc-700' : ''}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            disabled={pagination.currentPage === pagination.totalPages - 1}
            onClick={() => setCurrentPage(pagination.totalPages - 1)}
          >
            Last
          </Button>
        </div>
      )}
    </>
  );
}

export default Pagination;
