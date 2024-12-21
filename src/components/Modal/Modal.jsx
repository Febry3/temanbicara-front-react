import ReactDom from 'react-dom';

const Modal = () => {
    return ReactDom.createPortal(
        <>
            <h1>Test Modal</h1>
        </>
    );
}

export default Modal;