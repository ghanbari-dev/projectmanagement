const asyncHandler = require("express-async-handler");
const Board = require("../models/board");
const List = require("../models/column");

const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find();
  res.status(200).json(boards);
});

const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);
  res.status(200).json(board);
});

const setBoard = asyncHandler(async (req, res) => {
  if (!req.body.tasks || !req.body.columns || !req.body.columnOrder) {
    res.status(400);
    throw new Error("add required items");
  }
  const board = await Board.create({ ...req.body });

  const list = await List.create({
    _id: board.id,
    title: req.body.title,
    order: -1,
  });

  res.status(200).json({ board: board, list: list });
});

const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!board) {
    res.status(400);
    throw new Error("board not found");
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBoard);
});

const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error("board not found");
  }

  await board.remove();
  await List.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const getList = asyncHandler(async (req, res) => {
  const list = await List.find({}, { _id: 0, id: "$_id", title: 1, order: 1 });
  res.status(200).json(list);
});

const updateList = asyncHandler(async (req, res) => {
  const lists = await List.find();
  lists.forEach(async (list) => {
    const newList = req.body.find((id) => id.id == list.id);
    if (newList) {
      console.log(newList);
      list.order = newList.order;
      await List.findByIdAndUpdate(newList.id, { ...list }, { new: true });
    }
  });

  res.status(200).json(lists);
});

module.exports = {
  getBoard,
  getBoards,
  setBoard,
  updateBoard,
  deleteBoard,
  getList,
  updateList,
};
