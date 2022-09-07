const obj = {
  a: 1,
  b: 0,
  c: "aa",
  1: 22,
  5: true,
};

const changeObj = (obj) => {
  let result = {};
  const pairs = Object.entries(obj);

  for (let pair of pairs) {
    result[pair[1]] = pair[0];
  }

  return result;
};

const changeObj2 = (obj) => {
  let result = {};

  for (let item in obj) {
    result[obj[item]] = item;
  }

  return result;
};

console.log("S1", changeObj(obj));
console.log("S2", changeObj2(obj));
