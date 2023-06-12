import { useMemo } from "react";
import { DOTS, usePagination } from "../hooks/usePagination";
import "../styles/pagination.css";

interface IPaginationProps {
  onPageChange: (arg: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
  totalPages: number;
}

const Pagination = ({
  totalPages,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: IPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPages,
  });

  const lastPage = useMemo(() => {
    if (!paginationRange || paginationRange.length === 0) return;
    // eslint-disable-next-line consistent-return
    return paginationRange[paginationRange.length - 1];
  }, [paginationRange]);

  if (!paginationRange || paginationRange.length === 0) return null;

  if (currentPage <= 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className={`pagination-container ${className || ""}`}>
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`pagination-item ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => {
              if (typeof pageNumber === "string") return;
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
