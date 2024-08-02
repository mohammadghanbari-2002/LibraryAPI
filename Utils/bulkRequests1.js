const bulkRequests = async function (n, names) {
  let timeArray = [];
  for (let i = 0; i < n; i++) {
    let idx = Math.floor(Math.random() * names.length);
    let url = `http://localhost:8015/api/books/?name=${names[idx]
      .split(" ")
      .join("+")}`;
    names.splice(idx, 1);

    let start = Date.now();
    let res = await fetch(url);
    //res = await res.json();
    timeArray.push(Date.now() - start);
    console.log(i + ": " + timeArray[i]);
  }

  return timeArray;
};

const percentile = function (arr, p) {
  const index = Math.ceil(p * arr.length);

  return arr[index];
};

let names = [];
fetch(`http://127.0.0.1:8015/api/books`)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    names = res.body.map((arr) => arr.name);
    return names;
  })
  .then(async (names) => {
    console.log(names);
    let a = await bulkRequests(1000, names);
    console.log(a);
    a = a.sort((a, b) => a - b);
    console.log("done sorting!");
    console.log("p50 :" + percentile(a, 0.5));
    console.log("p90 :" + percentile(a, 0.9));
    console.log("p99 :" + percentile(a, 0.99));
    console.log("p999 :" + percentile(a, 0.999));
  })
  .catch((err) => {
    console.log(err);
  });
