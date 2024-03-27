import React, { useState } from "react";
import { LoginFormType } from "../../types/forms";
import axios, { AxiosError } from "axios";
import { Modal } from "../generic/Modal";
import { LOGIN_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";

export const LoginModal = () => {
  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const invalidFeedback = <p className="alert alert-danger">{error}</p>;

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

      if (response.status !== 200) {
        const errorMessage = (await response.data).error;
        setError(errorMessage);
        return;
      }
      const responseData = await response.data;
      const jwtToken = responseData.data?.jsonWebToken;
      if (!jwtToken) {
        console.log("No token!");
      }
      setToken(jwtToken);
      navigate("/account");
      console.log("User logged successfully: ", response.data);
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "An error occurred");
      } else {
        setError("An error occurred");
      }
      console.error("Error while sending the form", error);
    }
  }

  const loginFormElement = (
    <form id="login-form">
      {error && invalidFeedback}
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
