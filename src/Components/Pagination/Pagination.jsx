import React from "react";
import './Pagination.css';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  return (
    <div className="pagination-container">
      <div>
        {start}-{end} of {totalItems} results
      </div>
      <div className="pagination-controls">
        <span>
          {currentPage} of {totalPages} pages
        </span>
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
