import { useRouteLoaderData } from "react-router";
import { ProjectWithMembers } from "../../types/project";
import { formatDate } from "../../utils/date";

const ProjectDetails = () => {
  const project = useRouteLoaderData("project") as ProjectWithMembers;

  return (
    <div className="px-4 mb-3">
      <h5>Details</h5>
      <hr></hr>
      <div>
        <div className="row project-detail">
          <p className="col col-2 fw-semibold">Name: </p>
          <p className="col col-10">{project.name}</p>
        </div>
        <div className="row project-detail">
          <p className="col col-2 fw-semibold">Description: </p>
          <p className="col col-10">{project.description}</p>
        </div>
        <div className="row project-detail">
          <p className="col col-2 fw-semibold">Key: </p>
          <p className="col col-10">{project.key}</p>
        </div>
        <div className="row project-detail">
          <p className="col col-2 fw-semibold">Created At: </p>
          <p className="col col-10">{formatDate(project.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
