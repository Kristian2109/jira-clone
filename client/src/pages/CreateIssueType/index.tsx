import { redirect, useRouteLoaderData } from "react-router";
import GenericForm from "../../components/generic/GenericForm";
import { ProjectWithAllData } from "../../types/project";
import FloatingInput from "../../components/generic/FloatingInput";
import FloatingTextarea from "../../components/generic/FloatingTexarea";
import { createIssueType } from "../../utils/requests";

const CreateIssueTypePage = () => {
  const project = useRouteLoaderData("issueTypes") as ProjectWithAllData;

  return (
    <GenericForm
      method="POST"
      action={`/projects/${project.id}/issueTypes/create`}
      id="create-issue-form"
    >
      <h5 className="mb-4">Create Issue Type for {project.name}</h5>
      <FloatingInput
        name="name"
        label="Issue Name"
        placeholder="Test Issue"
        columnSize={6}
        type="text"
        additionalInputClasses="my-4"
      />
      <FloatingTextarea
        name="description"
        label="Description"
        placeholder="Test Description"
        columnSize={6}
      />
      <div className="col col-12">
        <button className="btn btn-primary btn-lg mt-4" type="submit">
          + Create
        </button>
      </div>
    </GenericForm>
  );
};

export default CreateIssueTypePage;

export const createIssueTypeAction = async (args: {
  params: any;
  request: Request;
}) => {
  const formData = await args.request.formData();
  const projectToCreate = Object.fromEntries(formData.entries()) as {
    name: string;
    description: string;
  };

  const projectId = Number(args.params.projectId);

  if (!projectId) {
    throw new Error("No projectId");
  }

  const issueId = await createIssueType(projectToCreate, projectId);
  return redirect(`/projects/${projectId}/issueTypes/${issueId}`);
};
