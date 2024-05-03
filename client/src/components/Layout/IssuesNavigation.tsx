import { useLoaderData } from "react-router";
import { ProjectWithAllData } from "../../types/project";
import SidebarLayout from "./ProjectSidebarLayout/Sidebar";
import { Link } from "react-router-dom";

const IssuesNavigation = () => {
  const project = useLoaderData() as ProjectWithAllData;

  const links = [
    {
      to: `/projects/${project.id}/details`,
      text: "Back to Details",
    },
  ];

  links.push(
    ...project.issueTypes.map((issueType) => {
      return {
        to: `/projects/${project.id}/issueTypes/${issueType.id}`,
        text: issueType.name,
      };
    })
  );

  return (
    <SidebarLayout links={links}>
      <div className="ps-3 mt-3">
        <Link
          to={`/projects/${project.id}/create-issueType`}
          className="btn btn-primary"
        >
          + Issue Type
        </Link>
      </div>
    </SidebarLayout>
  );
};

export default IssuesNavigation;
