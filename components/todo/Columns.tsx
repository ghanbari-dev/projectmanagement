import {
  ArrowBackIos,
  ArrowForwardIos,
  // ControlPointTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Image from "next/image";
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
// import { getColor } from "../../utils/getColor";
import CellWrapper from "./CellWrapper";
import StrictModeDroppable from "./StrictModeDroppable";

import addIcon from "../../public/icons/add-square.svg";
import { taskType } from "../../types/board";

type Props = { index: number };

const Columns = ({ index }: Props) => {
  const [open, setOpen] = useState(true);

  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();
  const colData = useSelector(selectColumn)[index];
  const uid = useSelector(selectUID);

  const [text, setText] = useState(colData.title);
  const [editMode, setEditMode] = useState(false);

  const task: taskType = { id: "", order: -1, priority: "Low", title: "" };
  const [tempTask, setTempTask] = useState<taskType>(task);

  const addTasks = (task: taskType) => {
    dispatch(addTask({ task, userID: uid, colID: colData.id }));
  };

  const removeColumns = (id: string) => {
    dispatch(removeColumn(id));
  };

  return (
    <div>
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
              (open
                ? " p-5 w-[354px] flex flex-col"
                : " h-[400px] w-[60px] pb-4")
            }
          >
            <div
              className={
                "flex items-center h-5" +
                (open
                  ? " justify-between flex-row-reverse flex-shrink-0 mb-5"
                  : " flex-col h-full items-center")
              }
            >
              <div className="flex flex-row-reverse items-center gap-4">
                {open && (
                  // <IconButton
                  //   onClick={() => setAdd((prev) => !prev)}
                  //   sx={{ height: "24px", width: "24px" }}
                  // >
                  //   <ControlPointTwoTone />
                  // </IconButton>
                  <div onClick={() => setAdd((prev) => !prev)}>
                    <Image src={addIcon} alt="icon" />
                  </div>
                )}
                <IconButton
                  color="inherit"
                  //className="bg-gray-100 rounded-full p-2"
                  onClick={() => setOpen((prev) => !prev)}
                  sx={{ height: "20px", width: "20px" }}
                >
                  {open ? (
                    <ArrowBackIos sx={{ height: "20px", width: "20px" }} />
                  ) : (
                    <ArrowForwardIos sx={{ height: "20px", width: "20px" }} />
                  )}
                </IconButton>
              </div>
              <div
                className={
                  "flex-grow flex items-center" + (open ? "" : " w-5 flex-col")
                }
              >
                <div className="mb-[6px] h-[19px] flex items-center">
                  <div
                    className={
                      "w-2 h-2 rounded-full mr-2 " +
                      (index % 3 === 0
                        ? "bg-[#5030E5]"
                        : index % 3 === 1
                        ? "bg-[#FFA500]"
                        : "bg-[#8BC48A]") +
                      (open ? "" : " mt-2")
                    }
                  />
                  <div
                    className={
                      "font-medium leading-[19px] text-[#0D062D] mr-3 flex-shrink-0" +
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
                </div>
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
              </div>
            </div>
            {open && (
              <>
                <div
                  className={
                    "h-[3px] " +
                    (index % 3 === 0
                      ? "bg-[#5030E5]"
                      : index % 3 === 1
                      ? "bg-[#FFA500]"
                      : "bg-[#8BC48A]")
                  }
                />
                <StrictModeDroppable
                  droppableId={colData.id}
                  key={colData.id}
                  type="task"
                >
                  {(provided, snapshot) => (
                    <div
                      className={
                        "flex flex-col gap-5 flex-grow -m-[2px] mt-[26px] transition-colors ease-in-out rounded-2xl" +
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
              </>
            )}
          </div>
        )}
      </Draggable>
      <Modal
        open={add}
        onClose={() => {
          setAdd(false);
          setTempTask(task);
        }}
      >
        <Box className="absolute grid grid-cols-2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 gap-4 bg-white">
          <TextField
            label="Title"
            value={tempTask.title}
            onChange={(e) => {
              setTempTask({ ...tempTask, title: e.target.value });
            }}
          />
          <TextField
            label="Description"
            value={tempTask.description}
            onChange={(e) => {
              setTempTask({ ...tempTask, description: e.target.value });
            }}
          />
          <TextField
            label="image"
            value={tempTask.image}
            onChange={(e) => {
              setTempTask({
                ...tempTask,
                image: e.target.value.split(","),
              });
            }}
          />
          <FormControl>
            <InputLabel htmlFor="priority">priority</InputLabel>
            <Select
              id="priority"
              label="priority"
              value={tempTask.priority}
              onChange={(e: SelectChangeEvent) => {
                setTempTask({
                  ...tempTask,
                  priority: e.target.value as "High" | "Low" | "Completed",
                });
              }}
              defaultValue="Low"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="users"
            value={tempTask.users}
            onChange={(e) =>
              setTempTask({
                ...tempTask,
                users: e.target.value.split(","),
              })
            }
          />
          <TextField
            label="comments"
            value={tempTask.comments}
            onChange={(e) =>
              setTempTask({
                ...tempTask,
                comments: e.target.value.split(","),
              })
            }
          />
          <TextField
            label="files"
            value={tempTask.files}
            onChange={(e) =>
              setTempTask({
                ...tempTask,
                files: e.target.value.split(","),
              })
            }
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              addTasks(tempTask);
              setTempTask(task);
              setAdd(false);
            }}
          >
            Add
          </Button>
          <div className="flex flex-col"></div>
        </Box>
      </Modal>
      <Modal
        open={editMode}
        onClose={() => {
          setEditMode(false);
          setText(colData.title);
        }}
      >
        <Box className="absolute grid grid-cols-2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 gap-4 bg-white">
          <TextField
            label="Title"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="success"
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
            Done
          </Button>
          <div className="flex flex-col"></div>
        </Box>
      </Modal>
    </div>
  );
};

export default memo(Columns);
