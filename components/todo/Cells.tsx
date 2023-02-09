import {
  CancelTwoTone,
  ChatTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FileCopyTwoTone,
  MoreHorizTwoTone,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../redux/stateSlice";
import { taskType } from "../../types/board";

type Props = { index: number; task: taskType; colID: string };

const Cells = ({ index, task, colID }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [tempTask, setTempTask] = useState<taskType>(task);

  const [text, setText] = useState(task.title);
  const [editMode, setEditMode] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          {!editMode ? (
            <div className="flex justify-between items-center">
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
              <IconButton size="small" onClick={handleClick}>
                <MoreHorizTwoTone />
              </IconButton>
              <Popover
                id={!!anchorEl ? "simple-popover" : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="p-2">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                    onClick={() => {
                      // setEditMode(true);
                      setAnchorEl(null);
                      setOpen(true);
                    }}
                  >
                    <div>Edit</div>
                    <IconButton size="small">
                      <EditTwoTone color="primary" />
                    </IconButton>
                  </div>
                  <div
                    className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                    onClick={() => {
                      dispatch(removeTask({ colID: colID, taskID: task.id }));
                      setAnchorEl(null);
                    }}
                  >
                    <div>Delete</div>
                    <IconButton size="small">
                      <DeleteTwoTone color="error" />
                    </IconButton>
                  </div>
                </div>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-white opacity-50 rounded-md p-2">
              <TextField
                className="flex-grow max-w-[80%]"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <div className="flex flex-col">
                <IconButton
                  onClick={() => {
                    dispatch(
                      updateTask({
                        colID: colID,
                        taskID: task.id,
                        task: tempTask,
                      })
                    );
                    setEditMode(false);
                  }}
                >
                  <CheckCircleTwoTone color="success" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditMode(false);
                    setText(task.title);
                  }}
                >
                  <CancelTwoTone color="error" />
                </IconButton>
              </div>
            </div>
          )}
          <div className="mt-1 text-[#0D062D] text-lg leading-[22px] font-semibold">
            {task.title}
          </div>
          {task?.image && (
            <div className="w-full min-h-[100px] relative">
              <Image
                alt="img"
                src={task.image}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          )}
          {task?.description && (
            <div className="mt-[6px] text-xs leading-[14px] font-normal">
              {task.description}
            </div>
          )}

          <div className="mt-[28px] flex items-center space-x-4">
            <div className="flex-grow flex">
              {task?.users && (
                <AvatarGroup
                  max={4}
                  componentsProps={{
                    additionalAvatar: {
                      sx: {
                        height: "24px",
                        width: "24px",
                        background: "#F4D7DA",
                        color: "#D25B68",
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  {task.users.map((a) => (
                    <Avatar key={a} sx={{ height: "24px", width: "24px" }}>
                      {a}
                    </Avatar>
                  ))}
                </AvatarGroup>
              )}
            </div>

            <div className="text-xs leading-[14px] font-medium">
              <ChatTwoTone style={{ height: "16px", width: "16px" }} />
              <span className="ml-1">{task?.comments?.length || "0"} </span>
              <span>
                {task?.comments && task.comments.length > 0
                  ? "comments"
                  : "comment"}
              </span>
            </div>
            <div className="text-xs leading-[14px] font-medium">
              <FileCopyTwoTone style={{ height: "16px", width: "16px" }} />
              <span className="ml-1">{task?.files?.length || "0"} </span>
              <span>
                {task?.files && task.files.length > 0 ? "files" : "file"}
              </span>
            </div>
          </div>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
              setTempTask(task);
            }}
          >
            <Box className="absolute grid grid-cols-2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 gap-4 bg-white">
              <TextField
                label="Title"
                value={tempTask.title}
                onChange={(e) => {
                  setTempTask({ ...tempTask, title: e.target.value });
                }}
              />
              <TextField
                label="Description"
                value={tempTask.description}
                onChange={(e) => {
                  setTempTask({ ...tempTask, description: e.target.value });
                }}
              />
              <TextField
                label="image"
                value={tempTask.image}
                onChange={(e) => {
                  setTempTask({ ...tempTask, image: e.target.value });
                }}
              />
              <FormControl>
                <InputLabel htmlFor="priority">priority</InputLabel>
                <Select
                  id="priority"
                  label="priority"
                  value={tempTask.priority}
                  onChange={(e: SelectChangeEvent) => {
                    setTempTask({
                      ...tempTask,
                      priority: e.target.value as "High" | "Low" | "Completed",
                    });
                  }}
                  defaultValue="Low"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="users"
                value={tempTask.users}
                onChange={(e) =>
                  setTempTask({
                    ...tempTask,
                    users: e.target.value.split(","),
                  })
                }
              />
              <TextField
                label="comments"
                value={tempTask.comments}
                onChange={(e) =>
                  setTempTask({
                    ...tempTask,
                    comments: e.target.value.split(","),
                  })
                }
              />
              <TextField
                label="files"
                value={tempTask.files}
                onChange={(e) =>
                  setTempTask({
                    ...tempTask,
                    files: e.target.value.split(","),
                  })
                }
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch(
                    updateTask({
                      colID: colID,
                      taskID: task.id,
                      task: tempTask,
                    })
                  );
                  setOpen(false);
                }}
              >
                Done
              </Button>
              <div className="flex flex-col"></div>
            </Box>
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default Cells;
