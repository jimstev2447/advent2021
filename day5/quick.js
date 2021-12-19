const fs = require("fs");

function createGrid(size) {
  const grid = [];
  for (let i = 0; i <= size; i++) {
    const row = [];
    for (let j = 0; j <= size; j++) row.push(".");
    grid.push(row);
  }
  return grid;
}

function showGraph(grid) {
  const strings = grid.map((r) => r.join(""));
  strings.forEach((row) => {
    console.log(row);
  });
}

function createStraightLine(coord1, coord2) {
  const line = [];
  const [smallestXCoord, largestXCoord] =
    coord1[0] <= coord2[0] ? [coord1, coord2] : [coord2, coord1];
  const [x1, y1] = smallestXCoord;
  const [x2, y2] = largestXCoord;
  for (let x = x1; x <= x2; x++) {
    const [smallestY, largestY] = y1 <= y2 ? [y1, y2] : [y2, y1];
    for (let y = smallestY; y <= largestY; y++) line.push([x, y]);
  }
  return line;
}

function createDiagonalLine(coord1, coord2) {
  const line = [];
  const [smallestXCoord, largestXCoord] =
    coord1[0] <= coord2[0] ? [coord1, coord2] : [coord2, coord1];
  const [x1, y1] = smallestXCoord;
  const [x2, y2] = largestXCoord;
  for (let x = x1; x <= x2; x++) {
    if (y1 > y2) line.push([x, y1 + x1 - x]);
    else line.push([x, y1 + (x - x1)]);
  }
  return line;
}

function plotLines(grid, lines) {
  lines.forEach(([start, end]) => {
    const [x1, y1] = start;
    const [x2, y2] = end;
    const isStraight = x1 === x2 || y1 === y2;
    let line = [];
    if (isStraight) {
      line = createStraightLine(start, end);
    } else {
      line = createDiagonalLine(start, end);
    }
    line.forEach(([x, y]) => {
      grid[y][x] = grid[y][x] === "." ? 1 : grid[y][x] + 1;
    });
  });
}

function countOverLap(grid) {
  let count = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== "." && cell >= 2) count++;
    });
  });
  return count;
}

fs.readFile("./day5/data-day5.txt", "utf-8", (err, data) => {
  const coordStrings = data.split("\n");
  const coords = coordStrings.map((string) => {
    const coords = string
      .split(" -> ")
      .map((str) => [...str.split(",").map((str) => +str)]);
    return coords;
  });
  const grid = createGrid(999);
  plotLines(grid, coords);
  showGraph(grid);
  console.log(countOverLap(grid));
});

const data = [
  [
    [0, 9],
    [5, 9],
  ],
  [
    [8, 0],
    [0, 8],
  ],
  [
    [9, 4],
    [3, 4],
  ],
  [
    [2, 2],
    [2, 1],
  ],
  [
    [7, 0],
    [7, 4],
  ],
  [
    [6, 4],
    [2, 0],
  ],
  [
    [0, 9],
    [2, 9],
  ],
  [
    [3, 4],
    [1, 4],
  ],
  [
    [0, 0],
    [8, 8],
  ],
  [
    [5, 5],
    [8, 2],
  ],
];
const newGrid = createGrid(9);
plotLines(newGrid, data);
showGraph(newGrid);
console.log(countOverLap(newGrid));

function getHorizontal(input) {
  const horizontal = input.filter((coordArr) => coordArr[1] === coordArr[3]);
  return horizontal;
}
function getVertical(input) {
  const vertical = input.filter((coordArr) => coordArr[0] === coordArr[2]);
  return vertical;
}
function getDiagonal(input) {
  const diagonal = input.filter(
    (coordArr) => coordArr[0] !== coordArr[2] && coordArr[1] !== coordArr[3]
  );
  return diagonal;
}
function getUpDiagonal(diagonal) {
  const upDiagonal = diagonal.filter(
    (coordArr) =>
      (coordArr[0] < coordArr[2] && coordArr[1] < coordArr[3]) ||
      (coordArr[0] > coordArr[2] && coordArr[1] > coordArr[3])
  );
  return upDiagonal;
}
function getDownDiagonal(diagonal) {
  const downDiagonal = diagonal.filter(
    (coordArr) =>
      (coordArr[0] > coordArr[2] && coordArr[1] < coordArr[3]) ||
      (coordArr[0] < coordArr[2] && coordArr[1] > coordArr[3])
  );
  return downDiagonal;
}
function upDiagonalPositionOfVents(coordArr, positions) {
  const startX = Math.min(coordArr[0], coordArr[2]);
  const endX = Math.max(coordArr[0], coordArr[2]);
  const startY = Math.min(coordArr[1], coordArr[3]);
  const endY = Math.max(coordArr[1], coordArr[3]);
  for (let i = startX, j = startY; i <= endX; i++, j++) {
    let position = `${i}, ${j}`;
    if (positions.hasOwnProperty(position)) {
      positions[position]++;
    } else {
      positions[position] = 1;
    }
  }
  return positions;
}
function downDiagonalPositionOfVents(coordArr, positions) {
  const startX = Math.min(coordArr[0], coordArr[2]);
  const endX = Math.max(coordArr[0], coordArr[2]);
  const startY = Math.max(coordArr[1], coordArr[3]);
  const endY = Math.min(coordArr[1], coordArr[3]);
  for (let i = startX, j = startY; i <= endX; i++, j--) {
    let position = `${i}, ${j}`;
    if (positions.hasOwnProperty(position)) {
      positions[position]++;
    } else {
      positions[position] = 1;
    }
  }
  return positions;
}
function horizontalPositionOfVents(coordArr, positions) {
  const startX = Math.min(coordArr[0], coordArr[2]);
  const endX = Math.max(coordArr[0], coordArr[2]);
  for (let i = startX; i <= endX; i++) {
    let position = `${i}, ${coordArr[1]}`;
    if (positions.hasOwnProperty(position)) {
      positions[position]++;
    } else {
      positions[position] = 1;
    }
  }
  return positions;
}
function verticalPositionOfVents(coordArr, positions) {
  const startY = Math.min(coordArr[1], coordArr[3]);
  const endY = Math.max(coordArr[1], coordArr[3]);
  for (let i = startY; i <= endY; i++) {
    let position = `${coordArr[0]}, ${i}`;
    if (positions.hasOwnProperty(position)) {
      positions[position]++;
    } else {
      positions[position] = 1;
    }
  }
  return positions;
}
// function findVents(input) {
//   const horizontal = getHorizontal(input);
//   const vertical = getVertical(input);
//   const diagonal = getDiagonal(input);
//   const upDiagonal = getUpDiagonal(diagonal);
//   const downDiagonal = getDownDiagonal(diagonal);
//   let positions = {};
//   vertical.map((coordArr) => verticalPositionOfVents(coordArr, positions));
//   horizontal.map((coordArr) => horizontalPositionOfVents(coordArr, positions));
//   upDiagonal.map((coordArr) => upDiagonalPositionOfVents(coordArr, positions));
//   downDiagonal.map((coordArr) =>
//     downDiagonalPositionOfVents(coordArr, positions)
//   );
//   const pointsArr = Object.values(positions);
//   const overlaps = pointsArr.filter((elem) => elem > 1);
//   console.log(overlaps.length);
// }
