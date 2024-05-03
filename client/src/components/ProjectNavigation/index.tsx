import { Outlet, Params, useLoaderData } from "react-router";
import "./ProjectNavigation.css";
import NavbarLink from "./NavbarLink";
import { fetchProject } from "../../utils/requests";
import { ProjectWithMembers } from "../../types/project";

const ProjectNavigation = () => {
  const projectWithMembers = useLoaderData() as ProjectWithMembers;
  let projectDisplayName = projectWithMembers.name.slice(0, 20);
  if (projectWithMembers.name.length > 20) {
    projectDisplayName += "...";
  }

  return (
    <div className="d-flex mx-6 justify-content-between" id="sidebar-container">
      <div className="border-end border-2 sidebar text-start">
        <div className="mt-2 mb-4 ps-3">
          <h5>{projectDisplayName}</h5>
        </div>
        <ul className="navbar-nav flex-column">
          <NavbarLink to="details" text="Details" />
          <NavbarLink to="board" text="Board" />
          <NavbarLink to="issues/types" text="Issue Types" />
          <NavbarLink to="issues" text="Issues" />
        </ul>
      </div>
      <div className="flex-fill mx-2 me-5">
        <Outlet />
      </div>
    </div>
  );
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
