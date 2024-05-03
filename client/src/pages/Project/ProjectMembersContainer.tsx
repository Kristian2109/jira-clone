import { useRouteLoaderData } from "react-router";
import { ProjectMember, ProjectWithMembers } from "../../types/project";
import ProjectMemberRow from "./ProjectMemberRow";

const ProjectMembersContainer = () => {
  const project = useRouteLoaderData("project") as ProjectWithMembers;

  return (
    <div className="px-4">
      <h5>Project Members</h5>
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
