const asyncHandler = require("express-async-handler");
const Board = require("../models/board");

const getColumns = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.findById(req.body.id);
  const columns = board.column;
  res.status(200).json(columns);
});

/* const getColumn = asyncHandler(async (req, res) => {
  const column = await Column.findById(req.body.id);
  res.status(200).json(column);
}); */

const setColumn = asyncHandler(async (req, res) => {
  if (!req.body.id || !req.body.title || !req.body.userID) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.findById(req.body.id);

  const column = [...board.column];
  column.push({ title: req.body.title });

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

const deleteColumn = asyncHandler(async (req, res) => {

  if (!req.body.id || !req.body.colID || !req.body.userID) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.findById(req.body.id);

  const newCol = board.column.filter((col) => col.id != req.body.colID);
  const newBoard = await Board.findByIdAndUpdate(
    req.body.id,
    {
      column: newCol,
    },
    {
      new: true,
    }
  );

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

const updateColumn = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.id);

  if (!board) {
    res.status(400);
    throw new Error("Column not found");
  }

  console.log(req.body);

  const updatedColumn = await Board.findByIdAndUpdate(req.body.id, {column:req.body.column}, {
    new: true,
  });

  console.log(updatedColumn);
  
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

/* const deleteColumn = asyncHandler(async (req, res) => {
  const Column = await Column.findById(req.body.id);

  if (!Column) {
    res.status(400);
    throw new Error("Column not found");
  }

  await Column.remove();

  res.status(200).json({ id: req.body.id });
}); */

module.exports = {
  //getColumn,
  getColumns,
  setColumn,
  updateColumn,
  deleteColumn,
};
