import { Params, useLoaderData } from "react-router";
import "./index.css";
import { fetchProjectIssues } from "../../utils/requests";
import { Issue } from "../../types/project";
import ProjectIssueRow from "./ProjectIssueRow";

const IssuesPage = () => {
  const issues = useLoaderData() as Issue[];
  return (
    <div className="m-3 text-start">
      <div className="d-flex justify-content-between mb-3">
        <h3>Project Issues</h3>
        <div>
          <button className="btn btn-primary">Create Issue</button>
        </div>
      </div>
      <div className="scrollable">
        <table className="table table-hover" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Summary</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue: Issue) => {
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
  const projectId = Number(params.projectId);

  if (!projectId) {
    throw new Error("Invalid project ID");
  }

  return fetchProjectIssues(projectId);
};
