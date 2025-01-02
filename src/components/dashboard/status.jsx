/* eslint-disable react/prop-types */
export default function Status({ status }) {
  return (
    <div
      className={
        status === "Published"
          ? "status-published d-flex align-items-center justify-content-center py-2"
          : status === "Pending"
          ? "status-pending d-flex align-items-center justify-content-center py-2"
          : "status-rejected d-flex align-items-center justify-content-center py-2"
      }
    >
      <p className="m-0">{status}</p>
    </div>
  );
}
