import {
  ArrowBackIos,
  ArrowForwardIos,
  // ControlPointTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
import CellEdit from "./CellEdit";
import ColumnEdit from "./ColumnEdit";

type Props = { index: number };

const Columns = ({ index }: Props) => {
  const [open, setOpen] = useState(true);

  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();
  const colData = useSelector(selectColumn)[index];
  const uid = useSelector(selectUID);

  const [editMode, setEditMode] = useState(false);

  const handleAddTask = (task: taskType) => {
    dispatch(addTask({ task, userID: uid, colID: colData.id }));
  };

  const handleEditColumn = (id: string, title: string) => {
    dispatch(
      updateColumn({
        colID: id,
        title: title,
      })
    );
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
                <div
                  className={
                    "flex items-center " +
                    (open ? "mb-[6px] h-[19px]" : "flex-col")
                  }
                >
                  <div
                    className={
                      "w-2 h-2 rounded-full " +
                      (index % 3 === 0
                        ? "bg-[#5030E5]"
                        : index % 3 === 1
                        ? "bg-[#FFA500]"
                        : "bg-[#8BC48A]") +
                      (open ? " mr-2" : " mt-2")
                    }
                  />
                  <div
                    className={
                      "font-medium leading-[19px] text-[#0D062D] flex-shrink-0" +
                      (open
                        ? " mr-3"
                        : " whitespace-nowrap w-full rotate-90 translate-x-[50%]")
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
      <CellEdit open={add} setOpen={setAdd} callback={handleAddTask} />

      <ColumnEdit
        open={editMode}
        setOpen={setEditMode}
        colData={colData}
        callback={handleEditColumn}
      />
    </div>
  );
};

export default memo(Columns);
