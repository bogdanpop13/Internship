const obj = {
  a: 1,
  b: 0,
  c: "aa",
  1: 22,
  5: NaN,
};

const check = (obj, propertyToCheck) => {
  const properties = Object.keys(obj);

  return properties.includes(propertyToCheck);
};

const check2 = (obj, propertyToCheck) => {
  for (key in obj) {
    if (key === propertyToCheck) return true;
  }

  return false;
};

const check3 = (obj, propertyToCheck) => {
  return propertyToCheck in obj;
};

console.log("s1", check(obj, "1"));
console.log("s2", check2(obj, "1"));
console.log("s3", check3(obj, "1"));
