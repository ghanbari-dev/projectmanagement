// import {
//   AddTwoTone,
//   CalendarTodayTwoTone,
//   EditTwoTone,
//   FilterAltTwoTone,
//   GridViewTwoTone,
//   GroupTwoTone,
//   LinkTwoTone,
// } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectUID,
  addColumn,
  updateOrders,
} from "../../redux/stateSlice";
import Columns from "./Columns";

import StrictModeDroppable from "./StrictModeDroppable";

import updateBoard from "../../utils/updateBoard";
import TodoInfos from "./TodoInfos";

const TodoTemplate = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);
  const state = useSelector(selectBoard);

  const [addColumnName, setAddColumnName] = useState("");

  const addColumns = async (title: string) => {
    dispatch(addColumn({ title, userID: uid }));
  };

  const dragEndHandler = (res: DropResult) => {
    if (!state) return;
    const newCols = updateBoard(res, state);
    if (!newCols) return;
    dispatch(updateOrders({ cols: newCols, userID: uid }));
  };

  return (
    <div
      className="w-full h-full flex flex-col gap-10" //mx-[46px] pl-[2.5px] my-[40px]
    >
      <TodoInfos state={state} />

      <DragDropContext onDragEnd={dragEndHandler}>
        <div className="pl-[48.5px] flex overflow-auto">
          <div
            className="" //overflow-y-auto"
          >
            <StrictModeDroppable
              droppableId="cols"
              direction="horizontal"
              type="column"
            >
              {(provided, snapshot) => (
                <div
                  className={
                    "flex-grow flex gap-[15px] items-start h-full transition-colors ease-in-out rounded-2xl -ml-[2px]" +
                    (snapshot.isDraggingOver
                      ? " border-2 border-dashed"
                      : " border-2 border-transparent")
                  }
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {state?.column.map((col, index) => (
                    <Columns key={col.id} index={index} />
                  ))}

                  {provided.placeholder}
                  <div className="flex bg-white rounded-xl flex-shrink-0 p-2 gap-2 w-[200px]">
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
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoTemplate;
