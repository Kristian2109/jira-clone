import { Params } from "react-router";
import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";
import {
  fetchProjectBoard,
  getProjectIdFromParams,
} from "../../utils/requests";
import "./index.css";

const BoardPage = () => {
  return (
    <div className="text-start m-3">
      <BoardHeader />
      <BoardContainer />
    </div>
  );
};

export default BoardPage;

export const boardLoader = async ({ params }: { params: Params }) => {
  const projectId = getProjectIdFromParams({ params: params });

  const board = await fetchProjectBoard(projectId);
  return board;
};
