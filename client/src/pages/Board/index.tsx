import { Params } from "react-router";
import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";
import {
  fetchProjectBoard,
  getProjectIdFromParams,
} from "../../utils/requests";
import "./index.css";
import CreateColumnModal from "./CreateColumnModal";

const BoardPage = () => {
  return (
    <div className="text-start m-3">
      <BoardHeader />
      <BoardContainer />
      <CreateColumnModal />
    </div>
  );
};

export default BoardPage;

export const boardLoader = async ({ params }: { params: Params }) => {
  const projectId = getProjectIdFromParams({ params: params });

  const board = await fetchProjectBoard(projectId);
  return board;
};
