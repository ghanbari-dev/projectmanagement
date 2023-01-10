import React, { memo } from "react";
import Cells from "./Cells";
import { colType, tasksType } from "./TodoTypes";

type Props = { col: colType; tasks: tasksType };

const CellWrapper = ({ col, tasks }: Props) => {
  return (
    <>
      {col.taskIds.map((task, index: number) => (
        <Cells id={task} index={index} tasks={tasks} key={task} />
      ))}
    </>
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  if (prevProps.col.taskIds === nextProps.col.taskIds) {
    return true; // donot re-render
  }
  return false; // will re-render
};
export default memo(CellWrapper, areEqual);
