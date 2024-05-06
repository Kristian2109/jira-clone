import { useRouteLoaderData } from "react-router";
import { Modal } from "../../components/generic/Modal";
import { ProjectWithAllData } from "../../types/project";
import NormalInput from "../../components/generic/NormalInput";
import PrimaryButton from "../../components/generic/PrimaryButton";
import GenericForm from "../../components/generic/GenericForm";
import { useRef } from "react";

const AddMemberModal = () => {
  const project = useRouteLoaderData("project") as ProjectWithAllData;
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    formRef.current!.reset();
  };

  return (
    <Modal title={`Add People to ${project.name}`}>
      <GenericForm action="." method="POST" id="add-member-form" ref={formRef}>
        <NormalInput inputId="userEmail" label="Email" type="email" />
        <div className="text-end">
          <PrimaryButton data-bs-dismiss="modal">+ Add</PrimaryButton>
          <PrimaryButton
            data-bs-dismiss="modal"
            additionalClasses="btn-secondary"
            type="button"
            handler={resetForm}
          >
            Close
          </PrimaryButton>
        </div>
      </GenericForm>
    </Modal>
  );
};

export default AddMemberModal;
