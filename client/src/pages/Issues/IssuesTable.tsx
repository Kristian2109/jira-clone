import { FC } from "react";
import { Issue } from "../../types/project";
import ProjectIssueRow from "./ProjectIssueRow";

const IssuesTable: FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
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
          {issues.map((issue: Issue) => {
            return <ProjectIssueRow key={issue.id} issue={issue} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
