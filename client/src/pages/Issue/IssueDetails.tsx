import { FC } from "react";
import { formatDate } from "../../utils/date";
import { IssueWithFields } from "../../types/issues";

const IssueDetails: FC<{ issue: IssueWithFields }> = ({ issue }) => {
  const formattedDate = formatDate(issue.createdAt);
  return (
    <div>
      <p className="mb-1">
        {issue.issueType.project?.name} &rarr; {issue.issueType.name} &rarr;{" "}
        <span className="fw-semibold issue-page-key">{issue.key}</span>
      </p>
      <p>
        Created at {formattedDate} by {issue.createdBy.displayName}
      </p>
    </div>
  );
};

export default IssueDetails;
