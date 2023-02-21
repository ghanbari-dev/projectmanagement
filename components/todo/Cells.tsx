// import {
//   ChatTwoTone,
//   FileCopyTwoTone,
// } from "@mui/icons-material";
import { Avatar, AvatarGroup, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { taskType } from "../../types/board";

import commentIcon from "../../public/icons/message.svg";
import fileIcon from "../../public/icons/Group 628.svg";
import CellEdit from "./CellEdit";
import CellActionBtn from "./CellActionBtn";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/stateSlice";

type Props = { index: number; task: taskType; colID: string };

const Cells = ({ index, task, colID }: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEditTask = (tempTask: taskType) => {
    dispatch(
      updateTask({
        colID: colID,
        taskID: task.id,
        task: tempTask,
      })
    );
  };

  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "rounded-2xl bg-white p-5" +
            (snapshot.isDragging ? " border-2 text-black border-black" : " ") // neon-3")
          }
        >
          <div className="flex justify-between items-center h-[23px]">
            <div
              className={
                "px-[6px] py-1 rounded " +
                (task.priority === "Completed"
                  ? "bg-green-100"
                  : task.priority === "High"
                  ? "bg-red-100"
                  : "bg-orange-100")
              }
            >
              <Typography
                fontSize="12px"
                lineHeight="14px"
                fontWeight="500"
                color={
                  task.priority === "Completed"
                    ? "green"
                    : task.priority === "High"
                    ? "red"
                    : "orange"
                }
              >
                {task.priority}
              </Typography>
            </div>
            <CellActionBtn setOpen={setOpen} task={task} colID={colID} />
          </div>

          <div className="mt-1 text-[#0D062D] text-lg leading-[22px] tracking-[0.043em] font-semibold">
            {task.title}
          </div>
          {task?.image && (
            <div className="w-full mt-[7px] flex gap-3 relative">
              {task.image.map((img, ind) => (
                <div key={ind} className="w-full">
                  <Image
                    alt="img"
                    src={img}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
          {task?.description && (
            <div className="mt-[6px] text-xs leading-[14.5px] font-normal tracking-[0.03em]">
              {task.description}
            </div>
          )}

          <div className="mt-[28px] flex items-center space-x-4">
            <div className="flex-grow flex h-6 items-center">
              {task?.users && (
                <AvatarGroup
                  spacing={4}
                  max={4}
                  componentsProps={{
                    additionalAvatar: {
                      sx: {
                        height: "20px",
                        width: "20px",
                        background: "#F4D7DA",
                        color: "#D25B68",
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  {task.users.map((a) => (
                    <Avatar key={a} sx={{ height: "20px", width: "20px" }}>
                      {a}
                    </Avatar>
                  ))}
                </AvatarGroup>
              )}
            </div>

            <div className="text-xs leading-[14px] font-medium">
              {/* <ChatTwoTone style={{ height: "16px", width: "16px" }} /> */}
              <Image
                src={commentIcon}
                height={16}
                alt="icon"
                className="inline-block"
              />
              <span className="ml-1">{task?.comments?.length || "0"} </span>
              <span>
                {task?.comments && task.comments.length > 0
                  ? "comments"
                  : "comment"}
              </span>
            </div>
            <div className="text-xs leading-[14px] font-medium">
              {/* <FileCopyTwoTone style={{ height: "16px", width: "16px" }} /> */}
              <Image src={fileIcon} alt="icon" className="inline-block" />
              <span className="ml-1">{task?.files?.length || "0"} </span>
              <span>
                {task?.files && task.files.length > 0 ? "files" : "file"}
              </span>
            </div>
          </div>
          <CellEdit
            open={open}
            setOpen={setOpen}
            task={task}
            callback={handleEditTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Cells;
