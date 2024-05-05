import { Modal } from "../../components/generic/Modal";
import NormalInput from "../../components/generic/NormalInput";
import PrimaryButton from "../../components/generic/PrimaryButton";
import GenericForm from "../../components/generic/GenericForm";

const CreateColumnModal = () => {
  return (
    <Modal title="Add Column">
      <GenericForm action="." method="POST" id="add-column-modal">
        <NormalInput inputId="name" label="Name" type="text" />
        <NormalInput inputId="description" label="Description" type="text" />
        <NormalInput
          inputId="orderNumber"
          label="Order in the Board"
          type="number"
        />
        <div className="text-end">
          <PrimaryButton data-bs-dismiss="modal">+ Create</PrimaryButton>
          <PrimaryButton
            data-bs-dismiss="modal"
            additionalClasses="btn-secondary"
            type="button"
          >
            Close
          </PrimaryButton>
        </div>
      </GenericForm>
    </Modal>
  );
};

export default CreateColumnModal;
