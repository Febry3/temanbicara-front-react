import { useUser } from '../../context/UserContext';
import avatar from '../../assets/avatar.png';
import './Header.css';

const Header = ({ title }) => {
    const { user } = useUser();

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <h3 className="m-0">Hello, Admin</h3>
                    <p className="m-0">Have a nice day</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <img className='profile-pict' src={avatar} alt="Avatar" />
                    <div className="d-flex flex-column">
                        <h4 className="m-0">{user.name}</h4>
                        <p className="m-0">Admin</p>
                    </div>
                </div>
            </div>
            <h2 className='py-4 clr-primary'>{title}</h2>
        </>
    );
}


export default Header;