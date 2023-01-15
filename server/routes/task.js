const express = require("express");
const router = express.Router();
const {
  setTask,
} = require("../controllers/task");

router.route("/").post(setTask);//.delete(deleteColumn);
//router.route("/:id").put(updateColumn).delete(deleteColumn);
//router.route("/:id").get(getColumn);

module.exports = router;
