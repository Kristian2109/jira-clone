import axios from "axios";
import { GOOGLE_AUTH_CALLBACK_URL } from "../constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const Callback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    saveGoogleDataToServer();
  }, []);

  async function saveGoogleDataToServer() {
    try {
      const queryParameters = new URLSearchParams(window.location.search);

      console.log("Query parameters: ", queryParameters);

      const response = await axios.get(GOOGLE_AUTH_CALLBACK_URL, {
        params: queryParameters,
      });

      const resPayload = await response.data;
      if (resPayload) {
        setToken(resPayload.data?.token);
      }

      console.log(resPayload);

      if (response.status === 200) {
        navigate("/account");
      }
    } catch (error) {
      console.error("Error while saving Google data", error);
    }
  }

  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
};

export default Callback;
