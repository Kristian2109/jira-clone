import { Form } from "react-router-dom";

export const LoginModal = (props: {
  title: string;
  buttonContent: string;
  modalId: string;
}) => {
  return (
    <div
      className="modal fade w-100"
      id={props.modalId}
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
              {props.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form>
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
              <button type="submit" className="btn btn-primary">
                {props.buttonContent}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
