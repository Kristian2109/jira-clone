import { redirect } from "react-router";
import GenericForm from "../../components/generic/GenericForm";
import FloatingInput from "../../components/generic/FloatingInput";
import FloatingTextarea from "../../components/generic/FloatingTexarea";
import { CreateProject, ProjectType } from "../../types/project";
import { createBoard, createProject } from "../../utils/requests";

const CreateProjectPage = () => {
  return (
    <GenericForm
      action="/create-project"
      method="POST"
      id="create-project-form"
    >
      <h1>Create Project</h1>
      <FloatingInput
        columnSize={6}
        label="Project Name"
        name="name"
        type="text"
        placeholder="Test Project"
        required
      />
      <FloatingTextarea
        columnSize={6}
        label="Description"
        name="description"
        placeholder="Test Project"
        required
      />
      <FloatingInput
        columnSize={6}
        label="Key"
        name="key"
        placeholder="IN"
        type="text"
        required
      />
      <div className="col col-12">
        <button className="btn btn-primary btn-lg mt-4" type="submit">
          Create
        </button>
      </div>
    </GenericForm>
  );
};

export default CreateProjectPage;

export const createProjectAction = async (args: {
  params: any;
  request: Request;
}) => {
  const formData = await args.request.formData();
  const projectToCreate = Object.fromEntries(
    formData.entries()
  ) as CreateProject;

  const project = (await createProject(projectToCreate)) as ProjectType;
  await createBoard(project.id, {
    name: `Board of ${project.name}`,
    description: "Description of " + project.name,
  });
  return redirect(`/projects/${project.id}/details`);
};
