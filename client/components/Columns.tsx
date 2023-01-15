import React, { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectBoardID,
  selectUID,
  setStates,
} from "../redux/stateSlice";
import CellWrapper from "./CellWrapper";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { colType, tasksType, taskType } from "./TodoTypes";

type Props = { index: number; removeColumn: any };

const Columns = ({ index, removeColumn }: Props) => {
  const [open, setOpen] = useState(true);
  const [addTaskName, setAddTaskName] = useState("");

  const dispatch = useDispatch();
  const colData = useSelector(selectBoard).column[index];
  const uid = useSelector(selectUID);
  const bid = useSelector(selectBoardID);

  const addTask = async (_title: string) =>
    await fetch(`http://localhost:4000/api/boards/columns/task`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: _title,
        id: bid,
        userID: uid,
        colID: colData._id,
      }),
    })
      .then((res) => res.json())
      .then((_data) => {
        dispatch(setStates(_data));
      });

  return (
    <Draggable draggableId={colData._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "rounded-xl border flex-shrink-0" +
            (snapshot.isDragging ? " bg-gray-200" : " bg-white") +
            (open
              ? " p-3 w-[200px] md:max-w-[50%] lg:w-[25%] flex flex-col gap-2"
              : " h-1/2 w-14 pb-4")
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
            <button
              className="bg-gray-100 rounded-full p-2"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </button>
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
                <div className="text-xs text-gray-400">
                  {`${colData.task?.length || 0} ${
                    colData.task?.length > 1 ? "items" : "item"
                  }`}
                </div>
              )}
            </div>
            {!open && (
              <button
                className="bg-gray-100 rounded-full p-2"
                onClick={() => {
                  removeColumn(colData._id);
                }}
              >
                X
              </button>
            )}
          </div>
          {open && (
            <>
              <hr />
              <StrictModeDroppable
                droppableId={colData._id}
                key={colData.id}
                type="task"
              >
                {(provided, snapshot) => (
                  <div
                    className={
                      "flex flex-col gap-2 flex-grow overflow-y-auto p-3 transition-colors ease-in-out" +
                      (snapshot.isDraggingOver ? " bg-gray-600" : " bg-white")
                    }
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CellWrapper index={index} />
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
              <div className="flex gap-2">
                <input
                  className="flex-grow max-w-[80%]"
                  type="text"
                  value={addTaskName}
                  onChange={(e) => {
                    setAddTaskName(e.target.value);
                  }}
                />
                <button
                  className="p-2 border"
                  onClick={() => {
                    addTask(addTaskName);
                    setAddTaskName("");
                  }}
                >
                  add
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default memo(Columns);
