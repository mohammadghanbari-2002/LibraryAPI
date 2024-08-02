const { faker, tr } = require("@faker-js/faker");
const db = require("../db/dbconncection.js");
function getname(name) {
  let idx = name.indexOf("'");
  if (idx !== -1) {
    name = name.split("'").join("''");
  }
  return name;
}
function generateBook() {
  let queryString =
    "INSERT INTO books (name,writer,number,published) VALUES (" +
    "'" +
    [
      getname(
        faker.commerce.productName() +
          faker.music.songName() +
          faker.person.jobTitle()
      ),
      getname(faker.person.fullName()),
      faker.number.int({ min: 1, max: 99999999 }),
      faker.date.past().toDateString(),
    ].join("','") +
    "'" +
    ")";
  return queryString;
}

console.log(
  getname(
    faker.commerce.productName() +
      faker.music.songName() +
      faker.person.jobTitle()
  )
);
const querying = async function () {
  try {
    for (i = 0; i < 2000000; i++) {
      const gen = generateBook();
      // console.log(gen);
      await db.query(gen);
    }

    console.log("done");
  } catch (err) {
    console.error(err);
  }
};
querying();
