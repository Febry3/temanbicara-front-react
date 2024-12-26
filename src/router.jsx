import Layout from "./components/Layout/Layout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Counselor from "./pages/Counselor/Counselor.jsx";
import Article from "./pages/Article/Article.jsx";
import Login from "./pages/Login/Login.jsx";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./security/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/counselor", element: <Counselor /> },
      { path: "/article", element: <Article /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
