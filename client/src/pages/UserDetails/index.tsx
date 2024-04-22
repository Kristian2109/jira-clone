import { useState } from "react";
import UserInput from "./UserInput";
import { redirect, useLoaderData } from "react-router-dom";
import { ACCOUNT_URL, RESPONSE_TO_DISPLAY_ATTRIBUTES } from "../../constants";
import axios, { AxiosRequestConfig } from "axios";
import { UserFields } from "../../types/forms";
import { getToken } from "../../utils/auth";

const UserDetailsPage = () => {
  const loadedFieldsPropertiesAndValues = useLoaderData() as { fields: any[] };
  const [fields, setFields] = useState<any[]>(
    loadedFieldsPropertiesAndValues.fields
  );

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
      <UserInput
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
    <div className="w-50 my-4 mx-auto">
      <h3 className="text-center mb-4">About you</h3>
      <div className="border rounded border-2 p-2">
        <form>
          {inputFields}
          <button className="btn btn-primary btn-md w-25 my-2">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;

export async function loader() {
  const jwtToken = getToken();

  if (!jwtToken) {
    return redirect("/");
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const response = await axios.get(ACCOUNT_URL, config);
  const resData = await response.data;
  if (response.status >= 400) {
    throw new Error(resData.error);
  }

  const fields: UserFields = resData.data.user;

  return {
    fields: transformResponseFieldsToFieldsWithProperties(fields),
  };
}

function transformResponseFieldsToFieldsWithProperties(fields: UserFields) {
  return Object.entries(fields)
    .map((entry) => {
      const fieldDisplayProperties = RESPONSE_TO_DISPLAY_ATTRIBUTES.get(
        entry[0]
      );
      if (!fieldDisplayProperties) {
        return null;
      }

      let value = entry[1].toString();
      if (fieldDisplayProperties.type === "date") {
        value = value.substring(0, 10);
      }

      return {
        value: value,
        displayProperties: fieldDisplayProperties,
      };
    })
    .sort((a, b) => {
      if (!a || !b) {
        return 0;
      }
      return a.displayProperties.order - b.displayProperties.order;
    });
}
