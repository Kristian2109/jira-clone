import { FC, useState } from "react";
import { IssueField, IssueFieldCreate } from "../../types/project";
import IssueFieldRow from "./IssueFieldRow";
import AddIssueFieldModal from "./AddIssueFieldModal";

const IssueFieldsTable: FC<{ issueFields: IssueField[] }> = ({
  issueFields,
}) => {
  const [newIssueFields, setNewIssueFields] = useState<IssueFieldCreate[]>([]);

  const handleAddIssueField = (issueField: IssueFieldCreate) => {
    setNewIssueFields((prev) => [...prev, issueField]);
  };

  const table = (
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
        {newIssueFields.map((issueField: IssueFieldCreate) => {
          return (
            <IssueFieldRow key={issueField.name} issueField={issueField} />
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="my-4">
      <AddIssueFieldModal onAddIssueField={handleAddIssueField} />
      <h5>Fields</h5>
      <hr></hr>
      {(issueFields && issueFields.length > 0) || newIssueFields.length > 0 ? (
        table
      ) : (
        <p>No fields yet, create some</p>
      )}
      <div className="text-end mt-4">
        <button
          className="btn btn-primary mx-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Field
        </button>
        <button className="btn btn-secondary mx-2">Save</button>
      </div>
    </div>
  );
};

export default IssueFieldsTable;
