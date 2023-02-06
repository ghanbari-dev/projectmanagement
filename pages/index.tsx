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
  addBoard,
} from "../redux/stateSlice";

const Home: NextPage = () => {
  const [addBoardName, setAddBoardName] = useState("");

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
                selectBoardHandler={() => {
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
                  addBoards(addBoardName);
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
