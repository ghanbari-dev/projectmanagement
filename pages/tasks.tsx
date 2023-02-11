import React from 'react'
import { useSelector } from 'react-redux';
import TodoTemplate from '../components/todo/TodoTemplate';
import { selectBoardID } from '../redux/stateSlice';


const Tasks = () => {

    const selectedBoardID = useSelector(selectBoardID);
  return (
    <>{selectedBoardID ? <TodoTemplate />:<div>select board from side bar</div>}</>
  )
}

export default Tasks