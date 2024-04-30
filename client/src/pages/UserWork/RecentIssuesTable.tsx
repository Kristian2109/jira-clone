import { FC } from "react";
import { Issue } from "../../types/project";
import RecentIssue from "./RecentIssue";

const RecentIssuesTable: FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <table className="table" style={{ fontSize: "0.85rem" }}>
      <thead>
        <tr>
          <th scope="col">Summary</th>
          <th>Type</th>
          <th>Project Name</th>
          <th>Is Completed</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue: Issue) => {
          return <RecentIssue key={issue.id} issue={issue} />;
        })}
      </tbody>
    </table>
  );
};

export default RecentIssuesTable;
