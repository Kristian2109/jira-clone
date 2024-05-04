import { FC, ForwardedRef, forwardRef } from "react";

const cssLabelStyles = { fontSize: "0.9rem" };

const NormalInputWithRef: FC<{
  inputId: string;
  label: string;
  type: string;
  disabled?: boolean;
  ref: ForwardedRef<HTMLInputElement>;
}> = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => {
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
        ref={ref}
      />
    </div>
  );
});

export default NormalInputWithRef;
