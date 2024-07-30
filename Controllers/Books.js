const { error } = require("console");
const db = require("../db/dbconncection");
const { faker, tr } = require("@faker-js/faker");

const getBookByName = async function (req, res, next) {
  if (!req.query.name) {
    return next();
  }
  const name = req.query.name.split("+").join(" ");
  try {
    const books = await db.query("SELECT * FROM books WHERE name = $1", [name]);
    if (books.rowCount !== 0) {
      return res.status(200).json({
        success: true,
        body: books.rows,
        message: "",
      });
    } else {
      const err = new Error("cannot find the book");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    const err = new Error("server error");
    return next(err);
  }
};

const getBooks = async function (req, res, next) {
  try {
    const books = await db.query("SELECT * FROM books ORDER BY id ASC");
    res.status(200).json({
      success: true,
      body: books.rows,
      message: "",
    });
  } catch (err) {
    const error = new Error("server error");
    return next(error);
  }
};

const getBookById = async function (req, res, next) {
  const id = Number(req.params.id);
  try {
    const book = await db.query(`SELECT * FROM books WHERE id = ${id}`);
    if (book.rowCount) {
      res.status(200).json({
        success: true,
        body: book.rows,
        message: "",
      });
    } else {
      const err = new Error("cannot find the book");
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    const error = new Error("server error");
    next(error);
  }
};

const deleteBookById = async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const book = await db.query(`SELECT * FROM books WHERE id = ${id}`);
    if (book.rowCount) {
      await db.query(`DELETE FROM books WHERE id = ${id}`);
      res.status(204).json({
        success: true,
        body: book.rows,
        message: "book deleted",
      });
    } else {
      const err = new Error("cannot find the book");
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    const error = new Error("server error");
    return next(error);
  }
};

const addBook = async function (req, res, next) {
  const { name, writer, number, published } = req.body;

  if (name && writer && number && published) {
    try {
      const book = await db.query(
        "INSERT INTO books (name, writer, number, published) VALUES ($1, $2, $3, $4)",
        [name, writer, Number(number), published]
      );
      return res.status(201).json({
        success: true,
        body: {
          name,
          writer,
          number,
          published,
        },
        message: "book added",
      });
    } catch (err) {
      const error = new Error("server error");
      return next(error);
    }
  }
  const err = new Error("fields are not complete");
  err.status = 400;
  return next(err);
};

const updateBook = async function (req, res, next) {
  const id = Number(req.params.id);
  const book = await db.query(`SELECT * FROM books WHERE id = ${id}`);

  if (!book.rowCount) {
    const err = new Error("cannot find the book");
    err.status = 404;
    return next(err);
  }

  const { name, writer, number, published } = req.body;

  if (name && writer && number && published) {
    try {
      const book = await db.query(
        "UPDATE books SET name = $1, writer = $2, number = $3, published = $4 WHERE id = $5",
        [name, writer, Number(number), published, req.params.id]
      );
      return res.status(200).json({
        success: true,
        body: {
          name,
          writer,
          number,
          published,
        },
        message: "book updated",
      });
    } catch (err) {
      const error = new Error("server error");
      return next(error);
    }
  }

  return res.status(400).json({
    success: false,
    body: {},
    message: "fields are not complete",
  });
};
module.exports = {
  getBooks,
  getBookById,
  deleteBookById,
  addBook,
  updateBook,
  getBookByName,
};
