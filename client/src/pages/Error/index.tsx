import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div>
      <h1>Error Occurred</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
