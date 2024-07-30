const { faker, tr } = require("@faker-js/faker");
const db = require("../db/dbconncection.js");
function getname() {
  while (true) {
    let name = faker.person.fullName();
    if (name.indexOf("'") === -1) return name;
  }
}
function generateBook() {
  let queryString =
    "INSERT INTO books (name,writer,number,published) VALUES (" +
    "'" +
    [
      faker.commerce.productName(),
      getname(),
      faker.number.int({ min: 1, max: 99999999 }),
      faker.date.past().toDateString(),
    ].join("','") +
    "'" +
    ")";
  return queryString;
}

try {
  for (i = 0; i < 1000; i++) {
    const gen = generateBook();
    console.log(gen);
    db.query(gen);
  }
} catch (err) {
  console.error(err);
}
