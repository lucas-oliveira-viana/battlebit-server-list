import React from 'react';
import { TPagination } from '../utils/types';

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

  function getButtonsClass(page: number | null) {
    return `border ${
      pagination.currentPage === page ? 'bg-white text-black' : 'text-white'
    } border-white hover:bg-white hover:text-black rounded-md py-2 px-3 mr-3 mb-3`;
  }

  return (
    <>
      {pages.length && (
        <div>
          <button className={getButtonsClass(null)} onClick={() => setCurrentPage(0)}>
            First
          </button>
          {pages.map((page) => (
            <button
              className={getButtonsClass(page)}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={getButtonsClass(null)}
            onClick={() => setCurrentPage(pagination.totalPages - 1)}
          >
            Last
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
