import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  MoreHorizTwoTone,
} from "@mui/icons-material";
import { IconButton, Popover, TextField } from "@mui/material";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../redux/stateSlice";
import { taskType } from "../../types/board";

type Props = { index: number; task: taskType; colID: string };

const Cells = ({ index, task, colID }: Props) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(task.title);
  const [editMode, setEditMode] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "rounded-2xl bg-white p-5" +
            (snapshot.isDragging ? " border-2 text-black border-black" : " ") // neon-3")
          }
        >
          {!editMode ? (
            <div className="flex">
              <div className="p-3 flex-grow">{task.title}</div>
              <IconButton size="small" onClick={handleClick}>
                <MoreHorizTwoTone />
              </IconButton>
              <Popover
                id={!!anchorEl ? "simple-popover" : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="p-2">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                    onClick={() => {
                      setEditMode(true);
                      setAnchorEl(null);
                    }}
                  >
                    <div>Edit</div>
                    <IconButton size="small">
                      <EditTwoTone color="primary" />
                    </IconButton>
                  </div>
                  <div
                    className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                    onClick={() => {
                      dispatch(removeTask({ colID: colID, taskID: task.id }));
                      setAnchorEl(null);
                    }}
                  >
                    <div>Delete</div>
                    <IconButton size="small">
                      <DeleteTwoTone color="error" />
                    </IconButton>
                  </div>
                </div>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-white opacity-50 rounded-md p-2">
              <TextField
                className="flex-grow max-w-[80%]"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <div className="flex flex-col">
                <IconButton
                  onClick={() => {
                    dispatch(
                      updateTask({ colID: colID, taskID: task.id, text: text })
                    );
                    setEditMode(false);
                  }}
                >
                  <CheckCircleTwoTone color="success" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditMode(false);
                    setText(task.title);
                  }}
                >
                  <CancelTwoTone color="error" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Cells;
