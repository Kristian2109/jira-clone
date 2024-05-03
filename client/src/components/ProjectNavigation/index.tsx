import { Outlet } from "react-router";
import "./ProjectNavigation.css";
import NavbarLink from "./NavbarLink";

const ProjectNavigation = () => {
  return (
    <div className="d-flex mx-6 justify-content-between" id="sidebar-container">
      <div className="border-end border-2 sidebar text-start">
        <div className="mt-2 mb-4 ps-3">
          <h3>Sidebar</h3>
        </div>
        <ul className="navbar-nav flex-column">
          <NavbarLink to="." text="Details" />
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
