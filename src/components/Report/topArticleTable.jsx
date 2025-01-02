/* eslint-disable react/prop-types */
import { useState } from "react";
import Status from "../dashboard/status";


export default function TopArticleTable({ Article }) {
    const [page, setPage] = useState(1);

    const authors = Article.reduce((acc, article) => {
        const author = article.user_name;
        acc[author] = (acc[author] || 0) + 1;
        return acc;
    }, {});

    const authorList = Object.entries(authors)
        .map(([user_name, total_articles]) => ({ user_name, total_articles }))
        .sort((a, b) => b.total_articles - a.total_articles);

    const itemLength = 5;
    const totalPage = Math.ceil(authorList.length / itemLength);
    const selectPage = authorList.slice((page - 1) * itemLength, page * itemLength);
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="flex-grow-1 rounded shadow p-4">
            <h3>Top Authors</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Total Articles</th>
                    </tr>
                </thead>
                <tbody>
                    {selectPage.map((data, idx) => (
                        <tr key={idx}>
                            <td>
                                <div>
                                    <p className="m-0">{data.user_name}</p>
                                </div>
                            </td>
                            <td>
                                <p>{data.total_articles}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-secondary"
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
}
