import { Params, redirect } from "react-router";
import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";
import {
  createBoardColumn,
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

export const boardAction = async ({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) => {
  const projectId = getProjectIdFromParams({ params: params });
  const formData = await request.formData();
  const board = {
    name: formData.get("name")?.toString() ?? "No Name",
    description: formData.get("description")?.toString() ?? "No description",
    orderNumber: Number(formData.get("orderNumber")),
  };

  await createBoardColumn(projectId, board);
  return redirect(".");
};
