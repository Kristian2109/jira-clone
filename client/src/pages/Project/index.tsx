import { useParams } from "react-router";

const ProjectPage = () => {
  const { projectId } = useParams();
  return <div>Project Page - {projectId}</div>;
};

export default ProjectPage;
