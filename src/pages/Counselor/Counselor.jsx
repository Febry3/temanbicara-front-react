import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import './Counselor.css';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header/Header';
import axiosClient from '../../axios';
import { useFetchCounselor } from '../../services/Counselor/useFetchCounselor';
import { useCreateCounselorAccount } from '../../services/Counselor/useCreateCounselor';
import { MoonLoader } from 'react-spinners';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useDeleteCounselorAccount } from '../../services/Counselor/useDeleteCounselor';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import TableLoader from '../../components/TableLoader/TableLoader';
import { useUpdateCounselorAccount } from '../../services/Counselor/useUpdateCounselor';

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
    const [formError, setFormError] = useState({
        name: '',
        nickname: '',
        email: '',
        phone: '',
        password: '',
        birthdate: '',
        gender: ''
    });

    //bisa make formik 
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

    const [createError, setCreateError] = useState('');
    const { data: counselorAccount, refetch, isFetching } = useFetchCounselor({ token: token });
    const { mutateAsync: updateCounselorAccount, isPending: isEditPending } = useUpdateCounselorAccount({ token: token, onSuccess: () => refetch(), onError: (error) => console.log(error) });
    const { mutateAsync: createCounselorAccount, isPending: isCreatePending } = useCreateCounselorAccount({ token: token, onSuccess: () => refetch(), onError: (error) => setCreateError(error.response.data.message) });
    const { mutate: deleteCounselorAccount, isPending: isDeletePending } = useDeleteCounselorAccount({ token: token, onSuccess: () => { refetch(); showToastSuccess('Akun konselor berhasil dihapus') }, onError: () => console.log() })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return
        }

        if (isEdit) {
            console.log('masuk')
            await updateCounselorAccount({
                email: email,
                name: name,
                nickname: nickname,
                gender: gender,
                birthdate: birthdate,
                phone_number: phone,
                id: id
            });
        } else {
            await createCounselorAccount({
                email: email,
                password: password,
                name: name,
                nickname: nickname,
                gender: gender,
                birthdate: birthdate,
                phone_number: phone,
                expertises: expertises,
            });
        }

        clearModal();
        showToastSuccess(isEdit ? "Berhasil mengubah data konselor" : "Berhasil membuat akun konselor");
        return;
    }

    const showToastSuccess = (message) => {
        return toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const showToastError = (message) => {
        return toast.error(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const clearModal = () => {
        setIsOpenModal(false);
        setName('');
        setNickname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setBirthdate('');
        setGender('');
        setCreateError('');
        setExpertises('');
        setIsEdit(false);
        setIsView(false);
    }

    const [isEdit, setIsEdit] = useState(false);
    const [isView, setIsView] = useState(false);
    const [id, setId] = useState(0);

    const openEditModal = (data) => {
        setIsOpenModal(true);
        setIsEdit(true);
        setName(data.name);
        setNickname(data.nickname);
        setEmail(data.email);
        setPhone(data.phone_number);
        setPassword('123456789');
        setBirthdate(data.birthdate);
        setGender(data.gender);
        setCreateError('');
        setId(data.id);
    }

    const openViewModal = (data) => {
        setIsOpenModal(true);
        setIsView(true);
        setName(data.name);
        setNickname(data.nickname);
        setEmail(data.email);
        setPhone(data.phone_number);
        setPassword('123456789');
        setBirthdate(data.birthdate);
        setGender(data.gender);
        setExpertises(data.expertises);
        setCreateError('');
    }

    const [search, setSearch] = useState('');
    const [expertises, setExpertises] = useState('');



    return (
        <>

            {isDeletePending && <LoadingOverlay />}
            <ToastContainer />
            <Header title={'Counselor'} />
            <div className='d-flex gap-3 mb-5'>
                <div className="input-group search-box">
                    <span className="input-group-text px-3" id="search"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control" placeholder="Cari Nama Konselor" aria-label="search" aria-describedby="search" name='search' value={search} onChange={(event) => setSearch(event.target.value)} />
                </div>
                <button onClick={() => setIsOpenModal(true)} type="button" className='btn btn-success btn-add'><i className="bi bi-plus-circle"></i> Tambah Konselor</button>
            </div>

            <div className='shadow rounded border px-3 pt-3'>
                <table className='table table-borderless '>
                    {isFetching ?
                        <TableLoader isSidebarOpen={isSidebarOpen} /> :
                        <>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Nomor Telepon</th>
                                    <th>Keahlian</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    counselorAccount?.data.data.length === 0 ?
                                        <tr>
                                            <td colSpan={5} rowSpan={5}>
                                                <h3 className='text-center my-5 clr-primary'>Data konselor masih kosong</h3>
                                            </td>
                                        </tr>
                                        :
                                        counselorAccount?.data.data.filter((acc) => { return acc.name.toLowerCase().includes(search.toLowerCase()) }).map((acc) => {
                                            return (
                                                <tr key={acc.id}>
                                                    <td>{acc.id}</td>
                                                    <td>{acc.name}</td>
                                                    <td>{acc.email}</td>
                                                    <td>{acc.phone_number}</td>
                                                    <td>{acc.expertises}</td>
                                                    <td>
                                                        <div className='d-flex gap-1'>
                                                            <button onClick={() => openViewModal(acc)} type="button" className='btn btn-primary'><i className="bi bi-eye"></i></button>
                                                            <button onClick={() => openEditModal(acc)} type="button" className='btn btn-success'><i className="bi bi-pencil"></i></button>
                                                            <button onClick={() => deleteCounselorAccount(acc.id)} type="button" className='btn btn-danger'><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                }

                            </tbody>
                        </>
                    }
                </table>
            </div >


            <Modal onClose={() => clearModal()} isOpenModal={isOpenModal} isSidebarOpen={isSidebarOpen}>
                <div className='p-5'>
                    <form>
                        <h3 className='mb-3 text-center'>{isView ? "Melihat data akun Konselor" : isEdit ? "Mengubah data akun konselor" : "Membuat akun konselor"}</h3>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="name"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" placeholder="Nama" aria-label="name" aria-describedby="name" name='name' value={name} onChange={(event) => handleName(event)} disabled={isView} />
                            </div>
                            {formError.name && (<small className='text-danger'>{formError.name}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="nickname"><i className="bi bi-person"></i></span>
                                <input type="text" className="form-control" placeholder="Nama Panggilan" aria-label="nickname" aria-describedby="nickname" name='nickname' value={nickname} onChange={(event) => handleNickname(event)} disabled={isView} />
                            </div>
                            {formError.nickname && (<small className='text-danger'>{formError.nickname}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="email"><i className="bi bi-envelope-at"></i></span>
                                <input type="email" className="form-control" placeholder="Alamat Email" aria-label="email" aria-describedby="email" name='email' value={email} onChange={(event) => handleEmail(event)} disabled={isView} />
                            </div>
                            {formError.email && (<small className='text-danger'>{formError.email}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="phone_number"><i className="bi bi-telephone"></i></span>
                                <input type="text" className="form-control" placeholder="Nomor Telepon" aria-label="phone_number" aria-describedby="phone_number" name='phone_number' value={phone} onChange={(event) => handlePhone(event)} disabled={isView} />
                            </div>
                            {formError.phone && (<small className='text-danger'>{formError.phone}</small>)}
                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="password"><i className="bi bi-key"></i></span>
                                <input type="password" className="form-control" placeholder="Kata Sandi" aria-label="password" aria-describedby="password" name='password' value={password} onChange={(event) => handlePassword(event)} disabled={isView} />
                            </div>
                            {formError.password && (<small className='text-danger'>{formError.password}</small>)}
                        </div>
                        <div className='mb-3'>
                            <div className='d-flex gap-3'>
                                <div className="input-group">
                                    <span className="input-group-text" id="birthdate"><i className="bi bi-cake"></i></span>
                                    <input type="date" className="form-control" placeholder="Tanggal Ulang Tahun" aria-label="birthdate" aria-describedby="birthdate" name='birthdate' value={birthdate} onChange={(event) => handleBirthdate(event)} disabled={isView} />
                                </div>
                                <select className="form-select" value={gender} onChange={(event) => handleGender(event)} disabled={isView}>
                                    <option value="" disabled>Gender</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female" >Perempuan</option>
                                </select>
                            </div>

                            {(formError.gender || formError.birthdate) && (<small className='text-danger'> Gender atau tanggal lahir tidak boleh kosong</small>)}


                        </div>
                        <div className='mb-3 d-flex flex-column'>
                            <div className="input-group">
                                <span className="input-group-text" id="expertises">Bidang Keahlian</span>
                                <input type="text" className="form-control" placeholder="Pisahkan dengan &quot;,&quot;" aria-label="expertises" aria-describedby="expertises" name='expertises' value={expertises} onChange={(event) => setExpertises(event.target.value)} disabled={isView} />
                            </div>
                            {formError.phone && (<small className='text-danger'>{formError.phone}</small>)}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {
                                isView ? <div className='my-4'></div> :
                                    isCreatePending ?
                                        <div className='my-4'><MoonLoader loading size={30} color='#7D944D' /></div> :
                                        <button type="button" className="btn btn-primary my-3 py-2" onClick={(event) => handleSubmit(event)}>
                                            {isEdit ? "Edit akun konselor" : "Buat akun konselor"}
                                        </button>
                            }
                        </div>

                        {createError && (<small className='text-danger'> *{createError} </small>)}

                    </form>
                </div>
            </Modal >

            {/* <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal} isSidebarOpen={isSidebarOpen}>
                <div className='p-5'>
                    <form>
                        <h3 className='mb-3 text-center'>Mengubah akun konselor</h3>
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
                                    <option value="male">Laki-laki</option>
                                    <option value="female" >Perempuan</option>
                                </select>
                            </div>

                            {(formError.gender || formError.birthdate) && (<small className='text-danger'> Gender atau tanggal lahir tidak boleh kosong</small>)}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {
                                isCreatePending ?
                                    <div className='my-4'><MoonLoader loading size={30} color='#7D944D' /></div> :
                                    <button type="button" className="btn btn-primary my-3 py-2" onClick={(event) => handleSubmit(event)}>
                                        Buat Akun Konselor
                                    </button>
                            }
                        </div>

                        {createError && (<small className='text-danger'> *{createError} </small>)}

                    </form>
                </div>
            </Modal > */}
        </>
    );
}

export default Counselor;