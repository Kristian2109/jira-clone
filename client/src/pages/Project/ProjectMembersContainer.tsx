import { useRouteLoaderData } from "react-router";
import { ProjectMember, ProjectWithAllData } from "../../types/project";
import ProjectMemberRow from "./ProjectMemberRow";
import PrimaryButton from "../../components/generic/PrimaryButton";

const ProjectMembersContainer = () => {
  const project = useRouteLoaderData("project") as ProjectWithAllData;

  return (
    <div className="px-4">
      <div className="d-flex justify-content-between">
        <h5>Project Members</h5>
        <PrimaryButton
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Members
        </PrimaryButton>
      </div>
      <hr></hr>
      <table className="table" style={{ fontSize: "0.85rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {project.members.map((member: ProjectMember) => {
            return <ProjectMemberRow key={member.id} member={member} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectMembersContainer;
