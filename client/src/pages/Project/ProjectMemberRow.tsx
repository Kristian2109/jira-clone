import { FC } from "react";
import { ProjectMember } from "../../types/project";

const ProjectMemberRow: FC<{ member: ProjectMember }> = ({ member }) => {
  return (
    <tr>
      <td>{member.user.displayName}</td>
      <td>{member.user.email}</td>
      <td>{member.role}</td>
    </tr>
  );
};

export default ProjectMemberRow;
