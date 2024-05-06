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
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import SelectFilter from "./SelectFilter";
import IssuesTable from "./IssuesTable";
import { IssuesHeader } from "./IssuesHeader";

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
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="m-3 text-start">
      <IssuesHeader projectId={project.id} />
      <div className="d-flex justify-content-between mb-2">
        <h5>Board Issues</h5>
        <div id="issue-filters" className="row">
          <SelectFilter
            onChangeFilter={handleChangeFilter}
            columns={boardColumnsToSelect}
            name="boardColumnId"
            label="Board Column"
            additionalFilterOptions={[{ value: -1, text: "Not Assigned" }]}
          />
          <SelectFilter
            onChangeFilter={handleChangeFilter}
            columns={issueTypesToSelect}
            name="issueTypeId"
            label="Issue Type"
          />
        </div>
      </div>
      <IssuesTable issues={filteredIssues} />
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
