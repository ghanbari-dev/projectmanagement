import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FavoriteTwoTone,
  HeartBrokenTwoTone,
  MoreHorizTwoTone,
  // PanToolTwoTone,
} from "@mui/icons-material";
import { Button, IconButton, Popover, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeBoard,
  setFavoriteBoard,
  updateBoard,
} from "../../redux/stateSlice";
import { boardType } from "../../types/board";
// import { getColor } from "../../utils/getColor";

type Props = {
  board: boardType;
  selectBoardHandler: (_id: string) => void;
  isSelected: boolean;
  open: boolean;
  index: number;
};

const BoardBtn = ({
  board,
  selectBoardHandler,
  isSelected,
  open,
  index,
}: Props) => {
  const [text, setText] = useState(board.title);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const removeBoards = (_id: string) => {
    dispatch(removeBoard(_id));
  };
  const updateBoards = (id: string, title: string) => {
    dispatch(updateBoard({ id, title }));
  };

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
      {!open ? (
        <div className="flex flex-col items-center gap-2">
          <Button
            fullWidth
            color="secondary"
            variant={isSelected ? "contained" : "outlined"}
            className="p-2 flex-grow"
            onClick={() => selectBoardHandler(board.id)}
            // onDoubleClick={() => setEditMode(true)}
          >
            {board.title}
          </Button>
        </div>
      ) : !editMode ? (
        <div
          className={
            "flex items-center gap-4 rounded-md -mx-3 px-[14px] -my-[10px] py-[5px] h-[39px]" +
            (isSelected ? " bg-[#5030E514]" : "")
          }
        >
          {board.favorite ? (
            <FavoriteTwoTone color={isSelected ? "error" : "inherit"} />
          ) : (
            <div
              className={
                "rounded-full h-2 w-2 " +
                (index % 4 === 0
                  ? "bg-[#7AC555]"
                  : index % 4 === 1
                  ? "bg-[#FFA500]"
                  : index % 4 === 2
                  ? "bg-[#E4CCFD]"
                  : "bg-[#76A5EA]") //+ getColor(index, "bg")
              }
            />
          )}
          <div
            className={
              "font-semibold flex-grow leading-[19px]" +
              (isSelected ? " text-black" : "")
            }
            onClick={() => selectBoardHandler(board.id)}
            // onDoubleClick={() => setEditMode(true)}
          >
            {board.title}
          </div>
          {isSelected && (
            <IconButton
              sx={{ height: "16px", width: "16px" }}
              onClick={handleClick}
            >
              <MoreHorizTwoTone />
            </IconButton>
          )}
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
            <div className="flex flex-col items-center justify-center w-full p-2">
              <div
                className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                onClick={() => {
                  removeBoards(board.id);
                  setAnchorEl(null);
                }}
              >
                <div>Delete</div>
                <IconButton size="small">
                  <DeleteTwoTone color="warning" />
                </IconButton>
              </div>
              <div
                className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                onClick={() => {
                  setEditMode(true);
                  setAnchorEl(null);
                }}
              >
                <div>Edit</div>
                <IconButton size="small">
                  <EditTwoTone color="primary" />
                </IconButton>
              </div>
              {/* <div className="flex justify-between items-center w-full">
                <div>Drag</div>
                <IconButton size="small">
                  <PanToolTwoTone color="secondary" />
                </IconButton>
              </div> */}
              <div
                className="flex justify-between items-center w-full cursor-pointer hover:bg-[#5030E514] p-1"
                onClick={() => {
                  dispatch(setFavoriteBoard(board.id));
                  setAnchorEl(null);
                }}
              >
                <div>Favorite</div>
                <IconButton size="small">
                  {board.favorite ? (
                    <HeartBrokenTwoTone color="disabled" />
                  ) : (
                    <FavoriteTwoTone color="error" />
                  )}
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
                updateBoards(board.id, text);
                setEditMode(false);
              }}
            >
              <CheckCircleTwoTone color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditMode(false);
                setText(board.title);
              }}
            >
              <CancelTwoTone color="error" />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardBtn;
