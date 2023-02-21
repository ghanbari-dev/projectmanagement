import {
  DeleteTwoTone,
  EditTwoTone,
  MoreHorizTwoTone,
} from "@mui/icons-material";
import { IconButton, Popover } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../../redux/stateSlice";
import { taskType } from "../../types/board";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  task: taskType;
  colID: string;
};

const CellActionBtn = ({ setOpen,colID,task }: Props) => {
  const dispatch = useDispatch();

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
    <>
      <IconButton sx={{ height: "23px", padding: "0" }} onClick={handleClick}>
        <MoreHorizTwoTone sx={{ height: "23px" }} />
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
    </>
  );
};

export default CellActionBtn;
