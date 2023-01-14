const express = require("express");
const router = express.Router();
const {
  getBoard,
  setBoard,
  updateBoard,
  deleteBoard,
  getBoards,
} = require("../controllers/board");

router.route("/").put(getBoards).post(setBoard).delete(deleteBoard);
router.route("/update").put(updateBoard);
router.route("/:id").get(getBoard);

module.exports = router;
