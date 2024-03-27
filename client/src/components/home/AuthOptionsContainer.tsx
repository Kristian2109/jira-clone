import { Link } from "react-router-dom";
import { GOOGLE_AUTH_URL } from "../../constants";

export const AuthOptionsContainer = () => {
  async function authenticateWithGoogle() {
    try {
      const response = await fetch(GOOGLE_AUTH_URL);
      const resPayload = await response.json();

      const redirectUrl = resPayload?.data?.authUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("Error while authenticating with Google", error);
    }
  }
  return (
    <div className="row">
      <h3 className="mt-4">Start working!</h3>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg col-10 mx-auto my-4"
        onClick={authenticateWithGoogle}
      >
        Authenticate with Google
      </button>
      <div className="d-flex justify-content-evenly mb-4">
        <button
          type="button"
          className="btn btn-primary btn-lg w-25"
          data-bs-toggle="modal"
          data-bs-target="#loginForm"
        >
          Login
        </button>
        <Link
          type="button"
          className="btn btn-primary btn-lg w-25"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
