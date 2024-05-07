import { FC } from "react";
import { IssueFieldContent } from "../../types/issues";

const IssueFieldContentInput: FC<{ field: IssueFieldContent }> = ({
  field,
}) => {
  const fieldType = field.issueField.dataType === "number" ? "number" : "text";
  const inputSize = Math.min(field.content.length / 2, 40);

  return (
    <div className="small-font issue-field" key={field.id}>
      <label htmlFor={`${field.id}`} className="fw-semibold">
        {field.issueField.name}{" "}
        <span className="issue-field-data-type">
          ({field.issueField.dataType})
        </span>
      </label>
      <input
        type={fieldType}
        className="form-control"
        style={{ width: `${inputSize}rem` }}
        id={`${field.id}`}
        name={`${field.issueField.id}`}
        defaultValue={field.content}
      />
    </div>
  );
};

export default IssueFieldContentInput;
