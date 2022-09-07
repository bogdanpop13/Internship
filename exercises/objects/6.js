const obj = {
  a: 1,
  b: 0,
  c: "aa",
  1: 22,
  5: NaN,
};

const arr = (obj) => {
  return Object.entries(obj);
};

arr(obj).forEach((item) => {
  console.log(item);
});

console.log(typeof arr(obj));
