/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import axiosClient from "../../axios";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import "./Quiz.css";
import Modal from "../../components/Modal/Modal";

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const { token, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [deleteQuiz, setDeleteQuiz] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [page, setPage] = useState(1);
  const itemLength = 5;
  const totalPage = Math.ceil(quizzes.length / itemLength);
  const selectPage = quizzes.slice((page - 1) * itemLength, page * itemLength);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswer = (index, field, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
    setAnswers(updatedAnswers);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { option: "", point: "" }]);
  };

  const removeAnswerField = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "http://localhost:3000/api/v1/Quiz",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        const formattedQuizzes = response.data.data.map((quiz) => ({
          quiz_id: quiz.quiz_id,
          question: quiz.question,
          answers: quiz.answers || [],
        }));
        setQuizzes(formattedQuizzes);
      }
    } catch (error) {
      setError("Gagal mengambil data quiz");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Menyimpan data ke local storage
  const saveToLocalStorage = () => {
    const quizData = { question, answers };
    localStorage.setItem("quizData", JSON.stringify(quizData));
    setIsOpenConfirmModal(true); // Buka modal konfirmasi
  };

  const handleSubmit = async () => {
    const quizData = JSON.parse(localStorage.getItem("quizData"));

    try {
      const response = await axiosClient.post(
        "http://localhost:3000/api/v1/Quiz",
        {
          question: quizData.question,
          user_id: user.id,
          answers: quizData.answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Cek status respons dari server
      if (response.status === 200) {
        // alert("Quiz berhasil disimpan ke database!");
        fetchQuizzes();
        localStorage.removeItem("quizData"); // Hapus data dari local storage
        resetForm(); // Reset form
      } else {
        alert("Terjadi kesalahan saat menyimpan data di server.");
      }
    } catch (error) {
      console.error("Gagal menyimpan ke database:", error);
    }
  };

  const handledeleteQuiz = async (quizId) => {
    try {
      const response = await axiosClient.delete(
        `http://localhost:3000/api/v1/Quiz/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // alert("Quiz berhasil dihapus.");
        setQuizzes(quizzes.filter((quiz) => quiz.quiz_id !== quizId));
        setIsOpenModal(false);
      }
    } catch (error) {
      console.error("Gagal menghapus quiz:", error);
    }
  };

  const cancelSave = () => {
    localStorage.removeItem("quizData");
    setIsOpenConfirmModal(false); // Tutup modal konfirmasi
  };

  const resetForm = () => {
    setQuestion("");
    setAnswers([]);
    setIsOpenConfirmModal(false);
  };

  const openEditModal = (quiz) => {
    setEditQuiz(quiz);
    setModalType("edit");
    setIsOpenModal(true);
  };

  const openDeleteConfirm = (quiz) => {
    setDeleteQuiz(quiz);
    setModalType("delete");
    setIsOpenModal(true);
  };

  const openAddModal = () => {
    setModalType("add");
    setIsOpenModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const { quiz_id, question, answers } = editQuiz;
    const userId = user.id;

    try {
      const response = await axiosClient.put(
        `http://localhost:3000/api/v1/Quiz/${quiz_id}`, // Ensure you're using the quiz_id from editQuiz
        {
          quiz_id: editQuiz.quiz_id, // Include quiz_id in the request body
          question: editQuiz.question,
          userId: userId,
          answers: editQuiz.answers, // Send answers as an array of objects
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setQuizzes(
          quizzes.map((quiz) =>
            quiz.quiz_id === editQuiz.quiz_id ? editQuiz : quiz
          )
        );
        setIsOpenModal(false);
        setIsOpenConfirmModal(true);
        setEditQuiz(null); // Reset after edit
      }
    } catch (error) {
      console.error("Gagal mengupdate quiz:", error);
      if (error.response) {
        alert(
          `Error: ${
            error.response.data.message || "Tidak dapat mengupdate quiz"
          }`
        );
      } else {
        alert("Terjadi kesalahan saat mengupdate quiz.");
      }
    }
  };

  useEffect(() => {
    fetchQuizzes();
    console.log(token);
    if (!token) {
      setError("Token tidak ditemukan");
      setLoading(false);
      return;
    }
  }, []);

  return (
    <>
      <div className="container-fluid py-3 px-5">
        <Header title={"Quiz"} />
        <div className="mb-3 d-flex justify-content-end">
          <button
            onClick={openAddModal}
            type="button"
            className="btn btn-success btn-add"
          >
            <i className="bi bi-plus-circle"></i> Tambah Quiz
          </button>
        </div>

        <div className="shadow rounded border p-3">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Quiz ID</th>
                <th>Title</th>
                <th>Option</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {selectPage.map((quiz) => (
                <tr key={quiz.quiz_id}>
                  <td>{quiz.quiz_id}</td>
                  <td>{quiz.question}</td>
                  <td className="col-4">
                    {quiz.answers.map((answer) => (
                      <div key={answer.answer_id}>
                        <span>{answer.option}</span>
                        <br />
                      </div>
                    ))}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        onClick={() => openEditModal(quiz)}
                        type="button"
                        className="btn btn-success"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(quiz.quiz_id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal}>
        {modalType === "edit" && editQuiz ? (
          <div className="p-5">
            <form onSubmit={handleEditSubmit}>
              <h3 className="mb-5 text-center">Edit Pertanyaan</h3>
              <div className="mb-3 d-flex flex-column">
                <div className="input-group">
                  <span className="input-group-text" id="question">
                    <i className="bi bi-patch-question"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Question"
                    aria-label="question"
                    aria-describedby="question"
                    name="question"
                    value={editQuiz.question}
                    onChange={(e) =>
                      setEditQuiz({ ...editQuiz, question: e.target.value })
                    }
                  />
                </div>
              </div>
              {editQuiz.answers.map((answer, index) => (
                <div className="mb-3 d-flex gap-2" key={index}>
                  <div className="input-group">
                    <span className="input-group-text" id="name">
                      <i className="bi bi-list-ul"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Opsi ${index + 1}`}
                      aria-label="option"
                      aria-describedby="option"
                      name={`Opsi ${index + 1}`}
                      value={answer.option}
                      onChange={(e) => {
                        const updatedAnswers = [...editQuiz.answers];
                        updatedAnswers[index].option = e.target.value;
                        setEditQuiz({ ...editQuiz, answers: updatedAnswers });
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-text" id="name">
                      <i className="bi bi-coin"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Poin"
                      aria-label="poin"
                      aria-describedby="poin"
                      name="poin"
                      value={answer.point}
                      onChange={(e) => {
                        const updatedAnswers = [...editQuiz.answers];
                        updatedAnswers[index].point = e.target.value;
                        setEditQuiz({ ...editQuiz, answers: updatedAnswers });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const updatedAnswers = editQuiz.answers.filter(
                          (_, i) => i !== index
                        );
                        setEditQuiz({ ...editQuiz, answers: updatedAnswers });
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setEditQuiz({
                    ...editQuiz,
                    answers: [...editQuiz.answers, { option: "", point: "" }],
                  })
                }
              >
                Tambahkan Opsi
              </button>

              <button type="submit" className="btn btn-primary">
                Simpan Perubahan
              </button>
            </form>
          </div>
        ) : modalType === "add" ? (
          <div className="p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveToLocalStorage();
                setIsOpenModal(false);
              }}
            >
              <h3 className="mb-5 text-center">Buat Pertanyaan</h3>
              <div className="mb-3 d-flex flex-column">
                <div className="input-group">
                  <span className="input-group-text" id="question">
                    <i className="bi bi-patch-question"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Question"
                    aria-label="question"
                    aria-describedby="question"
                    name="question"
                    value={question}
                    onChange={handleQuestion}
                  />
                </div>
              </div>
              {answers.map((answer, index) => (
                <div className="mb-3 d-flex gap-2" key={index}>
                  <div className="input-group">
                    <span className="input-group-text" id="name">
                      <i className="bi bi-list-ul"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Opsi ${index + 1}`}
                      aria-label="option"
                      aria-describedby="option"
                      name={`Opsi ${index + 1}`}
                      value={answer.option}
                      onChange={(e) =>
                        handleAnswer(index, "option", e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-text" id="name">
                      <i className="bi bi-coin"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Poin"
                      aria-label="poin"
                      aria-describedby="poin"
                      name="poin"
                      value={answer.point}
                      onChange={(e) =>
                        handleAnswer(index, "point", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeAnswerField(index)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addAnswerField}
              >
                Tambahkan Opsi
              </button>

              <button type="submit" className="btn btn-primary">
                Simpan Quiz
              </button>
            </form>
          </div>
        ) : modalType === "delete" ? (
          <div className="p-4 text-center">
            <h4>Konfirmasi</h4>
            <p>Apakah Anda yakin ingin menghapus quiz ini?</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-success"
                onClick={() => handledeleteQuiz(deleteQuiz)}
              >
                Yakin
              </button>
              <button className="btn btn-danger" onClick={cancelSave}>
                Batal
              </button>
            </div>
          </div>
        ) : (
          <p>Memuat data...</p>
        )}
      </Modal>
      <div className="pagination d-flex justify-content-center align-items-center">
  {quizzes.length === 0 ? (
    <div></div>
  ) : (
    <>
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
    </>
  )}
</div>


      {isOpenConfirmModal && (
        <Modal
          onClose={() => setIsOpenConfirmModal(false)}
          isOpenModal={isOpenConfirmModal}
        >
          <div className="p-4 text-center">
            <h4>Konfirmasi</h4>
            <p>
              Apakah Anda yakin ingin{" "}
              {modalType === "edit" ? "menyimpan perubahan" : "menyimpan quiz"}?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  setIsOpenConfirmModal(false);
                  if (modalType === "edit") {
                    handleEditSubmit();
                  } else if (modalType === "add") {
                    handleSubmit();
                  }
                }}
              >
                Yakin
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setIsOpenConfirmModal(false);
                  if (modalType === "add") {
                    cancelSave();
                  }
                }}
              >
                Batal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
