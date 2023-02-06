import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectStates,
  selectUID,
  addColumn,
  updateOrders,
} from "../redux/stateSlice";
import { boardType, columnType, taskType } from "../types/board";
import Columns from "./Columns";

import { StrictModeDroppable } from "./StrictModeDroppable";

const TodoTemplate = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const state = useSelector(selectBoard);

  const [addColumnName, setAddColumnName] = useState("");

  const addColumns = async (title: string) => {
    dispatch(addColumn({ title, userID: uid }));
  };

  const onDragEnd = (res: DropResult) => {
    const { destination, source, draggableId, type } = res;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (state === undefined) return;

    if (type === "column") {
      const newCols: columnType[] = [];
      state.column.forEach((col) => {
        newCols.push({ ...col });
      });
      for (let _ind = 0; _ind < newCols.length; _ind++) {
        if (source.index < destination.index) {
          if (_ind < source.index || _ind > destination.index) {
            newCols[_ind].order = newCols.length - _ind;
          } else if (_ind != source.index) {
            newCols[_ind].order = newCols.length - _ind + 1;
          } else {
            newCols[_ind].order = newCols.length - destination.index;
          }
        } else {
          if (_ind > source.index || _ind < destination.index) {
            newCols[_ind].order = newCols.length - _ind;
          } else if (_ind != source.index) {
            newCols[_ind].order = newCols.length - _ind - 1;
          } else {
            newCols[_ind].order = newCols.length - destination.index;
          }
        }
      }
      newCols.sort((a, b) => b.order - a.order);
      const newState = { ...state, column: newCols };
      const newStateS: boardType[] = [];
      boardList.forEach((b) => {
        if (b.id != newState.id) newStateS.push(b);
        else newStateS.push(newState);
      });

      dispatch(updateOrders({ cols: newCols, userID: uid }));
      return;
    }

    if (source.droppableId == destination.droppableId) {
      const newTask: taskType[] = [];
      state.column
        ?.find((e) => e.id == source.droppableId)
        ?.task.forEach((task) => {
          newTask.push({ ...task });
        });

      for (let _ind = 0; _ind < newTask.length; _ind++) {
        if (source.index < destination.index) {
          if (_ind < source.index || _ind > destination.index) {
            newTask[_ind].order = newTask.length - _ind;
          } else if (_ind != source.index) {
            newTask[_ind].order = newTask.length - _ind + 1;
          } else {
            newTask[_ind].order = newTask.length - destination.index;
          }
        } else {
          if (_ind > source.index || _ind < destination.index) {
            newTask[_ind].order = newTask.length - _ind;
          } else if (_ind != source.index) {
            newTask[_ind].order = newTask.length - _ind - 1;
          } else {
            newTask[_ind].order = newTask.length - destination.index;
          }
        }
      }

      newTask.sort((a, b) => b.order - a.order);
      const newCols: columnType[] = [];
      state.column.forEach((col) => {
        if (col.id != source.droppableId) {
          newCols.push(col);
        } else {
          newCols.push({ ...col, task: newTask });
        }
      });
      const newState: boardType = { ...state, column: newCols };
      const newStateS: boardType[] = [];
      boardList.forEach((b) => {
        if (b.id != newState.id) newStateS.push(b);
        else newStateS.push(newState);
      });

      dispatch(updateOrders({ cols: newCols, userID: uid }));
      // updateTaskColumn(newCols);
      return;
    }

    const newTaskD: taskType[] = [];
    const tempD: taskType[] =
      state.column?.find((e) => e.id == destination.droppableId)?.task || [];
    const tempS =
      state.column?.find((e) => e.id == source.droppableId)?.task || [];

    if (tempD.length > 0) {
      tempD.forEach((task, index: number) => {
        if (index == destination.index) {
          newTaskD.push({
            ...tempS[source.index],
          });
        }
        newTaskD.push({ ...task });
      });
      if (tempD.length == destination.index) {
        newTaskD.push({
          ...tempS[source.index],
        });
      }
    } else
      newTaskD.push({
        ...tempS[source.index],
      });

    const newTaskS: taskType[] = [];
    state.column
      .find((e) => e.id == source.droppableId)
      ?.task.forEach((task, index: number) => {
        if (index != source.index) newTaskS.push({ ...task });
      });

    for (let _ind = 0; _ind < newTaskS.length - 1; _ind++) {
      newTaskS[_ind].order = newTaskS.length - _ind;
    }

    for (let _ind = 0; _ind < newTaskD.length; _ind++) {
      newTaskD[_ind].order = newTaskD.length - _ind;
    }

    newTaskS.sort((a, b) => b.order - a.order);
    newTaskD.sort((a, b) => b.order - a.order);

    console.log(newTaskS);
    console.log(newTaskD);

    const newCols: columnType[] = [];
    state.column.forEach((col) => {
      if (col.id == source.droppableId) {
        newCols.push({ ...col, task: newTaskS });
      } else if (col.id == destination.droppableId) {
        newCols.push({ ...col, task: newTaskD });
      } else newCols.push(col);
    });
    const newState = { ...state, column: newCols };
    const newStateS: boardType[] = [];
    boardList.forEach((b) => {
      if (b.id != newState.id) newStateS.push(b);
      else newStateS.push(newState);
    });

    dispatch(updateOrders({ cols: newCols, userID: uid }));
    // updateTaskColumn(newCols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-full flex">
        <StrictModeDroppable
          droppableId="cols"
          direction="horizontal"
          type="column"
        >
          {(provided, snapshot) => (
            <div
              className={
                "flex-grow flex gap-5 items-start p-3 h-full transition-colors ease-in-out" +
                (snapshot.isDraggingOver ? " bg-gray-600" : "")
              }
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state?.column.map((col, index) => (
                <Columns key={col.id} index={index} />
              ))}

              {provided.placeholder}
              <div className="flex bg-white rounded-xl flex-shrink-0 p-2 gap-2 w-[200px] md:max-w-[50%] lg:w-[25%]">
                <TextField
                  className="flex-grow max-w-[80%]"
                  type="text"
                  value={addColumnName}
                  onChange={(e) => {
                    setAddColumnName(e.target.value);
                  }}
                />
                <Button
                  className="p-2 border"
                  variant="contained"
                  color="success"
                  onClick={() => {
                    addColumns(addColumnName);
                    setAddColumnName("");
                  }}
                >
                  add
                </Button>
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </DragDropContext>
  );
};

export default TodoTemplate;
