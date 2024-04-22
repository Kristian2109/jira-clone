const FloatingInput = (props: {
  columnSize: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  additionalInputClasses?: string;
}) => {
  const inputClasses = props.additionalInputClasses
    ? props.additionalInputClasses
    : "my-2 p-0 mx-2";

  return (
    <div
      className={`col col-${props.columnSize} form-floating ${inputClasses}`}
    >
      <input
        name={props.name}
        type={props.type}
        className="form-control border-3"
        placeholder={props.placeholder}
        id={props.name}
      />
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
};

export default FloatingInput;
