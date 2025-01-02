import React, { useState } from "react";

export default function TopCounselorTable({ consultations }) {
    const [page, setPage] = useState(1);

    const counselors = consultations.reduce((acc, consultation) => {
        const counselor = consultation.counselor_name;
        if (counselor) {
            acc[counselor] = (acc[counselor] || 0) + 1;
        }
        return acc;
    }, {});

    const counselorList = Object.entries(counselors)
        .map(([counselor_name, total_consultations]) => ({
            counselor_name,
            total_consultations,
        }))
        .sort((a, b) => b.total_consultations - a.total_consultations);

    const itemLength = 5;
    const totalPage = Math.ceil(counselorList.length / itemLength);
    const selectPage = counselorList.slice((page - 1) * itemLength, page * itemLength);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="flex-grow-1 rounded shadow p-4">
            <h3>Top Counselors</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Counselor</th>
                        <th>Total Consultations</th>
                    </tr>
                </thead>
                <tbody>
                    {selectPage.map((data, idx) => (
                        <tr key={idx}>
                            <td>
                                <div>
                                    <p className="m-0">{data.counselor_name}</p>
                                </div>
                            </td>
                            <td>
                                <p>{data.total_consultations}</p>
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
