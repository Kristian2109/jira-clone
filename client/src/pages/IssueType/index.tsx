import { Params, useLoaderData } from "react-router";
import { fetchIssueType } from "../../utils/requests";
import { IssueTypeWithFields } from "../../types/project";
import IssueFieldsTable from "./IssueFieldsTable";

const IssueTypePage = () => {
  const issueType = useLoaderData() as IssueTypeWithFields;

  return (
    <div className="text-start p-4">
      <h3>{issueType.name}</h3>
      <p>{issueType.description}</p>
      <IssueFieldsTable issueFields={issueType.issueFields} />
    </div>
  );
};

export default IssueTypePage;

export const issueTypeLoader = async ({ params }: { params: Params }) => {
  const issueTypeId = Number(params.issueTypeId);
  const projectId = Number(params.projectId);

  if (!issueTypeId || !projectId) {
    throw new Error("Invalid issueTypeId or projectId params for the route");
  }

  return fetchIssueType(issueTypeId, projectId);
};
