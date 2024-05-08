import { AuthOptionsContainer } from "./AuthOptionsContainer";
import { setToken } from "../../utils/auth";
import { redirect, useActionData } from "react-router-dom";
import HomeJiraImage from "./HomeJiraImage";
import LoginModal from "./LoginModal";
import { login } from "../../utils/requests";
import ErrorPopUp from "../../components/generic/ErrorPopUp";

const Home = () => {
  const errorContext = useActionData() as { error: Error } | undefined;
  console.log(errorContext);
  return (
    <div className="container home-content mb-5">
      {errorContext && (
        <ErrorPopUp key={Math.random()} message={errorContext.error.message} />
      )}
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
  const email = data.get("email")?.toString();
  const password = data.get("password")?.toString();

  if (!email || !password) {
    return {
      error: Error("No email or password when login"),
    };
  }

  try {
    const jwtToken = await login({
      email,
      password,
    });
    setToken(jwtToken);
    return redirect("/account");
  } catch (error) {
    return { error };
  }
}
