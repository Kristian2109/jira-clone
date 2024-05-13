import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { logout } from "../../utils/auth";

const NavbarLinks = () => {
  const { setUnauthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUnauthenticated();
  };

  return (
    <div>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex justify-content-end"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <NavLink
            className={(props: { isActive: boolean }) => {
              return `nav-link fw-semibold  + ${
                props.isActive ? "fw-bold" : ""
              }`;
            }}
            aria-current="page"
            to="/account"
            end={true}
          >
            Profile
          </NavLink>
          <NavLink className="nav-link fw-semibold" to="/your-work">
            Your Work
          </NavLink>
          <Link className="nav-link fw-semibold" to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLinks;
