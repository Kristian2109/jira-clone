import { useLoaderData } from "react-router";
import { ProjectWithAllData } from "../types/project";
import SidebarLayout from "./Layout/ProjectLayout/Sidebar";

const IssuesNavigation = () => {
  const project = useLoaderData() as ProjectWithAllData;

  const links = project.issueTypes.map((issueType) => {
    return {
      to: `/projects/${project.id}/issueTypes/${issueType.id}`,
      text: issueType.name,
    };
  });

  return <SidebarLayout links={links} />;
};

export default IssuesNavigation;
