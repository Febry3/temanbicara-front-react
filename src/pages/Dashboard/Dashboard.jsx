/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Dashboard.css";
import ArticleTable from "../../components/dashboard/articleTable";
import CounselorTable from "../../components/dashboard/counselorTable";
import QuizTable from "../../components/dashboard/quizTable";
import InfoItem from "../../components/dashboard/infoItem";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
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
        const [expertiseResponse, articleResponse,counselorResponse,adminResponse] = await Promise.all([
          axios.get("http://localhost:3000/Expertise", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/article", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/counselor", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/admin", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
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
    <div className="d-flex flex-column">
      <Header title={"Dashboard"} />
      {admin.map((data, key) => console.log(data, key))}
      <div className="flex-grow-1 d-flex gap-3 flex-row">
        <InfoItem
          num={article.length}
          title={"Article"}
        />
        <InfoItem
          num={Object.keys(groupedExpertise).length}
          title={"Quiz"}
        />
        <InfoItem
          num={counselor.length}
          title={"Counselor"}
        />
        <InfoItem
          num={admin.length}
          title={"Admin"}
        />
      </div>

      <div className="flex-shrink-1 d-flex gap-3 mt-5">
        <ArticleTable Article={article}/>
        <QuizTable />
        <CounselorTable groupedExpertise={groupedExpertise} />
      </div>
    </div>
  );
};


export default Dashboard;
