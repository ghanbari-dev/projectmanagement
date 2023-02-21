// import { ControlPointTwoTone } from "@mui/icons-material";
import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import BoardBtn from "./BoardBtn";
import StrictModeDroppable from "./StrictModeDroppable";

import addIcon from "../../public/icons/add.svg";
import updateList from "../../utils/updateList";

type Props = { open: boolean };

const TodoSideBar = ({ open }: Props) => {
  const [addBoardName, setAddBoardName] = useState("");

  const [add, setAdd] = useState(false);
  const [haveFavorite, setHaveFavorite] = useState(false);

  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const selectedBoardID = useSelector(selectBoardID);

  const dispatch = useDispatch();
  const addBoards = (_title: string) => {
    dispatch(addBoard({ uid, title: _title }));
  };

  const dragEndHandler = (res: DropResult) => {
    if (!boardList) return;
    const newBoards = updateList(res, boardList);
    if (!newBoards) return;
    dispatch(updateBoardsOrders({ boards: newBoards, userID: uid }));
  };

  useEffect(() => {
    for (let i = 0; i < boardList.length; i++) {
      if (boardList[i].favorite) {
        setHaveFavorite(true);
        break;
      }
      setHaveFavorite(false);
    }
  }, [boardList]);

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
          <Image src={addIcon} alt="icon" />
          {/* <ControlPointTwoTone /> */}
        </div>
      </div>

      <DragDropContext onDragEnd={dragEndHandler}>
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
                {haveFavorite && <Divider />}
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
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
      <Modal
        open={add}
        onClose={() => {
          setAdd(false);
          setAddBoardName("");
        }}
      >
        <Box className="absolute grid grid-cols-2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 gap-4 bg-white">
          <TextField
            label="Title"
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
            Add
          </Button>
          <div className="flex flex-col"></div>
        </Box>
      </Modal>
    </div>
  );
};

export default TodoSideBar;
