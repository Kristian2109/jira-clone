import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage, { loginAction } from "./pages/Home/index";
import UserDetailsPage, {
  loader as authLoader,
} from "./pages/UserDetails/index";
import Callback from "./pages/Callback";
import Layout from "./components/Layout/Layout";
import RegisterFormContainer, {
  action as registerAction,
} from "./pages/Register/index";
import ErrorPage from "./pages/Error";
import WorkPage, { workPageLoader } from "./pages/UserWork";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterFormContainer />,
        action: registerAction,
      },
      {
        path: "/account",
        element: <UserDetailsPage />,
        loader: authLoader,
      },
      { path: "/google/callback", element: <Callback /> },
      {
        path: "/your-work",
        element: <WorkPage />,
        loader: workPageLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
