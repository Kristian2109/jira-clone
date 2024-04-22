const FloatingInput = (props: {
  columnSize: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className={`col col-${props.columnSize} form-floating my-2 p-0 mx-2`}>
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
