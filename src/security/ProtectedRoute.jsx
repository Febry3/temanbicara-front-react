import Layout from "../components/Layout/Layout";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, token } = useUser();

    if (!user) {
        return <Navigate to="/login" />
    }

    if (!token) {
        return <Navigate to="/login" />
    }
    return (
        <Layout />
    );
};

export default ProtectedRoute;