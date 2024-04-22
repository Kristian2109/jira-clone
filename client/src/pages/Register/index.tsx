import axios from "axios";
import { REGISTER_URL } from "../../constants";
import { RegisterFormType } from "../../types/forms";
import { useState } from "react";
import FloatingInput from "../../components/generic/FloatingInput";
import { Form, redirect, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";

const RegisterFormContainer = () => {
  return (
    <Form
      action="/register"
      method="POST"
      className="row container mx-auto w-75 my-4 justify-content-center px-4"
      id="login-form"
    >
      <h2>Register</h2>
      <FloatingInput
        name="email"
        type="email"
        columnSize={8}
        label="Email Address"
        placeholder="example@gmail.com"
      />
      <FloatingInput
        name="firstName"
        type="text"
        columnSize={5}
        label="First Name"
        placeholder="Peter"
      />
      <FloatingInput
        name="lastName"
        type="text"
        columnSize={5}
        label="Last Name"
        placeholder="Petrov"
      />
      <FloatingInput
        name="password"
        type="password"
        columnSize={5}
        label="Password"
        placeholder="Password"
      />
      <FloatingInput
        name="repeatedPassword"
        type="password"
        columnSize={5}
        label="Repeated Password"
        placeholder="Repeat Password"
      />
      <FloatingInput
        name="displayName"
        type="text"
        columnSize={5}
        label="Display Name"
        placeholder="Pesho"
      />
      <FloatingInput
        name="birthday"
        type="date"
        columnSize={5}
        label="Birthday"
        placeholder="Birthday"
      />
      <FloatingInput
        name="company"
        type="text"
        columnSize={5}
        label="Company"
        placeholder="Bosch"
      />
      <FloatingInput
        name="position"
        type="text"
        columnSize={5}
        label="Position"
        placeholder="Software Engineer"
      />
      <div className="col-12">
        <button className="btn btn-primary btn-lg mt-4" type="submit">
          Register
        </button>
      </div>
    </Form>
  );
};

export default RegisterFormContainer;

export async function action(args: { params: any; request: Request }) {
  const formData = await args.request.formData();
  const payload = {
    name: `${formData.get("firstName")} ${formData.get("lastName")}`,
    email: formData.get("email"),
    password: formData.get("password"),
    dateOfBirth: formData.get("birthday"),
    displayName: formData.get("displayName"),
  };
  console.log(JSON.stringify(payload));

  const response = await fetch(REGISTER_URL, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData?.error);
  }

  setToken(responseData.data?.jsonWebToken);
  return redirect("/account");
}
