const express = require("express");
const router = express.Router();
const {
  //getColumn,
  setColumn,
  //updateColumn,
  deleteColumn,
  getColumns,
} = require("../controllers/column");

router.route("/").get(getColumns).post(setColumn).delete(deleteColumn);
//router.route("/:id").put(updateColumn).delete(deleteColumn);
//router.route("/:id").get(getColumn);

module.exports = router;
