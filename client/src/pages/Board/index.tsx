import { Params, redirect } from "react-router";
import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";
import {
  createBoardColumn,
  deleteBoardColumn,
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

  return await fetchProjectBoard(projectId);
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
  if (request.method === "POST") {
    const board = {
      name: formData.get("name")?.toString() ?? "No Name",
      description: formData.get("description")?.toString() ?? "No description",
      orderNumber: Number(formData.get("orderNumber")),
    };

    await createBoardColumn(projectId, board);
  } else if (request.method === "DELETE") {
    const boardId = Number(formData.get("columnId"));
    await deleteBoardColumn({ projectId, boardId });
  }
  return redirect(".");
};
