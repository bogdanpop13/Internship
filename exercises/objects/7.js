const obj = {
  a: 1,
  b: 0,
  c: "aa",
  1: 22,
  5: NaN,
};

const array_obj = (obj) => {
  const result = [];
  const pairs = Object.entries(obj);

  for (let pair of pairs) {
    let newObj = {};
    newObj[pair[0]] = Math.random();
    newObj["value_copy"] = pair[1];
    result.push(newObj);
  }

  return result;
};

const array_obj2 = (obj) => {
  const result = [];

  for (let item in obj) {
    result.push({
      item: Math.random(),
      value_copy: obj[item],
    });
  }

  return result;
};

console.log("S1");
array_obj(obj).forEach((item) => {
  console.log(item);
});

console.log("S2");
array_obj2(obj).forEach((item) => {
  console.log(item);
});
