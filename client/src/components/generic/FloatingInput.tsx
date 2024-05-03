import { FC } from "react";

const FloatingInput: FC<{
  columnSize: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  additionalInputClasses?: string;
  required?: boolean;
}> = ({ columnSize, additionalInputClasses, name, ...props }) => {
  const inputClasses = `my-2 p-0 mx-2 ${additionalInputClasses ?? ""}`;
  return (
    <div className={`form-floating col col-${columnSize} ${inputClasses}`}>
      <input
        className="form-control border-2"
        name={name}
        id={name}
        {...props}
      />
      <label htmlFor={name}>{props.label}</label>
    </div>
  );
};

export default FloatingInput;
