import { FC } from "react";
import { Issue } from "../../types/project";
import { Link } from "react-router-dom";
import IssueTypeSelect from "./IssueTypeSelect";

const ProjectIssueRow: FC<{ issue: Issue }> = ({ issue }) => {
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
        <IssueTypeSelect issue={issue} />
      </td>
    </tr>
  );
};

export default ProjectIssueRow;
