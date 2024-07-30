const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "LibraryDB",
});

pool.connect((err) => {
  if (err) console.log("not connected");
  else console.log("connected");
});
module.exports = pool;
