import { ChevronLeftTwoTone, ChevronRightTwoTone } from "@mui/icons-material";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import BoardBtn from "../components/BoardBtn";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import TodoTemplate from "../components/TodoTemplate";
import {
  selectBoardID,
  selectStates,
  selectUID,
  setBoardID,
  addBoard,
  updateBoardsOrders,
} from "../redux/stateSlice";
import { boardType } from "../types/board";

const Home: NextPage = () => {
  const [addBoardName, setAddBoardName] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  //dispatch(setUID("63bec66661b7a920cc2a0dc2"));
  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const selectedBoardID = useSelector(selectBoardID);

  //const [boardList, setBoardList] = useState<boardType[]>(state);

  const addBoards = (_title: string) => {
    dispatch(addBoard({ uid, title: _title }));
  };

  useEffect(() => {
    // getBoard(); TODO:
  }, []);

  /* useEffect(() => {
    getBoardList();
  }, []);

  useEffect(() => {
    if (!selectedBoardID) {
      return;
    }
    getBoardData();
  }, [selectedBoardID]); */

  const onDragEnd = (res: DropResult) => {
    const { destination, source, draggableId, type } = res;

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
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className="h-12 flex-shrink-0 bg-slate-900">header</header> */}
      <div className="flex-grow flex overflow-hidden">
        <aside
          className={
            "flex-shrink-0 bg-[#333333] overflow-auto " +
            (open ? "w-1/4" : "w-20")
          }
        >
          <div className="w-full flex justify-center my-2 text-white">
            <IconButton color="inherit" onClick={() => setOpen((prev) => !prev)}>
              {open ? <ChevronLeftTwoTone /> : <ChevronRightTwoTone />}
            </IconButton>
          </div>
          <Divider className="bg-white" />
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full">
              <StrictModeDroppable droppableId="board" type="board">
                {(provided, snapshot) => (
                  <div
                    className="flex flex-col gap-4 p-4"
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
                    <Divider className="bg-white" />
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

                    {open && (
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
        <main className="bg-gray-900 flex-grow overflow-auto">
          {selectedBoardID && <TodoTemplate />}
        </main>
      </div>
      {/* <footer className="h-12 bg-slate-900">footer</footer> */}
    </div>
  );
};

export default Home;
