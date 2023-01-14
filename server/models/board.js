const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: { type: String, required: [true, "Please add Board title"] },
    order: { type: Number, default: -1 },
    column: [
      {
        title: { type: String, required: [true, "Please add Column title"] },
        order: { type: Number, default: -1 },
        task: [
          {
            title: { type: String, required: [true, "Please add task title"] },
            order: { type: Number, default: -1 },
          },
        ],
      },
    ],
    users: [
      {
        userID: { type: String, required: [true, "No user !!!!"] },
        role: { type: String, default: "none" },
      },
    ],
  },
  schemaOptions
);

module.exports = mongoose.model("Board", boardSchema);
