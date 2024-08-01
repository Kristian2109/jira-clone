import { Params, useLoaderData, useNavigate, useParams } from "react-router";
import { createIssueField, fetchIssueType } from "../../utils/requests";
import { IssueFieldCreate } from "../../types/project";
import { IssueTypeWithFields } from "../../types/issues";
import IssueFieldsTable from "./IssueFieldsTable";
import "./index.css";
import ErrorPopUp from "../../components/generic/ErrorPopUp";
import { useState } from "react";

const IssueTypePage = () => {
  const issueType = useLoaderData() as IssueTypeWithFields;
  const params = useParams();
  const navigate = useNavigate();
  const [responseOnIssueTemplateSave, setResponseOnIssueTemplateSave] =
    useState<string | null>(null);

  const handleAddFieldsToServer = (fields: IssueFieldCreate[]) => {
    fields.forEach(async (field) => {
      const projectId = Number(params.projectId);
      if (!projectId) {
        throw new Error("False project id in creating an issue field");
      }
      await createIssueField(issueType.id, projectId, field);
    });
    setResponseOnIssueTemplateSave("OK");
    navigate(".", { replace: true });
  };

  return (
    <div className="text-start p-4">
      <h3>{issueType.name}</h3>
      <p>{issueType.description}</p>
      {responseOnIssueTemplateSave && (
        <ErrorPopUp message="Issue Template Updated" />
      )}
      <IssueFieldsTable
        issueFields={issueType.issueFields}
        onSaveFields={handleAddFieldsToServer}
      />
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
