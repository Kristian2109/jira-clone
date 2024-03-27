import jiraImg from "../../Jira.jpg";
import { AuthOptionsContainer } from "./AuthOptionsContainer";
import { LoginModal } from "./LoginModal";

export const HomeContent = () => {
  return (
    <div className="container home-content">
      <h1 className="my-4">
        The best platform to manage you teams work according to agile
        methodologies
      </h1>
      <div className="row">
        <div className="home-image col-lg-6 col-md-12">
          <img
            className="img-thumbnail img-fluid"
            src={jiraImg}
            alt="Jira imag"
          />
        </div>
        <div className="auth-container col-lg-6 col-md-12 border rounded">
          <AuthOptionsContainer />
          <LoginModal />
        </div>
      </div>
    </div>
  );
};
