import { DropResult } from "react-beautiful-dnd";
import { boardType } from "../types/board";
import sortingArray from "./sortArray";

const updateList = (res: DropResult,boardList: boardType[]) => {
  const { destination, source } = res;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const newBoards: boardType[] = [];
  boardList.forEach((board: boardType) => {
    newBoards.push({ ...board });
  });
  sortingArray(newBoards, res);
  newBoards.sort((a, b) => b.order - a.order);

  return newBoards;
};

export default updateList;