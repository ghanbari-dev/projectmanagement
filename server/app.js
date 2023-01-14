const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");


const port = process.env.PORT || "3000";

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const columnRouter = require("./routes/column");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/board", boardRouter);
app.use("/api/boards/column", columnRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`server start on port ${port}`));

module.exports = app;
