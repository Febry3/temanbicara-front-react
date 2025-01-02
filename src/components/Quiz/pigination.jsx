/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Pagination({ Quiz }) {
  const [page, setPage] = useState(1);
  const itemLength = 5;
  const totalPage = Math.ceil(Quiz.length / itemLength);
  const selectPage = Quiz.slice((page - 1) * itemLength, page * itemLength);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className="flex-grow-1 rounded shadow p-4">
      <div className="pagination d-flex justify-content-center align-items-center">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span className="mx-5">
          Page {page} of {totalPage}
        </span>
        <button
          className="btn btn-primary"
          disabled={page === totalPage}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
