import { FC } from "react";

const cssLabelStyles = { fontSize: "0.9rem" };

const NormalInput: FC<{
  inputId: string;
  label: string;
  type: string;
  disabled?: boolean;
}> = (props) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.inputId}
        className="fw-semibold"
        style={cssLabelStyles}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.inputId}
        disabled={props.disabled}
        name={props.inputId}
      />
    </div>
  );
};

export default NormalInput;
