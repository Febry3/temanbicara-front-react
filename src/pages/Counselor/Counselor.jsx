import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './Counselor.css';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header/Header';

const Counselor = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { isSidebarOpen } = useUser();
    return (
        <>
            <Header title={'Counselor'} />
            <div className='d-flex gap-3 mb-5'>
                <div className="input-group search-box">
                    <span className="input-group-text px-3" id="search"><i class="bi bi-search"></i></span>
                    <input type="text" className="form-control" placeholder="Cari Nama Konselor" aria-label="search" aria-describedby="search" name='search' />
                </div>
                <button onClick={() => setIsOpenModal(true)} type="button" className='btn btn-success btn-add'><i class="bi bi-plus-circle"></i> Tambah Konselor</button>
            </div>

            <div className='shadow rounded border p-3'>
                <table className='table table-borderless '>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomor Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Asep Surasep</td>
                            <td>asep@temanbicara.com</td>
                            <td>0869699696969</td>
                            <td>
                                <div className='d-flex gap-1'>
                                    <button type="button" className='btn btn-primary'><i class="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i class="bi bi-pencil"></i></button>
                                    <button type="button" className='btn btn-danger'><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Asep Surasep</td>
                            <td>asep@temanbicara.com</td>
                            <td>0869699696969</td>
                            <td>
                                <div className='d-flex gap-1'>
                                    <button type="button" className='btn btn-primary'><i class="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i class="bi bi-pencil"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Asep Surasep</td>
                            <td>asep@temanbicara.com</td>
                            <td>0869699696969</td>
                            <td>
                                <div className='d-flex gap-1'>
                                    <button type="button" className='btn btn-primary'><i class="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i class="bi bi-pencil"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

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
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="password"><i class="bi bi-key"></i></span>
                            <input type="password" className="form-control" placeholder="Password" aria-label="password" aria-describedby="password" name='password' />
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
                        <div className='d-flex justify-content-center'>
                            <button type="submit" class="btn btn-primary my-3 py-3">Buat Akun Konselor</button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    );
}

export default Counselor;