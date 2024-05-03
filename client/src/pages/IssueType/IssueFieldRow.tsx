import { FC } from "react";
import { IssueField } from "../../types/project";

const IssueFieldRow: FC<{ issueField: IssueField }> = ({ issueField }) => {
  return (
    <tr>
      <td>{issueField.name}</td>
      <td>{issueField.description}</td>
      <td>{issueField.dataType}</td>
    </tr>
  );
};

export default IssueFieldRow;
