import {
  Params,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router";
import "./index.css";
import {
  addIssueToBoard,
  fetchProjectIssues,
  getProjectIdFromParams,
} from "../../utils/requests";
import { Issue, ProjectType } from "../../types/project";
import ProjectIssueRow from "./ProjectIssueRow";
import { Link } from "react-router-dom";

const IssuesPage = () => {
  const issues = useLoaderData() as Issue[];
  const project = useRouteLoaderData("project") as ProjectType;

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
        <h5>Board Issues</h5>
        <table className="table" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Summary</th>
              <th>Type</th>
              <th>Board Column</th>
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
  console.log("loaded issues");
  const projectId = Number(params.projectId);

  if (!projectId) {
    throw new Error("Invalid project ID");
  }

  return fetchProjectIssues(projectId);
};

export const issuesAction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const projectId = getProjectIdFromParams({ params });
  const formData = await request.formData();

  const columnId = Number(formData.get("columnId"));
  const issueId = Number(formData.get("issueId"));

  if (!columnId || !issueId) {
    throw new Error("No column Id in params");
  }

  await addIssueToBoard({ projectId, boardColumnId: columnId, issueId });
  return redirect(".");
};
