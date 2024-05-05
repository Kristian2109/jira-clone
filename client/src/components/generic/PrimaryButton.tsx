import { FC, MouseEvent, ReactNode } from "react";

const PrimaryButton: FC<{
  children: ReactNode;
  handler?: (event: MouseEvent<HTMLButtonElement>) => void;
  additionalClasses?: string;
}> = ({ children, handler, additionalClasses = "", ...props }) => {
  return (
    <button
      className={`btn btn-primary mx-2 ${additionalClasses}`}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
