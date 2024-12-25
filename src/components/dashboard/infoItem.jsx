/* eslint-disable react/prop-types */
export default function InfoItem  ({ title, num }) {
    return (
      <div className="flex-grow-1 rounded px-5 py-3 shadow">
        <p>{title}</p>
        <h3>{num}</h3>
      </div>
    );
  };