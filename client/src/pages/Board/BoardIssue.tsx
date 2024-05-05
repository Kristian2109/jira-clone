import { FC } from "react";
import { Issue } from "../../types/project";
import { useNavigate } from "react-router-dom";

const BoardIssue: FC<{ issue: Issue }> = ({ issue }) => {
  const redirect = useNavigate();
  const redirectToIssue = () => {
    redirect(`../issues/${issue.id}`, {
      relative: "path",
    });
  };
  return (
    <div className="rounded column-issue p-2 my-1" onClick={redirectToIssue}>
      <p className="issue-title">{issue.summary}</p>
      <p className="issue-type">{issue.issueType.name}</p>
      <p className="issue-key">{issue.key}</p>
    </div>
  );
};

export default BoardIssue;
