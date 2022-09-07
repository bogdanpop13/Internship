const arr = [10, -1, 0, 11, 2, -6, 5, 8, -11];
const len = arr.length;

let pos = 0,
  neg = 0,
  nul = 0;

for (item of arr) {
  pos += item > 0 ? 1 : 0;
  neg += item < 0 ? 1 : 0;
  nul += item === 0 ? 1 : 0;
}

console.log((100 * pos) / len, (100 * neg) / len, (100 * nul) / len);
