import React, { useState } from "react";
import { LoginFormType } from "../../types/forms";
import axios from "axios";
import { Modal } from "../generic/Modal";
import { ACCOUNT_URL, JWT_TOKEN_KEY, LOGIN_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";

export const LoginModal = () => {
  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevState: LoginFormType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  async function submitLoginForm(event: any) {
    try {
      const response = await axios.post(LOGIN_URL, form);
      const responseData = await response.data;
      const jwtToken = responseData.data?.jsonWebToken;
      if (!jwtToken) {
        console.log("No token!");
      }
      setToken(jwtToken);
      navigate("/account");
      console.log("User logged successfully: ", response.data);
    } catch (error) {
      console.error("Error while sending the form", error);
    }
  }

  const loginFormElement = (
    <form id="login-form">
      <div className="form-floating mb-3">
        <input
          name="email"
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={handleChange}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          name="password"
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
    </form>
  );

  return (
    <Modal
      title="Login"
      content={loginFormElement}
      buttonContent="Login"
      modalId="loginForm"
      submitHandler={submitLoginForm}
    />
  );
};
