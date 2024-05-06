import { FC, useRef } from "react";
import { Issue, ProjectWithAllData } from "../../types/project";
import { Form, Link, useRouteLoaderData } from "react-router-dom";

const selectClasses = {
  padding: "0.1rem 1.5rem 0.1rem 0.75rem",
  fontSize: "0.8rem",
};

const ProjectIssueRow: FC<{ issue: Issue }> = ({ issue }) => {
  const project = useRouteLoaderData("project") as ProjectWithAllData;
  const btnRef = useRef<HTMLButtonElement>(null);

  const columnsToSelect = project.board.boardColumns.filter((column) => {
    return column.id !== issue.boardColumn?.id;
  });

  return (
    <tr>
      <td>
        <Link
          to={`${issue.id}`}
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          {issue.key}
        </Link>
      </td>
      <td>{issue.summary}</td>
      <td>{issue.issueType.name}</td>
      <td>
        <Form method="PATCH">
          <input hidden name="issueId" defaultValue={issue.id} type="text" />
          <select
            className="form-select"
            style={selectClasses}
            name="columnId"
            onChange={() => {
              btnRef.current!.click();
            }}
          >
            <option defaultValue={issue.boardColumn ? issue.boardColumn.id : 0}>
              {issue.boardColumn ? issue.boardColumn.name : "Not assigned"}
            </option>
            {columnsToSelect.map((column) => {
              return (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              );
            })}
          </select>
          <button hidden ref={btnRef}>
            Submit
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default ProjectIssueRow;
