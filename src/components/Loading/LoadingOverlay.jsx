import './LoadingOverlay.css';
import { MoonLoader } from 'react-spinners';

const LoadingOverlay = () => {
    return (
        <div className='overlay'>
            <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                <MoonLoader size={100} />
            </div>
        </div>
    )
}

export default LoadingOverlay;