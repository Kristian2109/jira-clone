import { Footer } from "../components/generic/Footer";
import { HomeContent } from "../components/home/HomeContent";
import { JiraNavbar } from "../components/generic/Navbar/JiraNavbar";
import { LoginModal } from "../components/home/LoginModal";
import "./Home.css";

export const Home = () => {
  return (
    <div className="container-fluid p-0">
      <JiraNavbar />
      <HomeContent />
      <LoginModal />
      <Footer />
    </div>
  );
};
