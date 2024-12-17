import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Layout.css';
import { useState } from 'react';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className='d-flex'>
                <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <main className={isOpen ? 'px-5 py-3 wrapper flex-grow-1' : 'px-5 py-3 wrapper-closed flex-grow-1'}>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;