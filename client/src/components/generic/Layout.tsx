import { ReactNode } from "react";
import { JiraNavbar } from "./Navbar/JiraNavbar";
import { Footer } from "./Footer";

const Layout = (props: { children?: ReactNode }) => {
  return (
    <div className="container-fluid p-0">
      <JiraNavbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
