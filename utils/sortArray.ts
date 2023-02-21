import { boardType, columnType, taskType } from "../types/board";
import { DropResult } from "react-beautiful-dnd";

const sortingArray = (
  arr: taskType[] | columnType[] | boardType[],
  res: DropResult
) => {
  const { destination, source } = res;
  if (!destination) {
    return;
  }
  for (let _ind = 0; _ind < arr.length; _ind++) {
    if (source.index < destination.index) {
      if (_ind < source.index || _ind > destination.index) {
        arr[_ind].order = arr.length - _ind;
      } else if (_ind != source.index) {
        arr[_ind].order = arr.length - _ind + 1;
      } else {
        arr[_ind].order = arr.length - destination.index;
      }
    } else {
      if (_ind > source.index || _ind < destination.index) {
        arr[_ind].order = arr.length - _ind;
      } else if (_ind != source.index) {
        arr[_ind].order = arr.length - _ind - 1;
      } else {
        arr[_ind].order = arr.length - destination.index;
      }
    }
  }
};

export default sortingArray;
