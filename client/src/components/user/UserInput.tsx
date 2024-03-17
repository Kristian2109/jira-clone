const UserInput = (props: {
  inputId: string;
  label: string;
  value: string;
  type: string;
}) => {
  return (
    <div className="row mb-3">
      <label htmlFor={props.inputId} className="col-lg-3 col-form-label">
        {props.label}
      </label>
      <div className="col-lg-9">
        <input
          type={props.type}
          className="form-control"
          id={props.inputId}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default UserInput;
