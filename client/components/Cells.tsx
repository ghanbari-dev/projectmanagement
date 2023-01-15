import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { tasksType, taskType } from "./TodoTypes";

type Props = { id: string; index: number; task: taskType };

const Cells = ({ id, index, task }: Props) => {
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={"text-black rounded-xl ring-2 ring-black"+(snapshot.isDragging ? " bg-gray-200" : " bg-white")}
        >
          <div className="p-3">{task.title}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Cells;
