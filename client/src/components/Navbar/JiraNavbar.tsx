import { useState } from "react";
import { isAuthenticated, logout } from "../../utils/auth";
import NavbarLinks from "./NavbarLinks";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const JiraNavbar = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Jira Work Management
        </a>
        {isAuth && <NavbarLinks logoutHandler={handleLogout} />}
      </div>
    </nav>
  );
};
