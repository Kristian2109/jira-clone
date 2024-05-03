import { useRouteLoaderData } from "react-router";
import { ProjectWithMembers } from "../../types/project";

const ProjectPage = () => {
  const project = useRouteLoaderData("project") as ProjectWithMembers;
  return <div className="mt-3">Project Page - {project.name}</div>;
};

export default ProjectPage;
