const fs = require("fs");

function adventPt1(rows) {
  let total = 0;
  rows.forEach((row, rowIndex, grid) => {
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const [center, up, down, left, right] = getLocations(
        grid,
        rowIndex,
        colIndex
      );
      const isLowest = checkIsLowest(center, up, down, left, right);
      if (isLowest) total += center + 1;
    }
  });
  console.log(total);
}

function getLocations(grid, row, col) {
  const center = +grid[row][col];
  const up = row > 0 ? +grid[row - 1][col] : 9;
  const down = row + 1 < grid.length ? +grid[row + 1][col] : 9;
  const left = col > 0 ? +grid[row][col - 1] : 9;
  const right = col + 1 < grid[row].length ? +grid[row][col + 1] : 9;
  return [center, up, down, left, right];
}

function getBasin(grid, row, col, hasBeenChecked = []) {
  const [center, up, down, left, right] = getLocations(grid, row, col);
  hasBeenChecked.push(`${row}, ${col}`);
  if (!hasBeenChecked.includes(`${row - 1}, ${col}`) && up < 9)
    getBasin(grid, row - 1, col, hasBeenChecked);
  if (!hasBeenChecked.includes(`${row + 1}, ${col}`) && down < 9)
    getBasin(grid, row + 1, col, hasBeenChecked);
  if (!hasBeenChecked.includes(`${row}, ${col - 1}`) && left < 9)
    getBasin(grid, row, col - 1, hasBeenChecked);
  if (!hasBeenChecked.includes(`${row}, ${col + 1}`) && right < 9)
    getBasin(grid, row, col + 1, hasBeenChecked);
  return hasBeenChecked;
}

function checkIsLowest(target, ...nums) {
  return nums.every((n) => n > target);
}

function adventPt2(rows) {
  const basinSizes = [];
  rows.forEach((row, rowIndex, grid) => {
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const [center, up, down, left, right] = getLocations(
        grid,
        rowIndex,
        colIndex
      );
      const isLowest = checkIsLowest(center, up, down, left, right);
      if (isLowest) {
        const basin = getBasin(grid, rowIndex, colIndex);
        basinSizes.push(basin.length);
      }
    }
  });
  basinSizes.sort((a, b) => b - a);
  console.log(
    basinSizes.reduce((acc, curr, i) => {
      if (i < 3) return acc * curr;
      return acc;
    }, 1)
  );
}

fs.readFile("./day9/data.txt", "utf-8", (err, data) => {
  const rows = data.split("\n");
  adventPt2(rows);
});
