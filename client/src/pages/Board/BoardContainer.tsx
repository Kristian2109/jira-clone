import { useLoaderData } from "react-router";
import { Board } from "../../types/board";
import BoardColumnContainer from "./BoardColumnContainer";

const BoardContainer = () => {
  const board = useLoaderData() as Board;

  return (
    <div className="d-flex" id="board-container">
      {board.boardColumns.map((column) => {
        return <BoardColumnContainer column={column} key={column.id} />;
      })}
    </div>
  );
};

export default BoardContainer;
