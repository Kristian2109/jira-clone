import { useEffect, useState } from "react";
import FloatingInput from "../components/generic/FloatingInput";
import { Footer } from "../components/generic/Footer";
import { HomeHeader } from "../components/home/HomeHeader";
import UserInput from "../components/user/UserInput";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_URL, BASE_API_URL } from "../constants";
import axios, { AxiosRequestConfig } from "axios";
import { UserFields } from "../types/forms";

const UserPage = () => {
  //   const { fields, setFields } = useState<UserFields>({
  //     id: -1,
  //     name: "",
  //     email: "",
  //     displayName: "",
  //     dateOfBirth: new Date(),
  //     createdAt: new Date(),
  //     role: "",
  //     organization: "",
  //     position: "",
  //   });

  const navigate = useNavigate();
  let elements;

  async function fetchDataFromAccount() {
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate(BASE_API_URL);
      return;
    }
    console.log(jwtToken);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(ACCOUNT_URL, config);
      const resData = await response.data;
      console.log(resData.data.user);
      const fields: UserFields = resData.data.user;
      elements = Object.entries(fields).map((entry) => {
        return (
          <UserInput
            inputId={entry[0]}
            type="text"
            label={entry[0]}
            value={String(entry[1])}
          />
        );
      });
      return elements;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container-fluid p-0">
      <HomeHeader />
      <div className="w-50 my-4 mx-auto">
        <h3 className="text-center mb-4">About you</h3>
        <div className="border rounded border-2 p-2">
          <form>
            {elements}
            <button className="btn btn-primary btn-sm">Save</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
