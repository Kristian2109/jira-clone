import { FC } from "react";
import { BoardColumn } from "../../types/board";

const BoardColumnContainer: FC<{ column: BoardColumn }> = ({ column }) => {
  return (
    <div className="mx-2 rounded board-column p-2 mt-2">
      <h6>{column.name}</h6>
    </div>
  );
};

export default BoardColumnContainer;
