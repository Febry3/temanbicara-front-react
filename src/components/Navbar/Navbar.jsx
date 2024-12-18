import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/telogo.png';
import leftlogo from '../../assets/left-logo.png';

const Navbar = ({ isOpen, toggleSidebar }) => {


    return (
        <>
            <button className={isOpen ? "sidebar-button" : "sidebar-button-closed"} onClick={toggleSidebar}>{isOpen ? <i className="bi bi-caret-left-fill"></i> : <i class="bi bi-caret-right-fill"></i>}</button>
            <aside className={isOpen ? "sidebar" : "sidebar-closed"}>
                {
                    isOpen ?
                        <>
                            <img className='sidebar-logo' src={logo} alt="Logo" />
                            <ul className="sidebar-links">
                                <li>
                                    <Link to="/"> <i className="bi bi-house"></i> Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/about"> <i className="bi bi-journal-text"></i> Article</Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-clipboard"></i> Quiz</Link>
                                </li>
                                <li>
                                    <Link to="/counselor"> <i className="bi bi-person"></i> Counselor</Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-bar-chart"></i> Report</Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-person-gear"></i> Admin</Link>
                                </li>
                            </ul>
                        </> :
                        <>
                            <img className='sidebar-logo-closed' src={leftlogo} alt="Logo" />
                            <ul className="sidebar-links">
                                <li>
                                    <Link to="/"> <i className="bi bi-house"></i></Link>
                                </li>
                                <li>
                                    <Link to="/about"> <i className="bi bi-journal-text"></i></Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-clipboard"></i></Link>
                                </li>
                                <li>
                                    <Link to="/contact"> <i className="bi bi-person"></i></Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-bar-chart"></i></Link>
                                </li>
                                <li>
                                    <Link to="/contact"><i className="bi bi-person-gear"></i></Link>
                                </li>
                            </ul>
                        </>
                }
            </aside>
        </>
    );
};

export default Navbar;