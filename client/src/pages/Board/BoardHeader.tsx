import { useLoaderData } from "react-router";
import { Board } from "../../types/board";

const BoardHeader = () => {
  const board = useLoaderData() as Board;

  return <h1>{board?.name}</h1>;
};

export default BoardHeader;
