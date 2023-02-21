import { Box, Button, Modal, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { columnType } from "../../types/board";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  callback: (id: string, title: string) => void
  colData: columnType;
};

const ColumnEdit = ({ open, setOpen, colData, callback }: Props) => {
  const [text, setText] = useState(colData.title);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setText(colData.title);
      }}
    >
      <Box className="absolute grid grid-cols-2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 gap-4 bg-white">
        <TextField
          label="Title"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={() => {
            callback(colData.id, text);
            setOpen(false);
          }}
        >
          Done
        </Button>
        <div className="flex flex-col"></div>
      </Box>
    </Modal>
  );
};

export default ColumnEdit;
