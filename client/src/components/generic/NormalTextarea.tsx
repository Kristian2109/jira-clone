import { FC, ForwardedRef, forwardRef } from "react";

const cssLabelStyles = { fontSize: "0.9rem" };
const inputStyles = {
  height: "5rem",
};

const NormalTextarea: FC<{
  inputId: string;
  label: string;
  disabled?: boolean;
  ref: ForwardedRef<HTMLTextAreaElement>;
}> = forwardRef((props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.inputId}
        className="fw-semibold"
        style={cssLabelStyles}
      >
        {props.label}
      </label>
      <textarea
        className="form-control"
        style={inputStyles}
        id={props.inputId}
        disabled={props.disabled}
        name={props.inputId}
        rows={5}
        ref={ref}
      />
    </div>
  );
});

export default NormalTextarea;
