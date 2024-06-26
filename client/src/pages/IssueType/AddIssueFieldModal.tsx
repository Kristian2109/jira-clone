import { FC, useRef } from "react";
import { Modal } from "../../components/generic/Modal";
import NormalInputWithRef from "../../components/generic/NormalInputWithRef";
import NormalTextarea from "../../components/generic/NormalTextarea";
import { IssueFieldCreate } from "../../types/project";

const selectStyles = {
  fontSize: "0.9rem",
};

const AddIssueFieldModal: FC<{
  onAddIssueField: (issueField: IssueFieldCreate) => void;
}> = ({ onAddIssueField }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    formRef.current!.reset();
  };

  const handleAddIssueField = () => {
    onAddIssueField({
      name: nameRef.current!.value,
      description: descriptionRef.current!.value,
      dataType: typeRef.current!.value,
      orderNumber: Number(orderRef.current!.value) ?? 100,
    });
    resetForm();
  };

  return (
    <Modal title="Add Issue Field">
      <div className="modal-body">
        <form className="px-4" ref={formRef}>
          <NormalInputWithRef
            label="Field Name"
            inputId="name"
            type="text"
            ref={nameRef}
          />
          <NormalTextarea
            label="Description"
            inputId="description"
            ref={descriptionRef}
          />
          <div className="my-2">
            <label className="fw-semibold" style={selectStyles}>
              Field Type
            </label>
            <select
              className="form-select"
              aria-label="Select Field Type"
              style={selectStyles}
              ref={typeRef}
              defaultValue="string"
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="person">person</option>
            </select>
          </div>
          <NormalInputWithRef
            label="Order in the Issue"
            inputId="orderNumber"
            type="number"
            ref={orderRef}
          />
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={resetForm}
        >
          Dismiss
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddIssueField}
          data-bs-dismiss="modal"
        >
          Add Field
        </button>
      </div>
    </Modal>
  );
};

export default AddIssueFieldModal;
