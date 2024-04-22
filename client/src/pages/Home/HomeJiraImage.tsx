import jiraImg from "../../assets/Jira.jpg";

const HomeJiraImage = () => {
  return (
    <div className="home-image col-lg-6 col-md-12">
      <img className="img-thumbnail img-fluid" src={jiraImg} alt="Jira imag" />
    </div>
  );
};

export default HomeJiraImage;
