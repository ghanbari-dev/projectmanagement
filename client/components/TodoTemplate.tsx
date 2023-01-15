import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectStates,
  selectUID,
  setStates,
} from "../redux/stateSlice";
import Columns from "./Columns";

import { StrictModeDroppable } from "./StrictModeDroppable";
import { colType, taskType } from "./TodoTypes";

const TodoTemplate = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const state = useSelector(selectBoard);

  const [addColumnName, setAddColumnName] = useState("");

  const addColumn = async (_title: string) =>
    await fetch(`http://localhost:4000/api/boards/column`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: _title, id: state.id, userID: uid }),
    })
      .then((res) => res.json())
      .then((_data) => {
        console.log(_data);
        dispatch(setStates(_data));
      });

  const removeColumn = async (_id: string) =>
    await fetch(`http://localhost:4000/api/boards/column`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: state.id, colID: _id, userID: uid }),
    })
      .then((res) => res.json())
      .then((_data) => {
        console.log(_data);
        dispatch(setStates(_data));
      });

  const updateTaskColumn = async (_column: any) =>
    await fetch(`http://localhost:4000/api/boards/column`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ column: _column, id: state.id, userID: uid }),
    })
      .then((res) => res.json())
      .then((_data) => {
        console.log(_data);
        dispatch(setStates(_data));
      });

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

    if (type === "column") {
      const newCols: any[] = [];
      state.column.forEach((col: any) => {
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
      const newStateS: any[] = [];
      boardList.forEach((b) => {
        if (b.id != newState.id) newStateS.push(b);
        else newStateS.push(newState);
      });

      updateTaskColumn(newCols);
      return;
    }

    if (source.droppableId == destination.droppableId) {
      const newTask: any[] = [];
      state.column
        .find((e: taskType) => e._id == source.droppableId)
        .task.forEach((task: any) => {
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
      const newCols: any[] = [];
      state.column.forEach((col: any) => {
        if (col._id != source.droppableId) {
          newCols.push(col);
        } else {
          newCols.push({ ...col, task: newTask });
        }
      });
      const newState = { ...state, column: newCols };
      const newStateS: any[] = [];
      boardList.forEach((b) => {
        if (b.id != newState.id) newStateS.push(b);
        else newStateS.push(newState);
      });

      updateTaskColumn(newCols);
      return;
    }

    const newTaskD: any[] = [];
    const tempD = state.column.find(
      (e: taskType) => e._id == destination.droppableId
    ).task;
    const tempS = state.column.find(
      (e: taskType) => e._id == source.droppableId
    ).task;

    if (tempD.length > 0) {
      tempD.forEach((task: any, index: number) => {
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

    const newTaskS: any[] = [];
    state.column
      .find((e: taskType) => e._id == source.droppableId)
      .task.forEach((task: any, index: number) => {
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

    const newCols: any[] = [];
    state.column.forEach((col: any) => {
      if (col._id == source.droppableId) {
        newCols.push({ ...col, task: newTaskS });
      } else if (col._id == destination.droppableId) {
        newCols.push({ ...col, task: newTaskD });
      } else newCols.push(col);
    });
    const newState = { ...state, column: newCols };
    const newStateS: any[] = [];
    boardList.forEach((b) => {
      if (b.id != newState.id) newStateS.push(b);
      else newStateS.push(newState);
    });

    updateTaskColumn(newCols);
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
              {state.column.map((col: colType, index: number) => (
                <Columns
                  key={col._id}
                  index={index}
                  removeColumn={removeColumn}
                />
              ))}

              {provided.placeholder}
              <div className="flex gap-2 w-[200px] md:max-w-[50%] lg:w-[25%]">
                <input
                  className="flex-grow max-w-[80%]"
                  type="text"
                  value={addColumnName}
                  onChange={(e) => {
                    setAddColumnName(e.target.value);
                  }}
                />
                <button
                  className="p-2 border"
                  onClick={() => {
                    addColumn(addColumnName);
                    setAddColumnName("");
                  }}
                >
                  add
                </button>
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </DragDropContext>
  );
};

export default TodoTemplate;
