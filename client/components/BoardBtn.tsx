import {
  CancelTwoTone,
  CheckCircleTwoTone,
  DeleteTwoTone,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, {  useState } from "react";

type Props = {
  title: string;
  boardId: string;
  removeBoard: (_id: string) => Promise<void>;
  updateBoard: (_id: string, title: string) => Promise<void>;
  selectBoardHandler: (_id: string) => void;
  isSelected: boolean;
};

const Btn = ({
  title,
  boardId,
  removeBoard,
  updateBoard,
  selectBoardHandler,
  isSelected,
}: Props) => {
  const [text, setText] = useState(title);
  const [edithMode, setEdithMode] = useState(false);

  return (
    <div className="text-black">
      {!edithMode ? (
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            variant={isSelected ? "contained" : "outlined"}
            className="p-2 flex-grow"
            onClick={() => selectBoardHandler(boardId)}
            onDoubleClick={() => setEdithMode(true)}
          >
            {title}
          </Button>
          <IconButton onClick={() => removeBoard(boardId)}>
            <DeleteTwoTone color="error" />
          </IconButton>
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
                updateBoard(boardId, text);
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
