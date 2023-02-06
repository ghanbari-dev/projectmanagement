import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FavoriteTwoTone,
  PanToolTwoTone,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeBoard,
  setFavoriteBoard,
  updateBoard,
} from "../redux/stateSlice";
import { boardType } from "../types/board";

type Props = {
  board: boardType;
  selectBoardHandler: (_id: string) => void;
  isSelected: boolean;
  open: boolean;
};

const BoardBtn = ({ board, selectBoardHandler, isSelected, open }: Props) => {
  const [text, setText] = useState(board.title);
  const [edithMode, setEdithMode] = useState(false);
  const dispatch = useDispatch();

  const removeBoards = (_id: string) => {
    dispatch(removeBoard(_id));
  };
  const updateBoards = (id: string, title: string) => {
    dispatch(updateBoard({ id, title }));
  };

  return (
    <div className="text-black">
      {!open ? (
        <div className="flex flex-col items-center gap-2">
          <Button
            fullWidth
            color="secondary"
            variant={isSelected ? "contained" : "outlined"}
            className="p-2 flex-grow"
            onClick={() => selectBoardHandler(board.id)}
            // onDoubleClick={() => setEdithMode(true)}
          >
            {board.title}
          </Button>
        </div>
      ) : !edithMode ? (
        <div className="flex flex-col items-center gap-2">
          <Button
            fullWidth
            color="secondary"
            variant={isSelected ? "contained" : "outlined"}
            className="p-2 flex-grow"
            onClick={() => selectBoardHandler(board.id)}
            // onDoubleClick={() => setEdithMode(true)}
          >
            {board.title}
          </Button>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <IconButton size="small" onClick={() => removeBoards(board.id)}>
                <DeleteTwoTone color="warning" />
              </IconButton>
              <IconButton size="small" onClick={() => setEdithMode(true)}>
                <EditTwoTone color="primary" />
              </IconButton>
            </div>
            <div className="flex items-center">
              <IconButton size="small">
                <PanToolTwoTone color="secondary" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  dispatch(setFavoriteBoard(board.id));
                }}
              >
                <FavoriteTwoTone
                  color={board.favorite ? "error" : "disabled"}
                />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-white opacity-50 rounded-lg p-2">
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
                setEdithMode(false);
              }}
            >
              <CheckCircleTwoTone color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                setEdithMode(false);
                setText(board.title);
              }}
            >
              <CancelTwoTone color="error" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardBtn;
