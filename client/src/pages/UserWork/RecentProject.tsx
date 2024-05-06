import { FC } from "react";
import { ProjectType } from "../../types/project";
import { useNavigate } from "react-router";

const RecentProject: FC<{ project: ProjectType }> = ({ project }) => {
  const navigate = useNavigate();

  const redirectToProjectPage = () => {
    navigate(`/projects/${project.id}`);
  };

  let formattedDescription = project.description.slice(0, 50);
  if (project.description.length > 50) {
    formattedDescription += "...";
  }

  return (
    <tr onClick={redirectToProjectPage}>
      <td style={{ fontSize: "0.9rem" }} className="fw-medium">
        {project.name}
      </td>
      <td style={{ fontSize: "0.85rem" }} className="fw-medium">
        {project.key}
      </td>
      <td className="card-text" style={{ fontSize: "0.75rem" }}>
        {formattedDescription}
      </td>
    </tr>
  );
};

export default RecentProject;
