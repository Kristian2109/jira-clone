import { FC } from "react";
import { IssueField } from "../../types/project";
import IssueFieldRow from "./IssueFieldRow";

const IssueFieldsTable: FC<{ issueFields: IssueField[] }> = ({
  issueFields,
}) => {
  return (
    <div className="my-4">
      <h5>Fields</h5>
      <hr></hr>
      <table className="table" style={{ fontSize: "0.85rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {issueFields
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((issueField: IssueField) => {
              return (
                <IssueFieldRow key={issueField.id} issueField={issueField} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IssueFieldsTable;
