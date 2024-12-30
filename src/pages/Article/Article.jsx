import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import './Article.css';
import axiosClient from '../../axios.js';
import { useUser } from '../../context/UserContext.jsx';


const Article = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { token } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(articles.length / itemsPerPage);

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {

            const response = await axiosClient.get('http://localhost:3000/api/v1/article',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log('Response dari API:', response.data);
            console.log(response);
            setArticles(response.data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (article) => {
        setSelectedArticle(article);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedArticle(null);
        setModalOpen(false);
    };

    const updateStatus = async (articleId, newStatus) => {
        // console.log(newStatus);
        try {
            const response = await axiosClient.put(`http://127.0.0.1:3000/api/v1/article/${articleId}`, {
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            );

            if (response.status === 200) {
                setArticles((prevArticles) =>
                    prevArticles.map((article) =>
                        article.artikel_id === articleId
                            ? { ...article, status: newStatus }
                            : article
                    )
                );
                fetchArticles();
                console.log('Status artikel berhasil diperbarui.');
            } else {
                console.error('Gagal memperbarui status: ', response.data.message);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat memperbarui status:', error.message);
        }
    };


    useEffect(() => {
        fetchArticles();
        console.log(token);
        if (!token) {
            setError("Token tidak ditemukan");
            setLoading(false);
            return;
        }

    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "badge bg-warning";
            case "Published":
                return "badge bg-success";
            case "Rejected":
                return "badge bg-danger";
            default:
                return "";
        }
    };

    const handleUpdateStatus = (newStatus) => {
        if (selectedArticle) {
            updateStatus(selectedArticle.artikel_id, newStatus);
            closeModal();
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="d-flex flex-column">
                <Header title={'Article'} />
                <div className="shadow rounded border p-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-danger">Error: {error}</p>
                    ) : (
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Article ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((article) => (
                                    <tr key={article.artikel_id}>
                                        <td>{article.artikel_id}</td>
                                        <td>{article.title}</td>
                                        <td>{article.user_name}</td>
                                        <td className="status-column">
                                            <span className={getStatusClass(article.status || "Pending")}>
                                                {article.status || "Pending"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => openModal(article)}
                                            >
                                                Change Status
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    )}
                    <div className="pagination mt-4 d-flex justify-content-center py-2" >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`btn mx-1 ${currentPage === index + 1 ? "btn-primary active-page" : "btn-secondary"
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <Modal isOpenModal={isModalOpen} onClose={closeModal}>
                    <div>
                        <h4>Change Status</h4>
                        {selectedArticle && (
                            <p>
                                Article: <strong>{selectedArticle.title}</strong>
                            </p>
                        )}
                        <div className="d-flex flex-column gap-2">
                            <div className="modal-buttons">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleUpdateStatus("Pending")}
                                >
                                    Pending
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleUpdateStatus("Published")}
                                >
                                    Published
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleUpdateStatus("Rejected")}
                                >
                                    Rejected
                                </button>

                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        </>
    );
};

export default Article;
