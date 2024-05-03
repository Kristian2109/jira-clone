import { FC } from "react";
import { ProjectType } from "../../types/project";
import { Link } from "react-router-dom";

const RecentProject: FC<{ project: ProjectType }> = ({ project }) => {
  let formattedDescription = project.description.slice(0, 30);
  if (project.description.length > 30) {
    formattedDescription += "...";
  }

  return (
    <Link
      className="card shadow-sm mx-2"
      style={{ width: "10rem" }}
      to={`/projects/${project.id}/details`}
    >
      <div className="card-body">
        <h5 className="card-title fs-6" style={{ fontSize: "0.9rem" }}>
          {project.name}
        </h5>
        <h6
          className="card-subtitle mb-2 text-body-secondary"
          style={{ fontSize: "0.85rem" }}
        >
          {project.key}
        </h6>
        <p className="card-text" style={{ fontSize: "0.75rem" }}>
          {formattedDescription}
        </p>
        {/* <a href="#" class="card-link">
          Card link
        </a>
        <a href="#" class="card-link">
          Another link
        </a> */}
      </div>
    </Link>
  );
};

export default RecentProject;
