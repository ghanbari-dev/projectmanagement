import {
  ArrowBackIos,
  ArrowForwardIos,
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import React, { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUID,
  removeColumn,
  selectColumn,
  addTask,
  updateColumn,
} from "../../redux/stateSlice";
import CellWrapper from "./CellWrapper";
import StrictModeDroppable from "./StrictModeDroppable";

type Props = { index: number };

const Columns = ({ index }: Props) => {
  const [open, setOpen] = useState(true);
  const [addTaskName, setAddTaskName] = useState("");

  const dispatch = useDispatch();
  const colData = useSelector(selectColumn)[index];
  const uid = useSelector(selectUID);

  const [text, setText] = useState(colData.title);
  const [edithMode, setEdithMode] = useState(false);

  const addTasks = (title: string) => {
    dispatch(addTask({ title, userID: uid, colID: colData.id }));
  };

  const getColor = () => {
    switch (index % 5) {
      case 0:
        return "text-violet-900 border-violet-900";
      case 1:
        return "text-rose-900 border-rose-900";
      case 2:
        return "text-teal-700 border-teal-700";
      case 3:
        return "text-indigo-700 border-indigo-700";
      case 4:
        return "text-cyan-800 border-cyan-800";
    }
  };

  const removeColumns = (id: string) => {
    dispatch(removeColumn(id));
  };

  return (
    <Draggable draggableId={colData.id} index={index}>
      {(provided, snapshot) => (
        <div
          //elevation={2}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "rounded-2xl bg-[#F5F5F5] flex-shrink-0 font-bold p-5" +
            (snapshot.isDragging ? " border-black" : ` ${getColor()}`) +
            (open ? " p-4 w-[354px] flex flex-col gap-2" : " h-1/2 w-14 pb-4")
          }
        >
          <div
            className={
              "flex items-center" +
              (open
                ? " justify-between flex-row-reverse p-4 gap-3 flex-shrink-0"
                : " flex-col p-1 h-full")
            }
          >
            <IconButton
              color="inherit"
              //className="bg-gray-100 rounded-full p-2"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <ArrowBackIos /> : <ArrowForwardIos />}
            </IconButton>
            <>
              {!edithMode ? (
                <>
                  <div className="flex-grow h-full w-full overflow-hidden">
                    <div
                      className={
                        "flex-grow flex-shrink-0" +
                        (open
                          ? ""
                          : " whitespace-nowrap w-full rotate-90 translate-x-1/2")
                      }
                      style={{ transformOrigin: "0 50%" }}
                    >
                      {colData.title}
                    </div>
                    {open && (
                      <div className="text-xs ">
                        {colData.task?.length || 0}
                      </div>
                    )}
                  </div>
                  {!open && (
                    <div>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setEdithMode(true);
                        }}
                      >
                        <EditTwoTone color="primary" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          removeColumns(colData.id);
                        }}
                      >
                        <DeleteTwoTone color="error" />
                      </IconButton>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 bg-white opacity-50 rounded-md p-2 w-64 mt-10 rotate-90">
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
                          updateColumn({
                            colID: colData.id,
                            title: text,
                          })
                        );
                        setEdithMode(false);
                      }}
                    >
                      <CheckCircleTwoTone color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEdithMode(false);
                        setText(colData.title);
                      }}
                    >
                      <CancelTwoTone color="error" />
                    </IconButton>
                  </div>
                </div>
              )}
            </>
          </div>
          {open && (
            <>
              <Divider />
              <StrictModeDroppable
                droppableId={colData.id}
                key={colData.id}
                type="task"
              >
                {(provided, snapshot) => (
                  <div
                    className={
                      "flex flex-col gap-3 flex-grow overflow-y-auto p-3 transition-colors ease-in-out rounded-xl" +
                      (snapshot.isDraggingOver
                        ? " border-2 border-black"
                        : " border-2 border-inherit") // neon-5")
                    }
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CellWrapper index={index} colID={colData.id} />
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
              <div className="flex gap-2">
                <TextField
                  color="success"
                  className="flex-grow max-w-[80%]"
                  type="text"
                  value={addTaskName}
                  onChange={(e) => {
                    setAddTaskName(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  //className="p-2 border"
                  onClick={() => {
                    addTasks(addTaskName);
                    setAddTaskName("");
                  }}
                >
                  add
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default memo(Columns);
