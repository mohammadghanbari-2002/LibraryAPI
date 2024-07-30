const express = require("express");
require("dotenv").config();
const books = require("./routes/Books");
const errorHandler = require("./Middlewares/errorHandler");
const app = express();
async function start() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("hello");
    console.log(` Running on port ${port}`);
  });
}

start();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.json({
    info: "Hello  world!",
  });
});
app.use("/api/books", books);
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ message: "not  Found" });
});
