import { FC, ReactNode } from "react";
import { Form } from "react-router-dom";
import { HTMLFormMethod } from "../types/forms";

const GenericForm: FC<{
  children: ReactNode;
  action: string;
  method: HTMLFormMethod;
  id: string;
}> = ({ children, ...props }) => {
  return (
    <Form
      className="row container mx-auto w-75 my-4 justify-content-center px-4"
      {...props}
    >
      {children}
    </Form>
  );
};

export default GenericForm;
