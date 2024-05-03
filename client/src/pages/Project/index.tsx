import ProjectDetails from "./ProjectDetails";
import ProjectMembersContainer from "./ProjectMembersContainer";
import "./index.css";

const ProjectPage = () => {
  return (
    <div className="mt-3 text-start">
      <ProjectDetails />
      <ProjectMembersContainer />
    </div>
  );
};

export default ProjectPage;
