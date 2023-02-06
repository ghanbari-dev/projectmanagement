import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeBoard, updateBoard } from "../redux/stateSlice";

type Props = {
  title: string;
  boardId: string;
  selectBoardHandler: (_id: string) => void;
  isSelected: boolean;
};

const Btn = ({ title, boardId, selectBoardHandler, isSelected }: Props) => {
  const [text, setText] = useState(title);
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
      {!edithMode ? (
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            variant={isSelected ? "contained" : "outlined"}
            className="p-2 flex-grow"
            onClick={() => selectBoardHandler(boardId)}
            // onDoubleClick={() => setEdithMode(true)}
          >
            {title}
          </Button>
          <div className="flex items-center justify-center">
            <IconButton size="small" onClick={() => setEdithMode(true)}>
              <EditTwoTone color="primary" />
            </IconButton>
            <IconButton size="small" onClick={() => removeBoards(boardId)}>
              <DeleteTwoTone color="error" />
            </IconButton>
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
                updateBoards(boardId, text);
                setEdithMode(false);
              }}
            >
              <CheckCircleTwoTone color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                setEdithMode(false);
                setText(title);
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

export default Btn;
