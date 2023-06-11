const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 82;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/uploads", express.static("uploads"));

const articlesRouter = require("./routes/Articles");
const authRouter = require("./routes/Users");
const favouritesRouter = require("./routes/Favourites");

app.use("/articles", articlesRouter);
app.use("/", authRouter);
app.use("/", favouritesRouter);

mongoose.connect("mongodb://127.0.0.1:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
