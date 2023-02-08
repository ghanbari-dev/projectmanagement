import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../redux/stateSlice";
import { taskType } from "../../types/board";

type Props = { index: number; task: taskType; colID: string };

const Cells = ({ index, task, colID }: Props) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(task.title);
  const [edithMode, setEdithMode] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "rounded-xl border-2" +
            (snapshot.isDragging
              ? " text-black border-black"
              : " border-inherit") // neon-3")
          }
        >
          {!edithMode ? (
            <div className="flex">
              <div className="p-3 flex-grow">{task.title}</div>
              <IconButton onClick={() => setEdithMode(true)}>
                <EditTwoTone color="primary" />
              </IconButton>
              <IconButton
                onClick={() =>
                  dispatch(removeTask({ colID: colID, taskID: task.id }))
                }
              >
                <DeleteTwoTone color="error" />
              </IconButton>
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
                    setEdithMode(false);
                  }}
                >
                  <CheckCircleTwoTone color="success" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEdithMode(false);
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
