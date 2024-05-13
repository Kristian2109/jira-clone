import { FC, useState } from "react";
import "./ErrorPopUp.css";

const ErrorPopUp: FC<{ message: string }> = ({ message }) => {
  const [shouldBeDisplayed, setShouldBeDisplayed] = useState(true);

  return (
    <div
      className="error-box"
      hidden={!shouldBeDisplayed}
      onClick={() => setShouldBeDisplayed(false)}
    >
      {message}
    </div>
  );
};

export default ErrorPopUp;
