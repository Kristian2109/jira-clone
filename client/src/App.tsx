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
} from "./components/Layout/ProjectNavigation";
import ProjectPage, { projectAction } from "./pages/Project";
import IssuesNavigation from "./components/Layout/IssuesNavigation";
import IssueTypePage, { issueTypeLoader } from "./pages/IssueType";
import CreateIssueTypePage, {
  createIssueTypeAction,
} from "./pages/CreateIssueType";
import IssuesPage, { issuesAction, projectIssuesLoader } from "./pages/Issues";
import CreateIssuePage, { createIssueAction } from "./pages/CreateIssue";
import IssuePage, { issueAction, issueLoader } from "./pages/Issue";
import BoardPage, { boardAction, boardLoader } from "./pages/Board";

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
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterFormContainer />,
        action: registerAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/account",
        element: <UserDetailsPage />,
        loader: authLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/google/callback",
        element: <Callback />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/your-work",
        element: <WorkPage />,
        loader: workPageLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/create-project",
        element: <CreateProjectPage />,
        action: createProjectAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectNavigation />,
        errorElement: <ErrorPage />,
        loader: projectLoader,
        id: "project",
        children: [
          {
            index: true,
            element: <ProjectPage />,
            path: "details",
            action: projectAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "issues",
            element: <IssuesPage />,
            loader: projectIssuesLoader,
            errorElement: <ErrorPage />,
            shouldRevalidate: () => {
              return true;
            },
            action: issuesAction,
          },
          {
            path: "create-issue",
            element: <CreateIssuePage />,
            action: createIssueAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "issues/:issueId",
            element: <IssuePage />,
            loader: issueLoader,
            action: issueAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "board",
            element: <BoardPage />,
            loader: boardLoader,
            action: boardAction,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/projects/:projectId/issueTypes",
        element: <IssuesNavigation />,
        id: "issueTypes",
        loader: projectLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":issueTypeId",
            element: <IssueTypePage />,
            errorElement: <ErrorPage />,
            loader: issueTypeLoader,
          },
          {
            path: "create",
            element: <CreateIssueTypePage />,
            action: createIssueTypeAction,
            errorElement: <ErrorPage />,
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
