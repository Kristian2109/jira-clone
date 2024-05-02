import { useContext } from "react";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";
import { AuthContext } from "../../store/auth-context";

export const JiraNavbar = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light">
      <div className="container-fluid">
        <span className="navbar-brand">Jira Work Management</span>
        {isAuth && <NavbarLinks />}
      </div>
    </nav>
  );
};
