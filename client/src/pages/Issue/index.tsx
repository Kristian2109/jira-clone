import { FC } from "react";
import "./index.css";
import { Params, redirect, useLoaderData } from "react-router";
import { FieldContent, IssueUpdate, IssueWithFields } from "../../types/issues";
import { extractParam, fetchIssue, updateIssue } from "../../utils/requests";
import { formatDate } from "../../utils/date";
import { Form } from "react-router-dom";
import PrimaryButton from "../../components/generic/PrimaryButton";

const IssuePage: FC = () => {
  const issue = useLoaderData() as IssueWithFields;
  const formattedDate = formatDate(issue.createdAt);
  const issueSummarySize = Math.min(issue.summary.length / 2, 40);

  return (
    <Form className="mt-2 mx-3 text-start" action="." method="PATCH">
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
          defaultValue={issue.summary}
        />
      </div>
      <p className="mb-1">
        {issue.issueType.project?.name} &rarr; {issue.issueType.name} &rarr;{" "}
        <span className="fw-semibold issue-page-key">{issue.key}</span>
      </p>
      <p>
        Created at {formattedDate} by {issue.createdBy.displayName}
      </p>
      <div>
        <div className="d-flex justify-content-between mb-2">
          <h5>Fields</h5>
          <PrimaryButton>Save Issue</PrimaryButton>
        </div>
        <div id="fields-container" className="px-3 py-2">
          {issue.fields.map((field) => {
            const fieldType =
              field.issueField.dataType === "number" ? "number" : "text";
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
          })}
        </div>
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
