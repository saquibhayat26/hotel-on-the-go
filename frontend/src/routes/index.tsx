import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <div>Home</div>
      </Layout>
    ),
  },
  {
    path: "sign-in",
    element: <div>Sign-in</div>,
  },
  {
    path: "/search",
    element: (
      <Layout>
        <div>Search</div>
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

export default routes;
