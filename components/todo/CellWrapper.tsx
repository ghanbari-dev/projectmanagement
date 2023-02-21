import React, { memo } from "react";
import { useSelector } from "react-redux";
import {  selectColumn } from "../../redux/stateSlice";
import { columnType } from "../../types/board";
import Cells from "./Cells";

type Props = { index: number , colID:string };

const CellWrapper = ({ index ,colID}: Props) => {
  const data:columnType = useSelector(selectColumn)[index];

  return (
    <>
      {data.task.map((task, index: number) => (
        <Cells index={index} task={task} key={task.id} colID={colID}/>
      ))}
    </>
  );
};
// FIXME:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const areEqual = (prevProps: any, nextProps: any) => {
  if (prevProps === nextProps) {
    return true; // donot re-render
  }
  return false; // will re-render
};
export default memo(CellWrapper, areEqual);
