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
import { Issue, ProjectWithAllData } from "../../types/project";
import ProjectIssueRow from "./ProjectIssueRow";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const IssuesPage = () => {
  const issues = useLoaderData() as Issue[];
  const project = useRouteLoaderData("project") as ProjectWithAllData;
  const [filters, setFilters] = useState<{
    boardColumnId: number;
    issueTypeId: number;
  }>({
    boardColumnId: 0,
    issueTypeId: 0,
  });

  const filteredIssues = issues
    .filter(
      (issue) =>
        filters.boardColumnId === 0 ||
        filters.boardColumnId === issue.boardColumn?.id ||
        (filters.boardColumnId === -1 && !issue.boardColumn)
    )
    .filter(
      (issue) =>
        filters.issueTypeId === 0 || filters.issueTypeId === issue.issueType.id
    );

  const boardColumnsToSelect = project.board.boardColumns;
  const issueTypesToSelect = project.issueTypes;

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.name;
    const value = Number(event.target.value);
    console.log(key, value);
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

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
      <div className="d-flex justify-content-between mb-2">
        <h5>Board Issues</h5>
        <div id="issue-filters" className="row">
          <div className="col-auto small-font">
            <label htmlFor="select-board-column">Board Column</label>
            <select
              className="form-select select-issue-type"
              name="boardColumnId"
              onChange={handleChangeFilter}
              id="select-board-column"
            >
              <option value={0}>No Filter</option>
              <option value={-1}>Not Assigned</option>
              {boardColumnsToSelect.map((column) => {
                return (
                  <option key={column.id} value={column.id}>
                    {column.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-auto small-font">
            <label htmlFor="select-board-column">Issue Type</label>
            <select
              className="form-select select-issue-type"
              name="issueTypeId"
              onChange={handleChangeFilter}
            >
              <option value={0}>No Filter</option>
              {issueTypesToSelect.map((issueType) => {
                return (
                  <option key={issueType.id} value={issueType.id}>
                    {issueType.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="scrollable-issues pe-2">
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
            {filteredIssues.map((issue: Issue) => {
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
