import axios from "axios";
import { GOOGLE_AUTH_CALLBACK_URL } from "../constants";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../utils/auth";
import { AuthContext } from "../store/auth-context";

const Callback = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const { setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function saveGoogleDataToServer() {
      try {
        const response = await axios.get(GOOGLE_AUTH_CALLBACK_URL, {
          params: queryParameters,
        });

        const resPayload = await response.data;
        if (resPayload) {
          setToken(resPayload.data?.token);
        }
        if (response.status === 200) {
          setAuthenticated();
          navigate("/account");
        }
      } catch (error) {
        console.error("Error while saving Google data", error);
      }
    }

    saveGoogleDataToServer();
  }, [navigate, queryParameters, setAuthenticated]);

  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
};

export default Callback;
