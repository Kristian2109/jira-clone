import { Params, useLoaderData } from "react-router";
import { fetchProject } from "../../utils/requests";
import { ProjectWithAllData } from "../../types/project";
import SidebarLayout from "./ProjectSidebarLayout/Sidebar";

const ProjectNavigation = () => {
  const project = useLoaderData() as ProjectWithAllData;
  const firstProjectIssue = project.issueTypes[0];

  const links = [
    {
      to: "details",
      text: "Details",
    },
    {
      to: "board",
      text: "Board",
    },
    {
      to: `/projects/${project.id}/issueTypes/${
        firstProjectIssue ? firstProjectIssue.id : ""
      }`,
      text: "Issue Types",
    },
    {
      to: `/project/${project.id}/issues`,
      text: "Issues",
    },
  ];

  return <SidebarLayout links={links} />;
};

export default ProjectNavigation;

export async function projectLoader({ params }: { params: Params }) {
  if (!params.projectId) {
    throw new Error("No projectId parameter for route /projects/:projectId");
  }
  const projectId = Number(params.projectId);
  if (!projectId) {
    throw new Error("Invalid project id. Project Id should be number");
  }

  return fetchProject(projectId);
}
