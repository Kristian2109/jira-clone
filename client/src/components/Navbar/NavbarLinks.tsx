import { Link, NavLink } from "react-router-dom";

const NavbarLinks = (props: { logoutHandler: any }) => {
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
                props.isActive ? "active" : ""
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
          <Link
            className="nav-link fw-semibold"
            to="/"
            onClick={props.logoutHandler}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLinks;
