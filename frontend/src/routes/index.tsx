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
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
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
    path: "/my-bookings",
    element: (
      <Layout>
        <div>My Bookings</div>
      </Layout>
    ),
  },
  {
    path: "/my-hotels",
    element: (
      <Layout>
        <div>My Hotels</div>
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

export default routes;
