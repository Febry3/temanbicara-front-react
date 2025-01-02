/* eslint-disable react/prop-types */
import {useState } from "react";
import Status from "./status";


export default function ArticleTable ({ Article }){
   const[page,setPage] = useState(1);
   const itemLength = 5;
   const totalPage = Math.ceil(Article.length/itemLength);
   const selectPage = Article.slice((page-1)*itemLength,page*itemLength);
   const handlePageChange = (page) => {
    setPage(page);
  };
    return (
      <div className="col-6 rounded shadow p-4">
        <h3>Article</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectPage.map((data, idx) => (
              <tr key={idx}>
                <td>
                  <div>
                    <p className="m-0">{data.title}</p>
                    <p className="m-0 text-secondary">{data.user_name}</p> 
                  </div>
                </td>
                <td>
                  <Status />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span className="mx-5">Page {page} of {totalPage}</span>
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
  };