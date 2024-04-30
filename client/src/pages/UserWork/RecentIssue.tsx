import { FC } from "react";
import { Issue } from "../../types/project";

const dateFormatter = Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const RecentIssue: FC<{ issue: Issue }> = ({ issue }) => {
  const date = new Date(issue.createdAt);
  const formattedDate = dateFormatter.format(date).replace(/\//g, "-");

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
