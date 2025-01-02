import { useState, useEffect } from 'react';;
import Modal from '../../components/Modal/Modal';
import './Admin.css';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header/Header';
import axiosClient from '../../axios';

const Admin = () => {
    const { token } = useUser();
    const { user } = useUser();
    const [admins, setAdmins] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
    const { isSidebarOpen } = useUser();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
    const handleDelete = (adminId) => {
        setSelectedAdminId(adminId);
        setIsDeleteConfirmation(true);
        setIsOpenModal(true);
    };
    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = (admin) => {
        setSelectedAdmin(admin);
        setSelectedAdminId(admin.id);
        setIsEditing(true);
        setIsDeleteConfirmation(false);
        populateEditForm(admin);
        setIsOpenConfirmationModal(true);
    };
    const populateEditForm = () => {
        setName(selectedAdmin.name || '');
        setNickname(selectedAdmin.nickname || '');
        setEmail(selectedAdmin.email || '');
        setPhone(selectedAdmin.phone_number || '');
        setBirthdate(selectedAdmin.birthdate || '');
        setGender(selectedAdmin.gender || '');
    };
    const handleAddAdmin = () => {
        setIsEditing(false);
        setIsDeleteConfirmation(false);
        setSelectedAdmin(null);
        setIsOpenModal(true);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setNickname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setBirthdate('');
        setGender('');
        setFormError({
            name: '',
            nickname: '',
            email: '',
            phone: '',
            password: '',
            birthdate: '',
            gender: ''
        });
        setErrorMessage('');
        setCreateError('');
        setSelectedAdmin(null);
    };

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

    const handleCloseModal = () => {
        setIsOpenModal(false);
        resetForm();
    };

    const handleCloseConfirmationModal = () => {
        setIsOpenConfirmationModal(false);
        resetForm();
    };

    const validateConfirmationModal = () => {
        const error = { password: '' };

        if (password.trim() === '') error.password = 'Password tidak boleh kosong';

        setFormError(error);

        return Object.values(error).every(value => value === '');
    };

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
        // if (!email.trim().match("@temanbicara.com") || !email.trim().match("@gmail.com")) error.email = "Email harus menggunakan domain @temanbicara.com";
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

        if (isEditing) {

            const currentEmail = selectedAdmin.email;

            try {
                const response = await axiosClient.post('http://127.0.0.1:8000/api/v1/admin/verify-password', {
                    email: currentEmail,
                    password: password,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.status === false) {
                    setPassword('');
                    setErrorMessage(response.data.message);
                } else {
                    const success = await updateAdmin();
                    if (success) {
                        setIsOpenConfirmationModal(false)
                        setIsOpenModal(false);
                        resetForm();
                        return;
                    }
                }

            } catch (error) {
                setErrorMessage(error.response.data.message);
                setCreateError(error.response?.data.message || 'An error occurred');
            }

        } else {
            const success = await createAdmin();
            if (success) {
                setIsOpenConfirmationModal(false)
                resetForm();
                return;
            }
        }

    }

    const handleConfirmation = async (event) => {
        event.preventDefault();
        if (!validateConfirmationModal()) {
            setPassword('');
            setErrorMessage('');
            return;
        }

        const currentEmail = user.email;

        try {
            const response = await axiosClient.post('http://127.0.0.1:8000/api/v1/admin/verify-password', {
                email: currentEmail,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === false) {
                setPassword('');
                setErrorMessage(response.data.message);
            } else {
                if (isDeleteConfirmation) {
                    await deleteAdmin();
                } else if (isEditing) {
                    setIsOpenModal(false);
                    setErrorMessage('');
                    setPassword('');
                    populateEditForm();
                    setIsOpenConfirmationModal(true);
                } else {
                    setIsOpenModal(false);
                    setErrorMessage('');
                    setPassword('');
                    setIsOpenConfirmationModal(true);
                }
            }

        } catch (error) {
            setErrorMessage(error.response.data.message);
            setCreateError(error.response?.data.message || 'An error occurred');
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await axiosClient.get('http://127.0.0.1:3000/api/v1/admin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status) {
                setAdmins(response.data.data);
            }
        } catch (error) {
            console.error('Gagal mengambil data admins:', error);
        }
    };

    const deleteAdmin = async () => {
        try {
            const response = await axiosClient.delete(`http://127.0.0.1:3000/api/v1/admin/${selectedAdminId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                fetchAdmins();
                setIsOpenModal(false);
                setPassword('');
                setSelectedAdminId(null);
                setIsDeleteConfirmation(false);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Gagal menghapus data admin');
        }
    };

    const updateAdmin = async () => {
        try {
            console.log(email, name, nickname, gender, birthdate, phone);
            const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
            const response = await axiosClient.put(`http://127.0.0.1:3000/api/v1/admin/${selectedAdminId}`, {
                email: email,
                name: name,
                nickname: nickname,
                gender: gender,
                birthdate: formattedBirthdate,
                phone_number: phone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                fetchAdmins();
                return true;
            }
            return false;
        } catch (error) {
            setCreateError(error.response?.data.message || 'Gagal mengubah data admin');
            return false;
        }
    };

    const createAdmin = async () => {
        try {
            const response = await axiosClient.post('http://127.0.0.1:3000/api/v1/admin', {
                email: email,
                password: password,
                name: name,
                nickname: nickname,
                gender: gender,
                birthdate: birthdate,
                phone_number: phone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                fetchAdmins();
                return true;
            }
            return false;
        } catch (error) {
            setCreateError(error.response?.data.message || 'Gagal menambahkan data admin');
            return false;
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <>
            <Header title={'Admin'} />
            <div className="d-flex gap-3 mb-5">
                <div className="input-group search-box">
                    <span className="input-group-text px-3" id="search">
                        <i className="bi bi-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Cari Admin" aria-label="search" aria-describedby="search" name="search" />
                </div>
                <button onClick={handleAddAdmin} type="button" className="btn btn-success btn-add">
                    <i className="bi bi-plus-circle"></i> Tambah Admin
                </button>
            </div>

            <div className="shadow rounded border p-3">
                <table className="table table-borderless">
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

                        {

                            admins.length === 0 ?
                                <tr>
                                    <td colSpan={5} rowSpan={5}>
                                        <h3 className='text-center my-5 clr-primary'>Data konselor masih kosong</h3>
                                    </td>
                                </tr>
                                :

                                admins.map((admin) => (
                                    <tr key={admin.id}>
                                        <td>{admin.id}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.phone_number}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() => handleEdit(admin)}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(admin.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                        }
                    </tbody>
                </table>
            </div>

            <Modal onClose={handleCloseModal} isOpenModal={isOpenModal} isSidebarOpen={isSidebarOpen}>
                <div className="p-2">
                    <form>
                        <h3 className="text-center pb-5">Konfirmasi Admin</h3>
                        <div className="mb-3 d-flex flex-column">
                            <div className="input-group">
                                <span className="input-group-text" id="password">
                                    <i className="bi bi-key"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    aria-label="password"
                                    aria-describedby="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </div>
                            {formError.password && <small className="text-danger">{formError.password}</small>}
                        </div>
                        {errorMessage && (
                            <div>
                                <small className='text-danger'>{errorMessage}</small>
                            </div>
                        )}
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary my-3 py-2" onClick={handleConfirmation}>
                                Konfirmasi
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal onClose={handleCloseConfirmationModal} isOpenModal={isOpenConfirmationModal} isSidebarOpen={isSidebarOpen}>
                <div className='p-5'>
                    <form>
                        <h3 className='mb-3 text-center'>{isEditing ? 'Edit Data Admin' : 'Tambah Data Admin'}</h3>
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
                                <input type="password" className="form-control" placeholder={isEditing ? 'Confirm Old Password' : 'Password'} aria-label="password" aria-describedby="password" name='password' value={password} onChange={(event) => handlePassword(event)} />
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
                                    <option value="male" >Laki-laki</option>
                                    <option value="female" >Perempuan</option>
                                </select>
                            </div>

                            {(formError.gender || formError.birthdate) && (<small className='text-danger'> Gender atau tanggal lahir tidak boleh kosong</small>)}
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="btn btn-primary my-3 py-2" onClick={(event) => handleSubmit(event)}>{isEditing ? 'Edit Admin' : 'Buat Akun Admin'}</button>
                        </div>
                        {createError && (<small className='text-danger'> *{createError} </small>)}
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Admin;
