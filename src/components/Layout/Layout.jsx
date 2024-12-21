import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Layout.css';
import { useUser } from '../../context/UserContext';

const Layout = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useUser();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <>
            <div className='d-flex'>
                <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className={isSidebarOpen ? 'px-5 py-3 wrapper flex-grow-1' : 'px-5 py-3 wrapper-closed flex-grow-1'}>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;