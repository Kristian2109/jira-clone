import { Params } from "react-router";
import Board from "./Board";
import BoardHeader from "./BoardHeader";
import {
  fetchProjectBoard,
  getProjectIdFromParams,
} from "../../utils/requests";

const BoardPage = () => {
  return (
    <div className="text-start m-3">
      <BoardHeader />
      <Board />
    </div>
  );
};

export default BoardPage;

export const boardLoader = async ({ params }: { params: Params }) => {
  const projectId = getProjectIdFromParams({ params: params });

  const board = await fetchProjectBoard(projectId);
  return board;
};
