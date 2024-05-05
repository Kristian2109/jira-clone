import { Params, useLoaderData, useRouteLoaderData } from "react-router";
import "./index.css";
import { fetchProjectIssues } from "../../utils/requests";
import { Issue, ProjectType } from "../../types/project";
import ProjectIssueRow from "./ProjectIssueRow";
import { Link } from "react-router-dom";

const IssuesPage = () => {
  const issues = useLoaderData() as Issue[];
  const project = useRouteLoaderData("project") as ProjectType;

  const backlogIssues = issues.filter((issue) => issue.boardColumn);

  return (
    <div className="m-3 text-start">
      <div className="d-flex justify-content-between mb-3">
        <h3>Project Issues</h3>
        <div>
          <Link
            className="btn btn-primary"
            to={`/projects/${project.id}/create-issue`}
          >
            Create Issue
          </Link>
        </div>
      </div>
      <div className="scrollable-issues">
        <table className="table" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Summary</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {backlogIssues.map((issue: Issue) => {
              return <ProjectIssueRow key={issue.id} issue={issue} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesPage;

export const projectIssuesLoader = ({ params }: { params: Params }) => {
  console.log("loaded issues");
  const projectId = Number(params.projectId);

  if (!projectId) {
    throw new Error("Invalid project ID");
  }

  return fetchProjectIssues(projectId);
};
