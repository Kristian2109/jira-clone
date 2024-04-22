import axios from "axios";
import jiraImg from "../../assets/Jira.jpg";
import { AuthOptionsContainer } from "./AuthOptionsContainer";
import { LOGIN_URL } from "../../constants";
import { setToken } from "../../utils/auth";
import { Form, redirect } from "react-router-dom";

const Home = () => {
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
          <div
            className="modal fade w-100"
            id="loginForm"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content px-4">
                <div className="modal-header">
                  <h1 className="modal-title fs-3" id="staticBackdropLabel">
                    Login
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form method="POST">
                  <div className="modal-body">
                    <div className="form-floating mb-3">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
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

  if (response.status > 399) {
    const errorMessage = (await response.data).error;
    throw new Error(errorMessage);
  }
  const responseData = await response.data;
  console.log(responseData);
  const jwtToken = responseData.data?.jsonWebToken;
  if (!jwtToken) {
    console.log("No token!");
  }
  setToken(jwtToken);
  return redirect("/account");
}
