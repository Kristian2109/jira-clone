import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import UserDetailsPage, { authLoader } from "./pages/UserDetails";
import Callback from "./pages/Callback";
import Layout from "./components/Layout/Layout";
import RegisterFormContainer from "./pages/Register";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterFormContainer />,
      },
      {
        path: "/account",
        element: <UserDetailsPage />,
        loader: authLoader,
      },
      { path: "/google/callback", element: <Callback /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
