import { useState, useEffect } from 'react';;
import './Report.css';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header/Header';
import axios from "axios";
import CounselorTable from "../../components/dashboard/counselorTable";
import QuizTable from "../../components/dashboard/quizTable";
import TopArticleTable from '../../components/Report/topArticleTable';
import TopCounselorTable from "../../components/Report/topCounselorTable";

const Report = () => {
    const [expertise, setExpertise] = useState([]);
    const [article, setArticle] = useState([]);
    const [counselor, setCounselor] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");

        if (!token) {
            setError("Token tidak ditemukan");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [expertiseResponse, articleResponse, counselorResponse, adminResponse] = await Promise.all([
                    axios.get("http://localhost:3000/api/v1/Expertise", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:3000/api/v1/article", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:3000/api/v1/consultation", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:3000/api/v1/admin", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                console.log(expertiseResponse);
                setCounselor(counselorResponse.data.data);
                setExpertise(expertiseResponse.data.data);
                setAdmin(adminResponse.data.data)
                setArticle(articleResponse.data.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching data");
                setLoading(false);
                console.log(err.response || err);
            }
        };

        fetchData();
    }, []);


    const groupedExpertise = expertise.reduce((acc, item) => {
        const { user_name, user_email, type } = item;
        const user_id = item.user_id;

        if (user_name && user_email) {
            const key = user_name;
            if (!acc[key]) {
                acc[key] = {
                    user: {
                        id: user_id,
                        name: user_name,
                        email: user_email,
                    },
                    skills: [],
                };
            }
            if (!acc[key].skills.includes(type)) {
                acc[key].skills.push(type);
            }
        }
        return acc;
    }, {});

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header title={'Report'} />
            {admin.map((data, key) => console.log(data, key))}
           

            <div className="flex-shrink-1 d-flex gap-3 mt-5">
                <TopArticleTable Article={article} />
                <TopCounselorTable consultations={counselor} />
            </div>
        </div>

    );
};

export default Report;