/* eslint-disable react/prop-types */
export default function QuizTable  () {
    return (
      <div className="flex-grow-1 flex-shrink-1 rounded shadow p-4">
        <h3>Quiz</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quiz 1</td>
              <td>Quiz</td>
            </tr>
            <tr>
              <td>Quiz 1</td>
              <td>Quiz</td>
            </tr>
            <tr>
              <td>Quiz 1</td>
              <td>Quiz</td>
            </tr>
            <tr>
              <td>Quiz 1</td>
              <td>Quiz</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  };