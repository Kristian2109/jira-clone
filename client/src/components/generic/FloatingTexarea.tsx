import { FC } from "react";

const FloatingTextarea: FC<{
  columnSize: number;
  label: string;
  name: string;
  placeholder: string;
  additionalInputClasses?: string;
  required?: boolean;
}> = ({ columnSize, placeholder, additionalInputClasses, name, ...props }) => {
  const inputClasses = `my-2 p-0 mx-2 ${additionalInputClasses ?? ""}`;
  const inputStyles = {
    height: "5rem",
  };

  return (
    <div className={`col col-${columnSize} form-floating ${inputClasses}`}>
      <textarea
        name={name}
        className="form-control border-2"
        id={name}
        style={inputStyles}
        placeholder={placeholder}
        {...props}
      />
      <label htmlFor={name}>{props.label}</label>
    </div>
    //     <div class="form-floating">
    //   <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
    //   <label for="floatingTextarea">Comments</label>
    // </div>
  );
};

export default FloatingTextarea;
