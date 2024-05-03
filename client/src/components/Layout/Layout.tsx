import { JiraNavbar } from "../Navbar/JiraNavbar";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { AuthContextProvider } from "../../store/auth-context";

const Layout = () => {
  return (
    <div className="container-fluid p-0">
      <AuthContextProvider>
        <JiraNavbar />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </div>
  );
};

export default Layout;
