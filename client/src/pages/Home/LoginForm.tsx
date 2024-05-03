import { Form } from "react-router-dom";
import FloatingInput from "../../components/generic/FloatingInput";
import { FC } from "react";

const LoginForm: FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <Form method="POST" onSubmit={onLogin}>
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
      </div>
    </Form>
  );
};

export default LoginForm;
