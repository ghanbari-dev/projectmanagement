import type { NextPage } from "next";
import { useSelector } from "react-redux";
import TodoTemplate from "../components/todo/TodoTemplate";
import { selectBoardID } from "../redux/stateSlice";

const Home: NextPage = () => {
  const selectedBoardID = useSelector(selectBoardID);

  return (
    <>
      {selectedBoardID ? (
        <TodoTemplate />
      ) : (
        <div>select board from side bar</div>
      )}
    </>
  );
};

export default Home;
