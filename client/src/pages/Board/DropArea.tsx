import { FC, useContext, useState } from "react";
import { DragContext } from "../../store/drag-context";
import { useSubmit } from "react-router-dom";

const DropArea: FC<{ columnId: number }> = ({ columnId }) => {
  const dragContext = useContext(DragContext);
  const submit = useSubmit();
  const [dragState, setDragState] = useState({
    isOver: false,
  });

  const isIssueActivated = dragContext.activeIssueId !== null;
  const classes = `rounded column-issue p-2 my-1 drop ${
    dragState.isOver ? "active-drop" : ""
  }`;

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("columnId", columnId.toString());
    formData.append("nextPage", "board");
    if (dragContext.activeIssueId) {
      formData.append("issueId", dragContext.activeIssueId.toString());
    }
    setDragState({ isOver: false });
    submit(formData, {
      action: "../issues",
      method: "PATCH",
    });
  };

  return (
    <div
      className={classes}
      hidden={!isIssueActivated}
      onDragEnter={() => setDragState({ isOver: true })}
      onDragLeave={() => setDragState({ isOver: false })}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleSubmit}
    >
      Drop Here
    </div>
  );
};

export default DropArea;
