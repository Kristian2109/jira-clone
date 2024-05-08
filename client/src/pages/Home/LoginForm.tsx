import FloatingInput from "../../components/generic/FloatingInput";
import { FC, useContext, useRef } from "react";
import GenericForm from "../../components/generic/GenericForm";
import { AuthContext } from "../../store/auth-context";

const LoginForm: FC = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogin = () => {
    setAuthenticated();
    modalRef.current!.click();
  };

  return (
    <GenericForm
      method="POST"
      action="."
      id="login-form"
      additionalClasses="w-100"
      onSubmit={handleLogin}
    >
      <div className="modal-body">
        <FloatingInput
          columnSize={12}
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          additionalInputClasses="my-3"
          required={true}
        />
        <FloatingInput
          columnSize={12}
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          additionalInputClasses="my-3"
        />
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          aria-label="Close"
          ref={modalRef}
        >
          Close
        </button>
      </div>
    </GenericForm>
  );
};

export default LoginForm;
