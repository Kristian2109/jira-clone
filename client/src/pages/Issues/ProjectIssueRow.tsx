import { FC } from "react";
import { Issue } from "../../types/project";

const ProjectIssueRow: FC<{ issue: Issue }> = ({ issue }) => {
  return (
    <tr>
      <td>{issue.key}</td>
      <td>{issue.summary}</td>
      <td>{issue.issueType.name}</td>
    </tr>
  );
};

export default ProjectIssueRow;
