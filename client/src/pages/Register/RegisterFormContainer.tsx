import axios from "axios";
import { REGISTER_URL } from "../../constants";
import { RegisterFormType } from "../../types/forms";
import { useState } from "react";
import FloatingInput from "../../components/generic/FloatingInput";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";

const RegisterFormContainer = () => {
  const [formContent, setFormContent] = useState<RegisterFormType>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatedPassword: "",
    displayName: "",
    birthday: new Date(),
    company: "",
    position: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContent((prevState: RegisterFormType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  async function submitRegisterForm(event: any) {
    event.preventDefault();
    try {
      const toSend = {
        name: `${formContent.firstName} ${formContent.lastName}`,
        email: formContent.email,
        password: formContent.password,
        birthday: formContent.birthday,
        displayName: formContent.displayName,
      };
      const response = await axios.post(REGISTER_URL, toSend);
      const responseData = await response.data;
      setToken(responseData.data?.jsonWebToken);
      navigate("/account");
      console.log("User logged successfully: ", response.data);
    } catch (error) {
      console.error("Error while sending the form", error);
    }
  }
  return (
    <form
      className="row container mx-auto w-75 my-4 justify-content-center px-4"
      id="login-form"
    >
      <h2>Register</h2>
      <FloatingInput
        name="email"
        type="email"
        columnSize={8}
        changeHandler={handleChange}
        label="Email Address"
        placeholder="example@gmail.com"
      />
      <FloatingInput
        name="firstName"
        type="text"
        columnSize={5}
        changeHandler={handleChange}
        label="First Name"
        placeholder="Peter"
      />
      <FloatingInput
        name="lastName"
        type="text"
        columnSize={5}
        changeHandler={handleChange}
        label="Last Name"
        placeholder="Petrov"
      />
      <FloatingInput
        name="password"
        type="password"
        columnSize={5}
        changeHandler={handleChange}
        label="Password"
        placeholder="Password"
      />
      <FloatingInput
        name="repeatedPassword"
        type="password"
        columnSize={5}
        changeHandler={handleChange}
        label="Repeated Password"
        placeholder="Repeat Password"
      />
      <FloatingInput
        name="displayName"
        type="text"
        columnSize={5}
        changeHandler={handleChange}
        label="Display Name"
        placeholder="Pesho"
      />
      <FloatingInput
        name="birthday"
        type="date"
        columnSize={5}
        changeHandler={handleChange}
        label="Birthday"
        placeholder="Birthday"
      />
      <FloatingInput
        name="company"
        type="text"
        columnSize={5}
        changeHandler={handleChange}
        label="Company"
        placeholder="Bosch"
      />
      <FloatingInput
        name="position"
        type="text"
        columnSize={5}
        changeHandler={handleChange}
        label="Position"
        placeholder="Software Engineer"
      />
      <div className="col-12">
        <button
          className="btn btn-primary btn-lg mt-4"
          onClick={submitRegisterForm}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterFormContainer;
