import React from "react";
import { JiraNavbar } from "../components/generic/Navbar/JiraNavbar";
import { Footer } from "../components/generic/Footer";
import RegisterFormContainer from "../components/register/RegisterFormContainer";

const RegisterPage = () => {
  return (
    <div className="container-fluid p-0">
      <JiraNavbar />
      <RegisterFormContainer />
      <Footer />
    </div>
  );
};

export default RegisterPage;
