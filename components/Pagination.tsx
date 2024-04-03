"use client";
import { v4 as uuidv4 } from "uuid";

import { DOTS, usePagination } from "@/hooks/usePagination";

export type PaginationProps = {
  totalCount: number | undefined;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: any;
};
export default function Pagination(props: PaginationProps) {
  const {
    pageSize,
    totalCount = 1000,
    currentPage,
    onPageChange,
    siblingCount = 1,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="flex flex-row gap-4 justify-center">
      <li>
        <button
          className="cursor-pointer"
          type="button"
          onClick={() => {
            onPrevious();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
      </li>
      {paginationRange &&
        paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={uuidv4()} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={uuidv4()}
              className={`cursor-pointer ${
                currentPage === pageNumber ? "text-red-500" : "text-white "
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

      <li>
        <button className="cursor-pointer" type="button" onClick={onNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
}
