import Board from "./Board";
import BoardHeader from "./BoardHeader";

const BoardPage = () => {
  return (
    <div className="text-start m-3">
      <BoardHeader />
      <Board />
    </div>
  );
};

export default BoardPage;
