import { useLoaderData } from "react-router";
import { Board } from "../../types/board";
import { Link } from "react-router-dom";

const BoardHeader = () => {
  const board = useLoaderData() as Board;

  return (
    <div>
      <h5>{board.name}</h5>
      <p>{board.description}</p>
      <div className="my-2 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Column
        </button>
        <Link className="btn btn-secondary mx-2" to="../create-issue">
          Create Issue
        </Link>
      </div>
    </div>
  );
};

export default BoardHeader;
