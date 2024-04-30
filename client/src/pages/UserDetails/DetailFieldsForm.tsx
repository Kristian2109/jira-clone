import { Form } from "react-router-dom";
import DetailField from "./DetailField";
import { FC, useState } from "react";

const DetailFieldsForm: FC<{ currentFields: any[] }> = (props) => {
  const [fields, setFields] = useState<any[]>(props.currentFields);

  function handleChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFields((prevState: any[]) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i]?.displayProperties?.fieldDisplayName === id) {
          prevState[i].value = value;
          return [...prevState];
        }
      }
      return prevState;
    });
  }

  const inputFields = fields.map((item) => {
    if (!item) {
      return <></>;
    }
    return (
      <DetailField
        inputId={item.displayProperties.fieldDisplayName}
        type={item.displayProperties.type}
        label={item.displayProperties.fieldDisplayName}
        value={item.value}
        disabled={item.displayProperties.readonly}
        key={item.displayProperties.order}
        valueHandler={handleChangeField}
      />
    );
  });

  return (
    <Form>
      {inputFields}
      <button className="btn btn-primary btn-md w-25 my-2">Save</button>
    </Form>
  );
};

export default DetailFieldsForm;
