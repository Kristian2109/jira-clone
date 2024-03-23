import { isAuthenticated } from "../../../utils/auth";
import NavbarLinks from "./NavbarLinks";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const JiraNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Jira Work Management
        </a>
        {isAuthenticated() && <NavbarLinks />}
      </div>
    </nav>
  );
};
