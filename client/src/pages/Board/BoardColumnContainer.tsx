import { FC } from "react";
import { BoardColumnWithIssues } from "../../types/board";
import BoardIssue from "./BoardIssue";
import { Form } from "react-router-dom";

const BoardColumnContainer: FC<{ column: BoardColumnWithIssues }> = ({
  column,
}) => {
  return (
    <div className="mx-2 rounded board-column p-2 mt-2">
      <div className="d-flex justify-content-between">
        <h6>{column.name}</h6>
        <Form method="DELETE">
          <input type="text" hidden defaultValue={column.id} name="columnId" />
          <button className="btn btn-danger btn-sm px-1 py-0">Delete</button>
        </Form>
      </div>
      <div className="scrollable-column ">
        {column.issues.map((issue) => {
          return <BoardIssue issue={issue} />;
        })}
      </div>
    </div>
  );
};

export default BoardColumnContainer;
