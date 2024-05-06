import { FC } from "react";
import { Link } from "react-router-dom";

export const IssuesHeader: FC<{ projectId: number }> = ({ projectId }) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <h3>Project Issues</h3>
      <div>
        <Link
          className="btn btn-primary"
          to={`/projects/${projectId}/create-issue`}
        >
          Create Issue
        </Link>
      </div>
    </div>
  );
};
