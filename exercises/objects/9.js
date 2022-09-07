const obj = {
  a: 1,
  b: 0,
  c: "aa",
  1: 22,
  5: false,
};

const changeObj = (obj) => {
  const result = {};

  for (let key in obj) {
    if (obj[key]) {
      console.log(key + " " + obj[key]);
      result[key] = obj[key];
    }
  }

  return result;
};

const validObj = changeObj(obj);
Object.entries(validObj).forEach((item) => {
  console.log(item);
});
