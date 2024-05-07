import { FC, useContext } from "react";
import { Issue } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { DragContext } from "../../store/drag-context";

const BoardIssue: FC<{ issue: Issue }> = ({ issue }) => {
  const redirect = useNavigate();
  const { activateIssue, deactivateIssue } = useContext(DragContext);

  const redirectToIssue = () => {
    redirect(`../issues/${issue.id}`, {
      relative: "path",
    });
  };

  return (
    <div
      className="rounded column-issue p-2 my-1"
      onClick={redirectToIssue}
      draggable
      onDragStart={() => activateIssue(issue.id)}
      onDragEnd={deactivateIssue}
    >
      <p className="issue-title">{issue.summary}</p>
      <p className="issue-type">{issue.issueType.name}</p>
      <p className="issue-key">{issue.key}</p>
    </div>
  );
};

export default BoardIssue;
