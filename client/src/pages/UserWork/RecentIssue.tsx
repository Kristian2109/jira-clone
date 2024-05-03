import { FC } from "react";
import { Issue } from "../../types/project";
import { formatDate } from "../../utils/date";

const RecentIssue: FC<{ issue: Issue }> = ({ issue }) => {
  const formattedDate = formatDate(issue.createdAt);

  return (
    <tr>
      <td>{issue.summary}</td>
      <td>{issue.issueType.name}</td>
      <td>{issue.issueType.project.name}</td>
      <td>{issue.isCompleted ? "Yes" : "No"}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default RecentIssue;
