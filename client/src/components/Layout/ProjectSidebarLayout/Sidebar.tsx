import { Outlet, useLoaderData, useOutlet } from "react-router";
import { ProjectWithAllData } from "../../../types/project";
import { FC, ReactNode } from "react";
import NavbarLink from "./NavbarLink";
import "./Sidebar.css";

const SidebarLayout: FC<{
  links: { text: string; to: string }[];
  children?: ReactNode;
}> = ({ links, children }) => {
  const projectWithMembers = useLoaderData() as ProjectWithAllData;
  let projectDisplayName = projectWithMembers.name.slice(0, 20);
  if (projectWithMembers.name.length > 20) {
    projectDisplayName += "...";
  }

  return (
    <div className="d-flex mx-6 justify-content-between" id="sidebar-container">
      <div className="border-end border-2 sidebar text-start">
        <div className="mt-3 mb-5 ps-3">
          <h5>{projectDisplayName}</h5>
        </div>
        <ul className="navbar-nav flex-column">
          {links.map((link) => {
            return <NavbarLink to={link.to} text={link.text} />;
          })}
        </ul>
        {children}
      </div>
      <div className="flex-fill mx-2 me-5">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
