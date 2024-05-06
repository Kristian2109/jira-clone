import { FC, useRef } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import { Issue, ProjectWithAllData } from "../../types/project";

const IssueTypeSelect: FC<{ issue: Issue }> = ({ issue }) => {
  const project = useRouteLoaderData("project") as ProjectWithAllData;

  const columnsToSelect = project.board.boardColumns.filter((column) => {
    return column.id !== issue.boardColumn?.id;
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Form method="PATCH">
      <input hidden name="issueId" defaultValue={issue.id} type="text" />
      <select
        className="form-select select-issue-type"
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
  );
};

export default IssueTypeSelect;
