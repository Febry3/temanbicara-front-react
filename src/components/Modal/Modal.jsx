import ReactDom from 'react-dom';
import './Modal.css';

const Modal = ({ isOpenModal, onClose, children, isSidebarOpen }) => {
    if (!isOpenModal) return null;

    return ReactDom.createPortal(
        <>
            <div className='modal-overlay'></div>
            <div className='modal-content'>
                <div className={`container bg-white border rounded shadow ${isSidebarOpen ? 'open' : 'close'}`}>
                    <div className='container-fluid d-flex justify-content-end mt-3'><i className="bi bi-x-lg" onClick={onClose}></i></div>
                    {children}
                </div>
            </div>
        </>
        , document.getElementById('portal')
    )

}

export default Modal;