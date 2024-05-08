import LoginForm from "./LoginForm";
import { Modal } from "../../components/generic/Modal";

const LoginModal = () => {
  return (
    <Modal title="Login">
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
