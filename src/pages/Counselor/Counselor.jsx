import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './Counselor.css';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header/Header';
import axiosClient from '../../axios';

const Counselor = () => {
    const { token } = useUser();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { isSidebarOpen } = useUser();
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [createError, setCreateError] = useState('');
    const [formError, setFormError] = useState({
        name: '',
        nickname: '',
        email: '',
        phone: '',
        password: '',
        birthdate: '',
        gender: ''
    });

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleNickname = (event) => {
        setNickname(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleBirthdate = (event) => {
        setBirthdate(event.target.value)
    }

    const handleGender = (event) => {
        setGender(event.target.value)
    }

    const validateForm = () => {
        const error = {
            name: '',
            nickname: '',
            email: '',
            phone: '',
            password: '',
            birthdate: '',
            gender: ''
        };

        if (name.trim() === "") error.name = "Nama tidak boleh kosong";
        if (nickname.trim() === "") error.nickname = "Nickname tidak boleh kosong";
        if (!email.trim().match("@temanbicara.com")) error.email = "Email harus menggunakan domain @temanbicara.com";
        if (email.trim() === "") error.email = "Email tidak boleh kosong";
        if (phone.trim() === "") error.phone = "Nomor telepon tidak boleh kosong";
        if (password.trim() === "") error.password = "Password tidak boleh kosong";
        if (birthdate.trim() === "") error.birthdate = "Nama tidak boleh kosong";
        if (gender.trim() === "") error.gender = "Gender tidak boleh kosong";

        setFormError(error);

        return Object.values(error).every(value => value === '');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return
        }

        const success = await createCounselorAccount();

        if (success) {
            setIsOpenModal(false);
            setName('');
            setNickname('');
            setEmail('');
            setPhone('');
            setPassword('');
            setBirthdate('');
            setGender('');
            return;
        }
        return;

    }

    const createCounselorAccount = async () => {
        try {
            const response = await axiosClient.post('http://localhost:3000/api/v1/counselor', {
                email: email,
                password: password,
                name: name,
                nickname: nickname,
                gender: gender,
                birthdate: birthdate,
                phone_number: phone
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status == false) {
                setCreateError(response.data.message);
                return false;
            } else {
                setCreateError('');
                return true;
            }


        } catch (error) {
            setCreateError(error.response.data.message);
            return false;
        }
    }

    const deleteCounselorAccount = () => {

    }

    return (
        <>
            <Header title={'Counselor'} />
            <div className='d-flex gap-3 mb-5'>
                <div className="input-group search-box">
                    <span className="input-group-text px-3" id="search"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control" placeholder="Cari Nama Konselor" aria-label="search" aria-describedby="search" name='search' />
                </div>
                <button onClick={() => setIsOpenModal(true)} type="button" className='btn btn-success btn-add'><i className="bi bi-plus-circle"></i> Tambah Konselor</button>
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
                                    <button type="button" className='btn btn-primary'><i className="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i className="bi bi-pencil"></i></button>
                                    <button type="button" className='btn btn-danger'><i className="bi bi-trash"></i></button>
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
                                    <button type="button" className='btn btn-primary'><i className="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i className="bi bi-pencil"></i></button>
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
                                    <button type="button" className='btn btn-primary'><i className="bi bi-eye"></i></button>
                                    <button type="button" className='btn btn-success'><i className="bi bi-pencil"></i></button>
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
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="name"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" placeholder="Name" aria-label="name" aria-describedby="name" name='name' value={name} onChange={(event) => handleName(event)} />
                            </div>
                            {formError.name && (<small className='text-danger'>{formError.name}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="nickname"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" placeholder="Nickname" aria-label="nickname" aria-describedby="nickname" name='nickname' value={nickname} onChange={(event) => handleNickname(event)} />
                            </div>
                            {formError.nickname && (<small className='text-danger'>{formError.nickname}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="email"><i className="bi bi-envelope-at"></i></span>
                                <input type="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="email" name='email' value={email} onChange={(event) => handleEmail(event)} />
                            </div>
                            {formError.email && (<small className='text-danger'>{formError.email}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="phone_number"><i className="bi bi-telephone"></i></span>
                                <input type="text" className="form-control" placeholder="Phone Number" aria-label="phone_number" aria-describedby="phone_number" name='phone_number' value={phone} onChange={(event) => handlePhone(event)} />
                            </div>
                            {formError.phone && (<small className='text-danger'>{formError.phone}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="password"><i className="bi bi-key"></i></span>
                                <input type="password" className="form-control" placeholder="Password" aria-label="password" aria-describedby="password" name='password' value={password} onChange={(event) => handlePassword(event)} />
                            </div>
                            {formError.password && (<small className='text-danger'>{formError.password}</small>)}
                        </div>
                        <div>
                            <div className='d-flex gap-3'>
                                <div className="input-group">
                                    <span className="input-group-text" id="birthdate"><i className="bi bi-cake"></i></span>
                                    <input type="date" className="form-control" placeholder="Birthdate" aria-label="birthdate" aria-describedby="birthdate" name='birthdate' value={birthdate} onChange={(event) => handleBirthdate(event)} />
                                </div>
                                <select className="form-select" value={gender} onChange={(event) => handleGender(event)} >
                                    <option value="" disabled>Gender</option>
                                    <option value="Laki-laki" >Laki-laki</option>
                                    <option value="Perempuan" >Perempuan</option>
                                </select>
                            </div>

                            {(formError.gender || formError.birthdate) && (<small className='text-danger'> Gender atau tanggal lahir tidak boleh kosong</small>)}
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="btn btn-primary my-3 py-2" onClick={(event) => handleSubmit(event)}>Buat Akun Konselor</button>
                        </div>
                        {createError && (<small className='text-danger'> *{createError} </small>)}
                    </form>
                </div>
            </Modal >
        </>
    );
}

export default Counselor;