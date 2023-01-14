const asyncHandler = require("express-async-handler");
const Board = require("../models/board");

const getBoards = asyncHandler(async (req, res) => {
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

  // res.status(200).json(boards);

});

const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.id);
  res.status(200).json(board);
});

const setBoard = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.userID) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.create({
    title: req.body.title,
    users: {
      _id: req.body.userID,
      userID: req.body.userID,
      role: "admin",
    },
  });

  res.status(200).json(board);
});

const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.id);

  console.log(req.body.id)

  if (!board) {
    res.status(400);
    throw new Error("board not found");
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  
  res.status(200).json(updatedBoard);
});

const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.id);

  if (!board) {
    res.status(400);
    throw new Error("board not found");
  }

  await board.remove();

  res.status(200).json({ id: req.body.id });
});

module.exports = {
  getBoard,
  getBoards,
  setBoard,
  updateBoard,
  deleteBoard,
};
