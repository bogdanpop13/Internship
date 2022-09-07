const obj1 = {
  a: "true",
  b: true,
  c: 3.5,
};

const sumOfEntries = (obj) => {
  const values = Object.values(obj);
  let sum = 0;

  for (let value of values) {
    if (
      !isNaN(value) &&
      String(value) !== "true" &&
      String(value) !== "false"
    ) {
      sum += value;
    }
  }

  return sum;
};

console.log(sumOfEntries(obj1));
