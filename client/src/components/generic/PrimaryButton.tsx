import { FC, MouseEvent, ReactNode } from "react";

const PrimaryButton: FC<{
  children: ReactNode;
  handler?: (event: MouseEvent<HTMLButtonElement>) => void;
}> = ({ children, handler }) => {
  return (
    <button className="btn btn-primary mx-2" type="submit" onClick={handler}>
      {children}
    </button>
  );
};

export default PrimaryButton;
