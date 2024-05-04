import { Params, useLoaderData, useNavigate, useParams } from "react-router";
import { createIssueField, fetchIssueType } from "../../utils/requests";
import { IssueFieldCreate, IssueTypeWithFields } from "../../types/project";
import IssueFieldsTable from "./IssueFieldsTable";
import "./index.css";

const IssueTypePage = () => {
  const issueType = useLoaderData() as IssueTypeWithFields;
  const params = useParams();
  const setNavigate = useNavigate();

  const handleAddFieldsToServer = (fields: IssueFieldCreate[]) => {
    fields.forEach((field) => {
      const projectId = Number(params.projectId);
      if (!projectId) {
        throw new Error("False project id in creating an issue field");
      }
      createIssueField(issueType.id, projectId, field);
    });
    setNavigate(0);
  };

  return (
    <div className="text-start p-4">
      <h3>{issueType.name}</h3>
      <p>{issueType.description}</p>
      <IssueFieldsTable
        issueFields={issueType.issueFields}
        onSaveFields={handleAddFieldsToServer}
      />
    </div>
  );
};

export default IssueTypePage;

export const issueTypeLoader = async ({ params }: { params: Params }) => {
  console.log("loader");
  const issueTypeId = Number(params.issueTypeId);
  const projectId = Number(params.projectId);

  if (!issueTypeId || !projectId) {
    throw new Error("Invalid issueTypeId or projectId params for the route");
  }

  return fetchIssueType(issueTypeId, projectId);
};
