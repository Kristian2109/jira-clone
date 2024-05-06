import { Params, redirect } from "react-router";
import AddMemberModal from "./AddMemberModal";
import ProjectDetails from "./ProjectDetails";
import ProjectMembersContainer from "./ProjectMembersContainer";
import "./index.css";
import { addMember, getProjectIdFromParams } from "../../utils/requests";

const ProjectPage = () => {
  return (
    <div className="mt-3 text-start">
      <ProjectDetails />
      <ProjectMembersContainer />
      <AddMemberModal />
    </div>
  );
};

export default ProjectPage;

export const projectAction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const projectId = getProjectIdFromParams({ params });
  const formData = await request.formData();

  const userEmail = formData.get("userEmail");
  if (!userEmail) {
    throw new Error("No member email provided!");
  }

  await addMember(projectId, userEmail.toString());
  return redirect(".");
};
