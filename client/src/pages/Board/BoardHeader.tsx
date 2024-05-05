import { useLoaderData } from "react-router";
import { Board } from "../../types/board";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/generic/PrimaryButton";

const BoardHeader = () => {
  const board = useLoaderData() as Board;

  return (
    <div>
      <h5>{board.name}</h5>
      <p>{board.description}</p>
      <div className="my-2 d-flex justify-content-end">
        <PrimaryButton>Create Column</PrimaryButton>
        <Link className="btn btn-secondary mx-2" to="../create-issue">
          Create Issue
        </Link>
      </div>
    </div>
  );
};

export default BoardHeader;
