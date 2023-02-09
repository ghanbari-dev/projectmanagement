import {
  ArrowBackIos,
  ArrowForwardIos,
  CancelTwoTone,
  CheckCircleTwoTone,
  ControlPointTwoTone,
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
import { getColor } from "../../utils/getColor";
import CellWrapper from "./CellWrapper";
import StrictModeDroppable from "./StrictModeDroppable";

type Props = { index: number };

const Columns = ({ index }: Props) => {
  const [open, setOpen] = useState(true);
  const [addTaskName, setAddTaskName] = useState("");

  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();
  const colData = useSelector(selectColumn)[index];
  const uid = useSelector(selectUID);

  const [text, setText] = useState(colData.title);
  const [editMode, setEditMode] = useState(false);

  const addTasks = (title: string) => {
    dispatch(addTask({ title, userID: uid, colID: colData.id }));
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
            (snapshot.isDragging ? " border-2 border-black" : "") +
            (open ? " p-5 w-[354px] flex flex-col" : " h-[400px] w-[60px] pb-4")
          }
        >
          <div
            className={
              "flex items-center" +
              (open
                ? " justify-between flex-row-reverse flex-shrink-0 mb-5"
                : " flex-col h-full items-center")
            }
          >
            <div className="flex items-center gap-4">
              {open && (
                <IconButton
                  onClick={() => setAdd((prev) => !prev)}
                  sx={{ height: "24px", width: "24px" }}
                >
                  <ControlPointTwoTone />
                </IconButton>
              )}
              <IconButton
                color="inherit"
                //className="bg-gray-100 rounded-full p-2"
                onClick={() => setOpen((prev) => !prev)}
                sx={{ height: "24px", width: "24px" }}
              >
                {open ? <ArrowBackIos /> : <ArrowForwardIos />}
              </IconButton>
            </div>
            <div
              className={
                "flex-grow flex items-center" + (open ? "" : " w-5 flex-col")
              }
            >
              {!editMode ? (
                <>
                  <div
                    className={
                      "w-2 h-2 rounded-full mr-2 " +
                      getColor(index, "bg") +
                      (open ? "" : " mt-2")
                    }
                  />
                  <div
                    className={
                      "font-medium leading-5 text-[#0D062D] mr-3 flex-shrink-0" +
                      (open
                        ? ""
                        : " whitespace-nowrap w-full rotate-90 translate-x-[15px]")
                    }
                    style={{ transformOrigin: "0 50%" }}
                  >
                    {colData.title}
                  </div>
                  {open && (
                    <div className="text-xs leading-[14px] h-5 w-5 rounded-full bg-[#E0E0E0] text-[#625F6D] flex justify-center items-center">
                      {colData.task?.length || 0}
                    </div>
                  )}
                  {!open && (
                    <div className="mt-[230px]">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setEditMode(true);
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
                        setEditMode(false);
                      }}
                    >
                      <CheckCircleTwoTone color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditMode(false);
                        setText(colData.title);
                      }}
                    >
                      <CancelTwoTone color="error" />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          </div>
          {open && (
            <>
              <Divider className={"h-[3px] " + getColor(index, "bg")} />
              <StrictModeDroppable
                droppableId={colData.id}
                key={colData.id}
                type="task"
              >
                {(provided, snapshot) => (
                  <div
                    className={
                      "flex flex-col gap-5 flex-grow overflow-y-auto mt-[28px] transition-colors ease-in-out rounded-2xl" +
                      (snapshot.isDraggingOver
                        ? " border-2 border-dashed"
                        : " border-2 border-transparent") // neon-5")
                    }
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CellWrapper index={index} colID={colData.id} />
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
              {open && add && (
                <div className="flex gap-2 mt-6">
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
                      setAdd(false);
                    }}
                  >
                    add
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default memo(Columns);
