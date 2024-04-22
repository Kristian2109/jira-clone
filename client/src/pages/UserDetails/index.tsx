import { useEffect, useState } from "react";
import UserInput from "./UserInput";
import { redirect, useNavigate } from "react-router-dom";
import {
  ACCOUNT_URL,
  RESPONSE_TO_DISPLAY_ATTRIBUTES,
  JWT_TOKEN_KEY,
} from "../../constants";
import axios, { AxiosRequestConfig } from "axios";
import { UserFields } from "../../types/forms";
import { getToken } from "../../utils/auth";

const UserDetailsPage = () => {
  const [fields, setFields] = useState<UserFields>({
    id: -1,
    name: "",
    email: "",
    displayName: "",
    dateOfBirth: new Date(),
    createdAt: new Date(),
    role: "",
    organization: "",
    position: "",
  });

  useEffect(() => {
    console.log("Data fetched!");
    fetchDataFromAccount();
  }, []);

  function handleChangeField(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFields((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  async function fetchDataFromAccount() {
    const jwtToken = sessionStorage.getItem(JWT_TOKEN_KEY);
    console.log(jwtToken);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(ACCOUNT_URL, config);
      const resData = await response.data;
      setFields(resData.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  const elements = Object.entries(fields)
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
        key: fieldDisplayProperties.order,
        component: (
          <UserInput
            inputId={entry[0]}
            type={fieldDisplayProperties.type}
            label={fieldDisplayProperties.fieldDisplayName}
            value={value}
            disabled={fieldDisplayProperties.readonly}
            key={fieldDisplayProperties.order}
            valueHandler={handleChangeField}
          />
        ),
      };
    })
    .sort((a, b) => {
      if (!a || !b) {
        return 0;
      }
      return a.key - b.key;
    })
    .map((item) => {
      if (!item) {
        return <></>;
      }
      return item.component;
    });

  return (
    <div className="w-50 my-4 mx-auto">
      <h3 className="text-center mb-4">About you</h3>
      <div className="border rounded border-2 p-2">
        <form>
          {elements}
          <button className="btn btn-primary btn-md w-25 my-2">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;

export const authLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/");
  }
  return null;
};
