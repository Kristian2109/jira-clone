export const AuthOptionsContainer = () => {
  return (
    <div className="row">
      <h3 className="mt-4">Start working!</h3>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg col-10 mx-auto my-4"
      >
        Authenticate with Google
      </button>
      <div className="d-flex justify-content-evenly mb-4">
        <button
          type="button"
          className="btn btn-primary btn-lg w-25"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Login
        </button>
        <button type="button" className="btn btn-primary btn-lg w-25">
          Register
        </button>
      </div>
    </div>
  );
};
