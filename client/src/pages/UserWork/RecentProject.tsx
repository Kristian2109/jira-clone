import { FC } from "react";
import { ProjectType } from "../../types/project";

const RecentProject: FC<{ project: ProjectType }> = ({ project }) => {
  let formattedDescription = project.description.slice(0, 50);
  if (project.description.length > 50) {
    formattedDescription += "...";
  }

  return (
    <div className="card shadow-sm mx-2" style={{ width: "10rem" }}>
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
    </div>
  );
};

export default RecentProject;
