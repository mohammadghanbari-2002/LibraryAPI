const express = require("express");
const {
  getBooks,
  getBookById,
  deleteBookById,
  addBook,
  updateBook,
  getBookByName,
  updateNumber,
} = require("../Controllers/Books");
const router = express.Router();

router.get("/", getBookByName);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBookById);
router.post("/", addBook);
router.put("/updatebooknumber/:id", updateNumber);
router.put("/:id", updateBook);
module.exports = router;
