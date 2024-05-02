import { useEffect, useState } from "react";
import { getToken, isAuthenticated, logout } from "../../utils/auth";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";

export const JiraNavbar = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  useEffect(() => {
    setIsAuth(getToken() !== undefined);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light">
      <div className="container-fluid">
        <span className="navbar-brand">Jira Work Management</span>
        {isAuth && <NavbarLinks logoutHandler={handleLogout} />}
      </div>
    </nav>
  );
};
