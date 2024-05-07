import { FC } from "react";

const IssueSummaryInput: FC<{ summary: string }> = ({ summary }) => {
  const issueSummarySize = Math.min(summary.length / 2, 40);
  return (
    <div className="issue-field">
      <label htmlFor="summary" className="fw-semibold">
        Summary
      </label>
      <input
        type="text"
        className="form-control border-2 fs-5"
        style={{ width: `${issueSummarySize}rem` }}
        id="summary"
        name="summary"
        defaultValue={summary}
      />
    </div>
  );
};

export default IssueSummaryInput;
