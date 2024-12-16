import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/telogo.png';
const Navbar = () => {
    return (
        <>
            <aside className="sidebar">
                <img className='sidebar-logo' src={logo} alt="Logo" />
                <ul className="sidebar-links">
                    <li>
                        <Link to="/"> <i class="bi bi-house"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/about"> <i class="bi bi-journal-text"></i> Article</Link>
                    </li>
                    <li>
                        <Link to="/contact"><i class="bi bi-clipboard"></i> Quiz</Link>
                    </li>
                    <li>
                        <Link to="/contact"> <i class="bi bi-person"></i> Counselor</Link>
                    </li>
                    <li>
                        <Link to="/contact"><i class="bi bi-bar-chart"></i> Report</Link>
                    </li>
                    <li>
                        <Link to="/contact"><i class="bi bi-person-gear"></i> Admin</Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Navbar;