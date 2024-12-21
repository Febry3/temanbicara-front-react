import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './Counselor.css';
import { useUser } from '../../context/UserContext';

const Counselor = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { isSidebarOpen, setIsSidebarOpen } = useUser();
    return (
        <>
            <h1>Counselor</h1>
            <button onClick={() => setIsOpenModal(true)}>Buka Modal</button>
            <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal} isSidebarOpen={isSidebarOpen}>
                <div className='p-5'>
                    <form>
                        <h3 className='mb-3 text-center'>Membuat akun konselor</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="name"><i class="bi bi-person"></i></span>
                            <input type="text" className="form-control" placeholder="Name" aria-label="name" aria-describedby="name" name='name' />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="nickname"><i class="bi bi-person"></i></span>
                            <input type="text" className="form-control" placeholder="Nickname" aria-label="nickname" aria-describedby="nickname" name='nickname' />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="email"><i className="bi bi-envelope-at"></i></span>
                            <input type="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="email" name='email' />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="phone_number"><i class="bi bi-telephone"></i></span>
                            <input type="text" className="form-control" placeholder="Phone Number" aria-label="phone_number" aria-describedby="phone_number" name='phone_number' />
                        </div>
                        <div className='d-flex gap-3 mb-3'>
                            <div className="input-group">
                                <span className="input-group-text" id="birthdate"><i class="bi bi-cake"></i></span>
                                <input type="date" className="form-control" placeholder="Birthdate" aria-label="birthdate" aria-describedby="birthdate" name='birthdate' />
                            </div>
                            <select class="form-select">
                                <option selected>Gender</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Buat Akun Konselor</button>
                    </form>
                </div>
            </Modal >
        </>
    );
}

export default Counselor;