import { FC } from "react";

const FloatingInput: FC<{
  columnSize: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  additionalInputClasses?: string;
  required?: boolean;
}> = ({ columnSize, placeholder, additionalInputClasses, name, ...props }) => {
  const inputClasses = additionalInputClasses
    ? additionalInputClasses
    : "my-2 p-0 mx-2";

  return (
    <div className={`col col-${columnSize} form-floating ${inputClasses}`}>
      <input
        name={name}
        className="form-control border-3"
        id={name}
        {...props}
      />
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
};

export default FloatingInput;
