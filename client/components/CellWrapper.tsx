import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { selectBoard } from "../redux/stateSlice";
import Cells from "./Cells";
import { colType } from "./TodoTypes";

type Props = { index: number };

const CellWrapper = ({ index }: Props) => {
 
  const data = useSelector(selectBoard).column[index];

  return (
    <>
      {data.task.map((task:any, index: number) => (
        <Cells id={task._id} index={index} task={task} key={task._id} />
      ))}
    </>
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  if (prevProps === nextProps) {
    return true; // donot re-render
  }
  return false; // will re-render
};
export default memo(CellWrapper, areEqual);
