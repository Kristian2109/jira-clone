import React, { useState } from "react";
import { LoginFormType } from "../../types/forms";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        form
      );
      console.log("User logged successfully: ", response.data);
    } catch (error) {
      console.error("Error while sending the form", error);
    }
  }

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content px-4">
          <div className="modal-header">
            <h1 className="modal-title fs-3" id="staticBackdropLabel">
              Login
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitLoginForm}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
