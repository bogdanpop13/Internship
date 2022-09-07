let arr = [1, 5, 3, 2, 8, 7, 10, 2, 11];
const x = 4;
const evens = arr.filter((item) => item % 2 === 0);
const bigger = arr.filter((item) => item >= x);
const sum1 = arr.reduce((acc, item) => acc + item, 0);
const sum2 = evens.reduce((acc, item) => acc + item, 0);
const sum3 = bigger.reduce((acc, item) => acc + item, 0);

console.log("sum1", sum1);
console.log("sum2", sum2);
console.log("sum3", sum3);
