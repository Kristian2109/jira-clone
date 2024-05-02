import axios from "axios";
import { AuthOptionsContainer } from "./AuthOptionsContainer";
import { LOGIN_URL } from "../../constants";
import { setToken } from "../../utils/auth";
import { redirect } from "react-router-dom";
import HomeJiraImage from "./HomeJiraImage";
import LoginModal from "./LoginModal";

const Home = () => {
  return (
    <div className="container home-content">
      <h1 className="my-4">
        The best platform to manage you teams work according to agile
        methodologies
      </h1>
      <div className="row">
        <HomeJiraImage />
        <div className="auth-container col-lg-6 col-md-12 border rounded">
          <AuthOptionsContainer />
          <LoginModal />
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function loginAction(args: { params: any; request: Request }) {
  const data = await args.request.formData();
  const toSend = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await axios.post(LOGIN_URL, toSend);

  if (response.status >= 399) {
    const errorMessage = (await response.data).error;
    throw new Error(errorMessage);
  }
  const responseData = await response.data;
  const jwtToken = responseData.data?.jsonWebToken;
  if (!jwtToken) {
    console.log("No token!");
  }

  const element = document.getElementById("loginForm");

  setToken(jwtToken);
  return redirect("/account");
}
