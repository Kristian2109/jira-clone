import React from "react";
import { HomeHeader } from "../components/home/HomeHeader";
import { Footer } from "../components/generic/Footer";
import RegisterFormContainer from "../components/register/RegisterFormContainer";

const RegisterPage = () => {
  return (
    <div className="container-fluid p-0">
      <HomeHeader />
      <RegisterFormContainer />
      <Footer />
    </div>
  );
};

export default RegisterPage;
