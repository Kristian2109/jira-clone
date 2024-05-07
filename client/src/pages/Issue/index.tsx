import { FC } from "react";
import "./index.css";
import { Params, redirect, useLoaderData } from "react-router";
import { FieldContent, IssueUpdate, IssueWithFields } from "../../types/issues";
import { extractParam, fetchIssue, updateIssue } from "../../utils/requests";
import { Form } from "react-router-dom";
import PrimaryButton from "../../components/generic/PrimaryButton";
import IssueFieldContentInput from "./IssueFieldContentInput";
import IssueSummaryInput from "./IssueSummaryInput";
import IssueDetails from "./IssueDetails";

const IssuePage: FC = () => {
  const issue = useLoaderData() as IssueWithFields;

  return (
    <Form className="mt-2 mx-3 text-start" action="." method="PATCH">
      <IssueSummaryInput summary={issue.summary} />
      <IssueDetails issue={issue} />
      <div className="d-flex justify-content-between mb-2">
        <h5>Fields</h5>
        <PrimaryButton>Save Issue</PrimaryButton>
      </div>
      <div id="fields-container" className="px-3 py-2">
        {issue.fields.map((field) => {
          return <IssueFieldContentInput field={field} key={field.id} />;
        })}
      </div>
    </Form>
  );
};

export default IssuePage;

export const issueLoader = async ({ params }: { params: Params }) => {
  const projectId = Number(params.projectId);
  const issueId = Number(params.issueId);

  if (!projectId || !issueId) {
    throw new Error("Invalid project id or issue id in the url");
  }

  const issue = await fetchIssue(projectId, issueId);
  return issue;
};

export const issueAction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const formData = await request.formData();
  const issueFields: FieldContent[] = [];

  formData.forEach((value, key) => {
    const fieldId = Number(key);

    if (fieldId) {
      issueFields.push({
        content: value.toString(),
        issueFieldId: fieldId,
      });
    }
  });

  const summary = formData.get("summary");

  if (!summary) {
    throw new Error("Summary needed to update the issue");
  }

  const issue: IssueUpdate = {
    summary: summary.toString(),
    fields: issueFields,
  };

  const projectId = extractParam({ params, param: "projectId" });
  const issueId = extractParam({ params, param: "issueId" });

  await updateIssue({ projectId, issueId, issue });
  return redirect(".");
};
