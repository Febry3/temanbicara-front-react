import avatar from '../../assets/avatar.png';
import { useUser } from '../../context/UserContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useUser();
    return (
        <div className='d-flex flex-column'>
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
            <h2 className='page-title py-4'>Dashboard</h2>

            <div className='flex-grow-1 d-flex gap-3 flex-row'>
                <InfoItem />
                <InfoItem />
                <InfoItem />
                <InfoItem />
            </div>

            <div className='flex-shrink-1 d-flex gap-3 mt-5'>
                <ArticleTable />
                <QuizTable />
                <CounselorTable />
            </div>
        </div>
    );
};

const InfoItem = () => {
    return (
        <div className='flex-grow-1 rounded px-5 py-3 shadow'>
            <p>Article</p>
            <h3>199</h3>
        </div>
    );
}

const ArticleTable = () => {
    return (
        <div className='flex-grow-1 rounded shadow p-4'>
            <h3>Article</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <p className='m-0'>Title</p>
                                <p className='m-0 text-secondary'>Author</p>
                            </div>
                        </td>
                        <td>
                            <Status />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const QuizTable = () => {
    return (
        <div className='flex-grow-1 flex-shrink-1 rounded shadow p-4'>
            <h3>Quiz</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Quiz 1</td>
                        <td>Quiz</td>
                    </tr>
                    <tr>
                        <td>Quiz 1</td>
                        <td>Quiz</td>
                    </tr>
                    <tr>
                        <td>Quiz 1</td>
                        <td>Quiz</td>
                    </tr>
                    <tr>
                        <td>Quiz 1</td>
                        <td>Quiz</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const CounselorTable = () => {
    return (
        <div className='flex-grow-1 flex-shrink-1 rounded shadow p-4'>
            <h3>Counselor</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Field</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <p className='m-0'>Asep</p>
                                <p className='m-0 text-secondary'>asep@temanbicara.com</p>
                            </div>
                        </td>
                        <td>Relationship, Social</td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <p className='m-0'>Asep</p>
                                <p className='m-0 text-secondary'>asep@temanbicara.com</p>
                            </div>
                        </td>
                        <td>Relationship, Social</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


const Status = () => {
    return (
        <div className='status d-flex align-items-center justify-content-center py-2'>
            <p className='m-0'>Published</p>
        </div>
    );
}

export default Dashboard;