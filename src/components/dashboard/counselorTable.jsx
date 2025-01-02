/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

export default function CounselorTable({ groupedExpertise }) {
  const [page, setPage] = useState(1);
  const itemLength = 5;
  const arrExpertise = Object.values(groupedExpertise);
  const totalPage = Math.ceil(arrExpertise.length / itemLength);
  const selectPage = arrExpertise.slice(
    (page - 1) * itemLength,
    page * itemLength
  );
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className=" col-6 rounded shadow p-4">
      <h3>Counselor</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expertise</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(selectPage).map(([key, { user, skills }], index) => (
            <tr key={index}>
              <td className="col-6">
                <div>
                  <p className="m-0">{user.name}</p>
                  <p className="m-0 text-secondary">{user.email}</p>
                </div>
              </td>
              <td>
                <p>{skills.join(", ")}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination d-flex justify-content-center align-items-center">
        {groupedExpertise.length === 0 ? (
          <div>No Counselor available.</div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
}
