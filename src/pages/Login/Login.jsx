import './Login.css';
import AdminLogo from '../../assets/admin-bicara.png';
import { useState } from 'react';
import axiosClient from '../../axios';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const Login = () => {
    const { loginUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosClient.post('http://127.0.0.1:8000/api/v1/admin/login', {
                email: email,
                password: password,
            });
            const { data, token } = response.data;

            if (response.data.status === false) {
                setErrorMessage(response.data.message);
                setIsLoading(false);
            } else {
                loginUser(data, token);
                setErrorMessage('');
                setIsLoading(false);
                navigate('/');
            }
        } catch (error) {
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
            setIsLoading(false);
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
                        {isLoading ? <div className='my-3'><MoonLoader loading size={30} color='#7D944D' /></div> : <button type="button" className="button-primary back-primary my-3" onClick={() => { setIsLoading(true); handleSubmit() }}>Login</button>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;