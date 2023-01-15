const asyncHandler = require("express-async-handler");
const Board = require("../models/board");

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.id || !req.body.colID || !req.body.title || !req.body.userID) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.findById(req.body.id);

  const task = board.column.find((col) => col._id == req.body.colID).task;
  task.push({ title: req.body.title });

  const column = [];
  board.column.forEach((col) => {
    if (col._id == req.body.colID) column.push({ ...col, task: task });
    else column.push(col);
  });

  const updatedBoard = await Board.findByIdAndUpdate(req.body.id, {
    column: column,
  });

  const boards = await Board.find();

  const myBoards = [];
  boards.filter((board) => {
    board.users.forEach((u) => {
      if (u.userID === req.body.userID) {
        myBoards.push(board);
        return board;
      }
    });
  });

  res.status(200).json(myBoards);
});

module.exports = {
  setTask,
};
