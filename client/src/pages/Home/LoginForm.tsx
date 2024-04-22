import { Form } from "react-router-dom";
import FloatingInput from "../../components/generic/FloatingInput";

const LoginForm = () => {
  return (
    <Form method="POST">
      <div className="modal-body">
        <FloatingInput
          columnSize={12}
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          additionalInputClasses="my-3"
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
