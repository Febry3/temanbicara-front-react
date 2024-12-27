import Layout from "./components/Layout/Layout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Counselor from "./pages/Counselor/Counselor.jsx";
import Article from "./pages/Article/Article.jsx";
import Login from "./pages/Login/Login.jsx";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./security/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Admin from "./pages/Admin/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/counselor", element: <Counselor /> },
      { path: "/admin", element: <Admin />},
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
