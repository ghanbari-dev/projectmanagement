import {
  AddTwoTone,
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
  FavoriteTwoTone,
} from "@mui/icons-material";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addBoard,
  selectBoardID,
  selectStates,
  selectUID,
  setBoardID,
  updateBoardsOrders,
} from "../../redux/stateSlice";
import { boardType } from "../../types/board";
import BoardBtn from "../BoardBtn";
import { StrictModeDroppable } from "../StrictModeDroppable";

const SideBar = () => {
  const [addBoardName, setAddBoardName] = useState("");
  const [open, setOpen] = useState(false);
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
    boardList.forEach((board) => {
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
    <aside
      className={
        "flex-shrink-0 bg-white overflow-auto border-r-2 " +
        (open ? "w-1/4" : "w-20")
      }
    >
      <div
        className={
          "w-full flex my-2 px-4 " + (open ? "justify-end" : "justify-center")
        }
      >
        <IconButton
          className="border"
          size="small"
          color="inherit"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <ChevronLeftTwoTone /> : <ChevronRightTwoTone />}
        </IconButton>
      </div>
      <Divider />
      {open && (
        <div className="flex justify-between items-center m-4">
          <div className="capitalize">my boards</div>
          <div className="border-2 rounded-xl">
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setAdd((prev) => !prev)}
            >
              <AddTwoTone />
            </IconButton>
          </div>
        </div>
      )}
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full">
          <StrictModeDroppable droppableId="board" type="board">
            {(provided) => (
              <div
                className="flex flex-col gap-4 p-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {open && (
                  <div className="flex justify-between items-center">
                    <div className="font-extrabold">Favorites</div>
                    <FavoriteTwoTone color="error" />
                  </div>
                )}
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
                              "rounded-sm flex-shrink-0 text-white" +
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
                              "rounded-sm flex-shrink-0 text-white" +
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
    </aside>
  );
};

export default SideBar;
