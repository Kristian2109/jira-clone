import React from "react";
import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import UserPage from "./pages/UserPage";
import Callback from "./pages/Callback";
import Layout from "./components/generic/Layout";
import RegisterFormContainer from "./pages/Register/RegisterFormContainer";
import { authLoader } from "./utils/auth";
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
        element: <UserPage />,
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
