import React, { ReactNode, useState } from "react";

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
    <div className={isSelected ? "bg-gray-400" : ""}>
      {!edithMode ? (
        <div className="flex gap-2">
          <button
            className="p-2 border flex-grow"
            onClick={() => selectBoardHandler(boardId)}
            onDoubleClick={() => setEdithMode(true)}
          >
            {title}
          </button>
          <button className="p-2 border" onClick={() => removeBoard(boardId)}>
            x
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            className="flex-grow max-w-[80%]"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="flex flex-col">
            <button
              className="p-2 border"
              onClick={() => {
                updateBoard(boardId, text);
                setEdithMode(false);
              }}
            >
              +
            </button>
            <button
              className="p-2 border"
              onClick={() => {
                setEdithMode(false);
                setText(title);
              }}
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Btn;
