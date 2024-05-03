import { FC } from "react";
import { NavLink } from "react-router-dom";

const NavbarLink: FC<{ to: string; text: string }> = ({ text, to }) => {
  return (
    <li className="nav-item">
      <NavLink
        className={(props: { isActive: boolean }) => {
          return `nav-link ps-3 ${
            props.isActive ? "fw-semibold bg-light" : "fw-normal"
          }`;
        }}
        to={to}
        end={true}
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavbarLink;
