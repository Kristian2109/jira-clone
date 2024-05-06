import { FC, useRef } from "react";
import { Issue, ProjectWithAllData } from "../../types/project";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import IssueTypeSelect from "./IssueTypeSelect";

const selectClasses = {
  padding: "0.1rem 1.5rem 0.1rem 0.75rem",
  fontSize: "0.8rem",
};

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
