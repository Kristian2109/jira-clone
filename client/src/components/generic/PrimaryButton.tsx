import { FC, MouseEvent, ReactNode } from "react";

const PrimaryButton: FC<{
  children: ReactNode;
  handler?: (event: MouseEvent<HTMLButtonElement>) => void;
  additionalClasses?: string;
  type?: "submit" | "button" | "reset";
}> = ({
  children,
  handler,
  additionalClasses = "",
  type = "submit",
  ...props
}) => {
  return (
    <button
      className={`btn btn-primary mx-2 ${additionalClasses}`}
      onClick={handler}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
