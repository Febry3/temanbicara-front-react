import './Login.css';
import AdminLogo from '../../assets/admin-bicara.png';
import { useState } from 'react';
import axiosClient from '../../axios';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser, user, token } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosClient.post('/login', {
                email: email,
                password: password,
            });

            const { data, token } = response.data;

            loginUser(data, token);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    };

    return (

        <div className="login-wrapper">
            <div className="login-form border rounded shadow px-5 py-3">
                <div className='d-flex justify-content-center'>
                    <img className="login-logo" src={AdminLogo} alt="Logo" />
                </div>
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="email"><i className="bi bi-envelope-at"></i></span>
                        <input type="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="email" name='email' onChange={handleEmailChange} value={email} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="password"><i className="bi bi-key"></i></span>
                        <input type="password" className="form-control py-2" placeholder="Password" aria-label="password" aria-describedby="password" name='password' onChange={handlePasswordChange} value={password} />
                    </div>
                    {errorMessage && (
                        <div>
                            <small className='text-danger'>{errorMessage}</small>
                        </div>
                    )}
                    <div className='d-flex justify-content-center'>
                        <button type="button" className="button-primary back-primary my-3" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;