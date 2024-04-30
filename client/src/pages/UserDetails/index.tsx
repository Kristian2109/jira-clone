import { redirect, useLoaderData } from "react-router-dom";
import { ACCOUNT_URL, RESPONSE_TO_DISPLAY_ATTRIBUTES } from "../../constants";
import axios, { AxiosRequestConfig } from "axios";
import { UserFields } from "../../types/forms";
import { getToken } from "../../utils/auth";
import DetailFieldsForm from "./DetailFieldsForm";

const UserDetailsPage = () => {
  const loadedData = useLoaderData() as { fields: UserFields };
  const fieldsWithAttributes = transformResponseFieldsToFieldsWithProperties(
    loadedData.fields
  );

  return (
    <div className="w-50 my-4 mx-auto">
      <h3 className="text-center mb-4">About you</h3>
      <div className="border rounded border-2 p-2">
        <DetailFieldsForm currentFields={fieldsWithAttributes} />
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
    fields,
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
