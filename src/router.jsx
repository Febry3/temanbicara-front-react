import Layout from "./components/Layout/Layout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Counselor from "./pages/Counselor/Counselor.jsx";
import Login from "./pages/Login/Login.jsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/counselor", element: <Counselor /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
