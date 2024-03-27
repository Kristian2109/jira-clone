import { ReactNode } from "react";
import { JiraNavbar } from "./Navbar/JiraNavbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = (props: { children?: ReactNode }) => {
  return (
    <div className="container-fluid p-0">
      <JiraNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
