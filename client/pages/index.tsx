import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../components/BoardBtn";
import TodoTemplate from "../components/TodoTemplate";
import {
  selectBoardID,
  selectStates,
  selectUID,
  setBoardID,
  setStates,
} from "../redux/stateSlice";

const Home: NextPage = () => {
  const [addBoardName, setAddBoardName] = useState("");

  const dispatch = useDispatch();
  //dispatch(setUID("63bec66661b7a920cc2a0dc2"));
  const uid = useSelector(selectUID);
  const boardList = useSelector(selectStates);
  const selectedBoardID = useSelector(selectBoardID);

  //const [boardList, setBoardList] = useState<boardType[]>(state);

  const getBoard = async () =>
    await fetch(`http://localhost:4000/api/board`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: uid }),
    })
      .then((res) => res.json())
      .then((_data) => {
        dispatch(setStates(_data));
      });

  const addBoard = async (_title: string) => {
    if (_title == "") {
      return;
    }
    await fetch(`http://localhost:4000/api/board/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: _title, userID: uid }),
    })
      .then((res) => res.json())
      .then((_data) => {
        dispatch(setStates([...boardList, _data]));
      });
  };

  const removeBoard = async (_id: string) =>
    await fetch(`http://localhost:4000/api/board/`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id }),
    })
      .then((res) => res.json())
      .then((_data) => {
        const tempBoards = boardList.filter((board) => board.id != _data.id);
        dispatch(setStates(tempBoards));
        if (_id == selectedBoardID) {
          dispatch(setBoardID(""));
        }
      });

  const updateBoard = async (_id: string, _title: string) => {
    await fetch(`http://localhost:4000/api/board/update`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id, title: _title }),
    })
      .then((res) => res.json())
      .then((_data) => {
        const tempBoard: any[] = [];
        boardList.forEach((board) => {
          if (board.id == _id) {
            tempBoard.push(_data);
          } else {
            tempBoard.push(board);
          }
        });

        dispatch(setStates(tempBoard));
      });
  };

  useEffect(() => {
    getBoard();
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

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className="h-12 flex-shrink-0 bg-slate-900">header</header> */}
      <div className="flex-grow flex overflow-hidden">
        <aside className="w-1/4 bg-[#333333] flex-shrink-0 overflow-auto">
          <div className="flex flex-col gap-4 p-4">
            {boardList.map((board) => (
              <Btn
                isSelected={board.id == selectedBoardID}
                title={board.title}
                boardId={board.id}
                removeBoard={removeBoard}
                updateBoard={updateBoard}
                selectBoardHandler={() => {
                  //selectBoardHandler
                  dispatch(setBoardID(board.id));
                }}
                key={board.id}
              />
            ))}
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
                  addBoard(addBoardName);
                  setAddBoardName("");
                }}
              >
                add
              </Button>
            </div>
          </div>
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
