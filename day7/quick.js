const fs = require("fs");

fs.readFile("./day7/data.txt", "utf-8", (err, data) => {
  console.log(data);
  const nums = data.split(",").map((s) => +s);
  const testCrabs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  console.log(advent(nums));
});

function findFuelToMove(nums, aim) {
  let total = 0;
  nums.forEach((num) => {
    if (aim - num >= 0) {
      total += sum(aim - num);
    } else if (aim - num < 0) {
      total += sum(num - aim);
    }
  });
  return total;
}

function findRange(nums) {
  return [Math.min(...nums), Math.max(...nums)];
}

function advent(nums) {
  const [min, max] = findRange(nums);
  const potentialMoves = [];
  for (let i = min; i <= max; i++) {
    potentialMoves.push(i);
  }
  const allDistances = potentialMoves.map((target) => {
    return findFuelToMove(nums, target);
  });
  return Math.min(...allDistances);
}

function sum(n) {
  if (n <= 1) return n;
  return n + sum(n - 1);
}
