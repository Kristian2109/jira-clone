import React, { useState } from "react";
import { LoginFormType } from "../../types/forms";
import axios from "axios";
import { Modal } from "../generic/Modal";
import { LOGIN_URL } from "../../constants";

export const LoginModal = () => {
  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

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
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, form);
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
