import { JiraNavbar } from "../Navbar/JiraNavbar";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="container-fluid p-0">
      <JiraNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
