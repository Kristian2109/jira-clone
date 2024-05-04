import { Params, redirect, useRouteLoaderData } from "react-router";
import GenericForm from "../../components/generic/GenericForm";
import { IssueField, ProjectWithAllData } from "../../types/project";
import { useRef, useState } from "react";
import { createIssue, fetchIssueType } from "../../utils/requests";
import "./index.css";
import NormalInput from "../../components/generic/NormalInput";
import { FieldContentCreate, IssueCreate } from "../../types/issues";

const cssLabelStyles = { fontSize: "0.9rem" };

const CreateIssuePage = () => {
  const project = useRouteLoaderData("project") as ProjectWithAllData;
  const selectRef = useRef<HTMLSelectElement>(null);

  const [issueFields, setIssueFields] = useState<IssueField[]>([]);

  const handleSelectIssueType = async () => {
    const issueTypeId = Number(selectRef.current!.value);

    const issueType = await fetchIssueType(issueTypeId, project.id);

    setIssueFields(issueType.issueFields);
  };

  return (
    <div>
      <GenericForm
        action={`/projects/${project.id}/create-issue`}
        method="POST"
        id="create-issue-form"
        additionalClasses="text-start"
      >
        <NormalInput
          label="Summary"
          inputId="summary"
          type="text"
          key="summary"
        />
        <div className="mb-3">
          <label className="fw-semibold" style={cssLabelStyles}>
            Field Type
          </label>
          <select
            onChange={handleSelectIssueType}
            className="form-select"
            aria-label="Select Field Type"
            defaultValue="string"
            name="issueType"
            ref={selectRef}
          >
            {project.issueTypes.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="scrollable-fields mb-3">
          {issueFields.map((field) => {
            const fieldType = field.dataType === "number" ? "number" : "text";
            return (
              <NormalInput
                label={field.name}
                inputId={`${field.id}`}
                type={fieldType}
                key={field.id}
              />
            );
          })}
        </div>
        <div className="text-center">
          <button className="btn btn-primary">+ Create</button>
        </div>
      </GenericForm>
    </div>
  );
};

export default CreateIssuePage;

export const createIssueAction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const projectId = Number(params.projectId);
  console.log("Issue created");

  if (!projectId) {
    throw new Error("Invalid project ID");
  }

  const formData = await request.formData();
  const issueFields: FieldContentCreate[] = [];
  formData.forEach((value, key) => {
    const fieldId = Number(key);

    if (fieldId) {
      issueFields.push({
        content: value.toString(),
        issueFieldId: fieldId,
      });
    }
  });

  const issue: IssueCreate = {
    summary: formData.get("summary")?.toString() ?? "No Summary",
    issueTypeId: Number(formData.get("issueType")),
    fields: issueFields,
  };

  await createIssue(issue, projectId);
  return redirect(`/projects/${projectId}/issues`);
};
