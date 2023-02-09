import { ControlPointTwoTone } from "@mui/icons-material";
import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addBoard,
  selectBoardID,
  selectStates,
  selectUID,
  setBoardID,
  updateBoardsOrders,
} from "../../redux/stateSlice";
import { boardType } from "../../types/board";
import BoardBtn from "./BoardBtn";
import StrictModeDroppable from "./StrictModeDroppable";

type Props = { open: boolean };

const TodoSideBar = ({ open }: Props) => {
  const [addBoardName, setAddBoardName] = useState("");

  const [add, setAdd] = useState(false);

  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const selectedBoardID = useSelector(selectBoardID);

  const dispatch = useDispatch();
  const addBoards = (_title: string) => {
    dispatch(addBoard({ uid, title: _title }));
  };

  const onDragEnd = (res: DropResult) => {
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
    for (let _ind = 0; _ind < newBoards.length; _ind++) {
      if (source.index < destination.index) {
        if (_ind < source.index || _ind > destination.index) {
          newBoards[_ind].order = newBoards.length - _ind;
        } else if (_ind != source.index) {
          newBoards[_ind].order = newBoards.length - _ind + 1;
        } else {
          newBoards[_ind].order = newBoards.length - destination.index;
        }
      } else {
        if (_ind > source.index || _ind < destination.index) {
          newBoards[_ind].order = newBoards.length - _ind;
        } else if (_ind != source.index) {
          newBoards[_ind].order = newBoards.length - _ind - 1;
        } else {
          newBoards[_ind].order = newBoards.length - destination.index;
        }
      }
    }
    newBoards.sort((a, b) => b.order - a.order);
    // const newState = { ...state, column: newCols };
    // const newStateS: boardType[] = [];
    // boardList.forEach((b) => {
    //   if (b.id != newState.id) newStateS.push(b);
    //   else newStateS.push(newState);
    // });

    dispatch(updateBoardsOrders({ boards: newBoards, userID: uid }));
  };
  return (
    <div className="flex flex-col gap-[30px] mx-6 my-[30px]">
      <div className="flex justify-between items-center">
        <div className="uppercase text-xs leading-[14px] font-bold">
          my projects
        </div>
        <div
          className="w-4 h-4 flex justify-center items-center"
          onClick={() => setAdd((prev) => !prev)}
        >
          <ControlPointTwoTone />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full">
          <StrictModeDroppable droppableId="board" type="board">
            {(provided) => (
              <div
                className="flex flex-col gap-[30px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boardList.map(
                  (board, index) =>
                    board.favorite && (
                      <Draggable
                        draggableId={board.id}
                        index={index}
                        key={board.id}
                      >
                        {(dprovided, dsnapshot) => (
                          <div
                            //elevation={2}
                            {...dprovided.draggableProps}
                            {...dprovided.dragHandleProps}
                            ref={dprovided.innerRef}
                            className={
                              "rounded-md flex-shrink-0" +
                              (dsnapshot.isDragging ? " bg-gray-700" : ``)
                              // (open
                              //   ? " p-3 w-[200px] md:max-w-[50%] lg:w-[25%] flex flex-col gap-2"
                              //   : " h-1/2 w-14 pb-4")
                            }
                          >
                            <BoardBtn
                              isSelected={board.id == selectedBoardID}
                              board={board}
                              selectBoardHandler={() => {
                                dispatch(setBoardID(board.id));
                              }}
                              open={open}
                              index={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                <Divider />
                {boardList.map(
                  (board, index) =>
                    !board.favorite && (
                      <Draggable
                        draggableId={board.id}
                        index={index}
                        key={board.id}
                      >
                        {(dprovided, dsnapshot) => (
                          <div
                            //elevation={2}
                            {...dprovided.draggableProps}
                            {...dprovided.dragHandleProps}
                            ref={dprovided.innerRef}
                            className={
                              "rounded-sm flex-shrink-0" +
                              (dsnapshot.isDragging ? " bg-gray-700" : ``)
                              // (open
                              //   ? " p-3 w-[200px] md:max-w-[50%] lg:w-[25%] flex flex-col gap-2"
                              //   : " h-1/2 w-14 pb-4")
                            }
                          >
                            <BoardBtn
                              isSelected={board.id == selectedBoardID}
                              board={board}
                              selectBoardHandler={() => {
                                dispatch(setBoardID(board.id));
                              }}
                              open={open}
                              index={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}

                {open && add && (
                  <div className="flex gap-2">
                    <TextField
                      className="flex-grow max-w-[80%]"
                      type="text"
                      value={addBoardName}
                      onChange={(e) => {
                        setAddBoardName(e.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        addBoards(addBoardName);
                        setAddBoardName("");
                        setAdd(false);
                      }}
                    >
                      add
                    </Button>
                  </div>
                )}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoSideBar;
