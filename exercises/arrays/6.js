const x = 0;

function levels(x) {
  if (x < 1) {
    return 0;
  }
  let level = 1;
  let sum = 1;

  while (x >= sum + level) {
    level++;
    sum += level;
  }

  return level;
}

console.log(levels(x));

function printStairs(levels) {
  for (let i = 0; i < levels; i++) {
    console.log(" ".repeat(levels - i - 1) + "#".repeat(i + 1));
  }
}

printStairs(levels(x));
