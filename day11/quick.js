const fs = require("fs");
const chalk = require("chalk");

class OctoBoi {
  constructor(energyLevel) {
    this.energyLevel = energyLevel;
    this.hasFlashed = false;
  }
  step() {
    if (!this.hasFlashed) this.energyLevel++;
    if (this.energyLevel > 9) {
      this.hasFlashed = true;
    }
  }
  endStep() {
    if (this.hasFlashed) {
      this.hasFlashed = false;
      this.energyLevel = 0;
    }
  }
}

fs.readFile("./day11/data.txt", "utf-8", (err, data) => {
  const rows = data.split("\n");
  pt1(rows);
});

function showOcti(grid) {
  grid.forEach((row) => {
    console.log(
      row.reduce((acc, o) => {
        if (o.energyLevel === 0) {
          acc += chalk.white("0");
        } else acc += chalk.black("0");
        return (acc += " ");
      }, "")
    );
  });
}

function getAdjacent(row, col) {
  const adj = [];
  adj.push([row - 1, col - 1]);
  adj.push([row - 1, col]);
  adj.push([row - 1, col + 1]);
  adj.push([row, col + 1]);
  adj.push([row, col - 1]);
  adj.push([row + 1, col - 1]);
  adj.push([row + 1, col]);
  adj.push([row + 1, col + 1]);
  return adj;
}

function stepOctiBoi(grid, row, col, flashCount = 0) {
  const boi = grid[row][col];
  if (boi.hasFlashed) return flashCount;
  else {
    boi.step();
    if (boi.hasFlashed) {
      flashCount++;
      const adj = getAdjacent(row, col);
      adj.forEach(([row, col]) => {
        if (row >= 0 && row < 10 && col >= 0 && col < 10)
          flashCount += stepOctiBoi(grid, row, col);
      });
    }
  }
  return flashCount;
}

function pt1(rows) {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const octi = new OctoBoi(+rows[i][j]);
      row.push(octi);
    }
    grid.push(row);
  }
  showOcti(grid);
  console.log(" ");
  let flashCount = 0;
  let i = 1;
  while (i <= 100) {
    console.clear();
    grid.forEach((row, rowI) => {
      row.forEach((octi, colI) => {
        flashCount += stepOctiBoi(grid, rowI, colI);
      });
    });
    grid.forEach((row, rowI) => {
      row.forEach((octi, colI) => {
        octi.endStep();
      });
    });
    showOcti(grid);
    sleep(300);
    i++;
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
