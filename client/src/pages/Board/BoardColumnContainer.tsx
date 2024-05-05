import { FC } from "react";
import { BoardColumn } from "../../types/board";
import BoardIssue from "./BoardIssue";

const BoardColumnContainer: FC<{ column: BoardColumn }> = ({ column }) => {
  return (
    <div className="mx-2 rounded board-column p-2 mt-2">
      <h6>{column.name}</h6>
      <div className="scrollable-column ">
        {column.issues.map((issue) => {
          return <BoardIssue issue={issue} />;
        })}
      </div>
    </div>
  );
};

export default BoardColumnContainer;
