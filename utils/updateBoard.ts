import { DropResult } from "react-beautiful-dnd";
import { boardType, columnType, taskType } from "../types/board";
import sortingArray from "./sortArray";

const updateBoard = (res: DropResult, state: boardType) => {
  const { destination, source, type } = res;

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
    sortingArray(newCols, res);
    newCols.sort((a, b) => b.order - a.order);

    return newCols;
  }

  if (source.droppableId == destination.droppableId) {
    const newTask: taskType[] = [];
    state.column
      ?.find((e) => e.id == source.droppableId)
      ?.task.forEach((task) => {
        newTask.push({ ...task });
      });

    sortingArray(newTask, res);

    newTask.sort((a, b) => b.order - a.order);
    const newCols: columnType[] = [];
    state.column.forEach((col) => {
      if (col.id != source.droppableId) {
        newCols.push(col);
      } else {
        newCols.push({ ...col, task: newTask });
      }
    });

    return newCols;
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

  const newCols: columnType[] = [];
  state.column.forEach((col) => {
    if (col.id == source.droppableId) {
      newCols.push({ ...col, task: newTaskS });
    } else if (col.id == destination.droppableId) {
      newCols.push({ ...col, task: newTaskD });
    } else newCols.push(col);
  });

  return newCols;
};

export default updateBoard;
