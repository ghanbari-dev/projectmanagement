const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    /* mongoose
  .connect(process.env.MONGODB_URL) */

    console.log(`mongodb connected ${conn.connection.host}`);
    /* .then(() => {
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
    console.log(`mongodb connected ${process.env.MONGODB_URL}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  }); */
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;