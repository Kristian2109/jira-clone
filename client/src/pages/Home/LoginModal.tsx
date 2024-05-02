import { useRef } from "react";
import LoginForm from "./LoginForm";

const LoginModal = () => {
  const modalRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    modalRef.current!.click();
  };

  // modalRef.current!.
  return (
    <div
      className="modal fade w-100"
      id="loginForm"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      // ref={modalRef}
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
              ref={modalRef}
            ></button>
          </div>
          <LoginForm onCloseModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
