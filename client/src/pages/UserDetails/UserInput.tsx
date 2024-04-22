const UserInput = (props: {
  inputId: string;
  label: string;
  value: string;
  type: string;
  disabled: boolean;
  valueHandler: any;
}) => {
  return (
    <div className="row mb-3">
      <label
        htmlFor={props.inputId}
        className="col-lg-3 col-form-label text-start fw-semibold"
      >
        {props.label}
      </label>
      <div className="col-lg-9">
        <input
          type={props.type}
          className="form-control"
          id={props.inputId}
          value={props.value}
          disabled={props.disabled}
          onChange={props.valueHandler}
        />
      </div>
    </div>
  );
};

export default UserInput;
