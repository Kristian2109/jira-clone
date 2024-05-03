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
import CreateProjectPage, { createProjectAction } from "./pages/CreateProject";
import ProjectNavigation, {
  projectLoader,
} from "./components/ProjectNavigation";
import ProjectPage from "./pages/Project";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
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
      {
        path: "/create-project",
        element: <CreateProjectPage />,
        action: createProjectAction,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectNavigation />,
        loader: projectLoader,
        id: "project",
        children: [
          {
            path: "details",
            element: <ProjectPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
