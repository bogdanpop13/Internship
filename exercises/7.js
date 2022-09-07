const arr = [1, 2, 3, 4, -5];
const sum = arr.reduce((acc, item) => acc + item, 0)
console.log("max", sum - Math.min(...arr))
console.log("min", sum - Math.max(...arr))