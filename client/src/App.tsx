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
            index: true,
            element: <ProjectPage />,
            path: "details",
            action: projectAction,
          },
          {
            path: "issues",
            element: <IssuesPage />,
            loader: projectIssuesLoader,
            shouldRevalidate: () => {
              return true;
            },
            action: issuesAction,
          },
          {
            path: "create-issue",
            element: <CreateIssuePage />,
            action: createIssueAction,
          },
          {
            path: "issues/:issueId",
            element: <IssuePage />,
            loader: issueLoader,
            action: issueAction,
          },
          {
            path: "board",
            element: <BoardPage />,
            loader: boardLoader,
            action: boardAction,
          },
        ],
      },
      {
        path: "/projects/:projectId/issueTypes",
        element: <IssuesNavigation />,
        id: "issueTypes",
        loader: projectLoader,
        children: [
          {
            path: ":issueTypeId",
            element: <IssueTypePage />,
            loader: issueTypeLoader,
          },
          {
            path: "create",
            element: <CreateIssueTypePage />,
            action: createIssueTypeAction,
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
