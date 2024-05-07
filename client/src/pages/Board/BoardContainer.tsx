import { useLoaderData } from "react-router";
import { Board } from "../../types/board";
import BoardColumnContainer from "./BoardColumnContainer";
import { DragContextProvider } from "../../store/drag-context";

const BoardContainer = () => {
  const board = useLoaderData() as Board;
  const sortedColumns = board.boardColumns.sort(
    (a, b) => a.orderNumber - b.orderNumber
  );

  return (
    <DragContextProvider>
      <div id="board-container">
        {sortedColumns.map((column) => {
          return <BoardColumnContainer column={column} key={column.id} />;
        })}
      </div>
    </DragContextProvider>
  );
};

export default BoardContainer;
