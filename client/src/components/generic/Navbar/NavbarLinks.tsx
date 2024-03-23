import { Link } from "react-router-dom";
import { logout } from "../../../utils/auth";
import { MouseEventHandler } from "react";

const NavbarLinks = () => {
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
          <Link
            className="nav-link fw-semibold"
            aria-current="page"
            to="/account"
          >
            Profile
          </Link>
          <Link className="nav-link fw-semibold" to="/your-work ">
            Your Work
          </Link>
          <Link className="nav-link fw-semibold" to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLinks;
