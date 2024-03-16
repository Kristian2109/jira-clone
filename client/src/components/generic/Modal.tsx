export const Modal = (props: {
  title: string;
  content: any;
  buttonContent: string;
  modalId: string;
  submitHandler: React.MouseEventHandler<HTMLButtonElement>;
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
          <div className="modal-body">{props.content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.submitHandler}
            >
              {props.buttonContent}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
