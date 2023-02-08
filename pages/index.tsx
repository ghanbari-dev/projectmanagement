import { Divider } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderBar from "../components/layout/HeaderBar";
import SideBar from "../components/layout/SideBar";
import TodoTemplate from "../components/todo/TodoTemplate";
import { selectBoardID } from "../redux/stateSlice";

const Home: NextPage = () => {
  //dispatch(setUID("63bec66661b7a920cc2a0dc2"));

  const selectedBoardID = useSelector(selectBoardID);

  //const [boardList, setBoardList] = useState<boardType[]>(state);

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
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col text-[#787486]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex overflow-hidden">
        <SideBar />
        <div className="flex-grow overflow-auto">
          <HeaderBar />
          <Divider />
          <main className="px-[42px] py-12">
            {selectedBoardID && <TodoTemplate />}
          </main>
        </div>
      </div>
      {/* <footer className="h-12 bg-slate-900">footer</footer> */}
    </div>
  );
};

export default Home;
