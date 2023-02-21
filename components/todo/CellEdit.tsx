import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { taskType } from "../../types/board";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  task?: taskType;
  callback: (tempTask: taskType) => void;
};

const CellEdit = ({
  open,
  setOpen,
  task = { id: "", order: -1, priority: "Low", title: "" },
  callback,
}: Props) => {
  const [tempTask, setTempTask] = useState<taskType>(task);

  return (
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
            setTempTask({
              ...tempTask,
              image: e.target.value.split(","),
            });
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
            callback(tempTask);
            task.id === "" && setTempTask(task);
            setOpen(false);
          }}
        >
          {task.id !== "" ? "Done" : "Add"}
        </Button>
        <div className="flex flex-col"></div>
      </Box>
    </Modal>
  );
};

export default CellEdit;
