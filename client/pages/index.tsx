import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import TodoTemplate from "../components/TodoTemplate";

const Home: NextPage = () => {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [boardData, setBoardData] = useState();
  const [boardList, setBoardList] = useState([]);

  const getBoardData = async () =>
    await fetch(`http://localhost:4000/${selectedBoard}`)
      .then((res) => res.json())
      .then((_data) => {
        setBoardData(_data);
      });

  const getBoardList = async () =>
    await fetch(`http://localhost:4000/board-list`)
      .then((res) => res.json())
      .then((_data) => {
        setBoardList(_data);
      });

  useEffect(() => {
    getBoardList();
  }, []);

  useEffect(() => {
    if (!selectedBoard) {
      return;
    }
    getBoardData();
  }, [selectedBoard]);

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-12 flex-shrink-0 bg-slate-900">header</header>
      <div className="flex-grow flex overflow-hidden">
        <aside className="bg-sky-900 w-1/4 overflow-auto">
          <div className="flex flex-col gap-4 p-4">
            {boardList.map((board) => (
              <button
                key={board}
                className="p-2 border"
                onClick={() => setSelectedBoard(board)}
              >
                {board}
              </button>
            ))}
          </div>
        </aside>
        <main className="bg-indigo-300 flex-grow overflow-auto">
          {boardData && (
            <TodoTemplate data={boardData} boardName={selectedBoard} />
          )}
        </main>
      </div>
      <footer className="h-12 bg-slate-900">footer</footer>
    </div>
  );
};

export default Home;
