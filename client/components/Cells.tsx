import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { tasksType } from "./TodoTypes";

type Props = { id: string; index: number; tasks: tasksType };

const Cells = ({ id, index, tasks }: Props) => {
  return (
    <Draggable draggableId={id} index={index} key={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? "bg-gray-200" : "bg-white"}
        >
          <div className="p-3">{tasks[id as keyof typeof tasks].content}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Cells;
