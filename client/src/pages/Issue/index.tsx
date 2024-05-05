import { FC } from "react";
import "./index.css";
import { Params, useLoaderData } from "react-router";
import { IssueWithFields } from "../../types/issues";
import { fetchIssue } from "../../utils/requests";

const IssuePage: FC = () => {
  const issue = useLoaderData() as IssueWithFields;
  return (
    <div className="mt-4 mx-3">
      <h4>{issue.summary}</h4>
      <p>Key: {issue.key}</p>
      <p>Type: {issue.issueType.name}</p>
      <div>
        <h5>Fields</h5>
        {issue.fields.map((field) => {
          return (
            <div key={field.id} className="row text-start my-2">
              <div className="col col-3">{field.issueField.name}</div>
              <div className="col col-6">{field.content}</div>
            </div>
          );
        })}
      </div>
    </div>
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
