const fs = require("fs");
fs.readFile("./day4-nums.txt", "utf-8", (err, numsString) => {
  const nums = numsString.split(",").map((n) => +n);
  fs.readFile("./day4-boards.txt", "utf-8", (err, data) => {
    const boardsData = data.split("\n");
    const cleanBoards = [];
    for (let i = 0; i < boardsData.length; i += 6) {
      cleanBoards.push([
        boardsData[i],
        boardsData[i + 1],
        boardsData[i + 2],
        boardsData[i + 3],
        boardsData[i + 4],
      ]);
    }
    let boards = cleanBoards.map((boardData) => createBoard(boardData));
    let boardsCopy = [...boards];
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      for (let j = 0; j < boards.length; j++) {
        const currentBoard = boards[j];
        currentBoard.markNum(num);
        if (currentBoard.checkComplete()) {
          boardsCopy = boardsCopy.filter((b) => b !== currentBoard);
          if (boardsCopy.length === 0) {
            console.log(currentBoard.getScore() * num);
            return;
          }
        }
      }
    }
  });
});

function createBoard(boardData) {
  const newBoard = {};
  const grid = boardData.map((row) => {
    return row
      .split(" ")
      .filter((s) => s !== "")
      .map((n) => +n);
  });
  newBoard.grid = grid;
  newBoard.markedNums = [];
  newBoard.markNum = markNum;
  newBoard.checkComplete = checkComplete;
  newBoard.checkCol = checkCol;
  newBoard.checkRow = checkRow;
  newBoard.getScore = getScore;
  newBoard.total = newBoard.grid.reduce((total, row) => {
    return total + row.reduce((total, num) => total + num, 0);
  }, 0);

  return newBoard;
}

function markNum(num) {
  const isOnBoard = this.grid.some((row) => {
    return row.some((n) => n === num);
  });
  if (isOnBoard) this.markedNums.push(num);
}
function checkComplete() {
  let bingo = false;
  for (let i = 0; i < 5; i++) {
    if (this.checkRow(i) || this.checkCol(i)) {
      bingo = true;
    }
  }
  return bingo;
}
function checkRow(i) {
  const rowToCheck = this.grid[i];
  return rowToCheck.every((number) => {
    return this.markedNums.includes(number);
  });
}
function checkCol(i) {
  const colToCheck = [
    this.grid[0][i],
    this.grid[1][i],
    this.grid[2][i],
    this.grid[3][i],
    this.grid[4][i],
  ];
  return colToCheck.every((number) => {
    return this.markedNums.includes(number);
  });
}
function getScore() {
  return this.total - this.markedNums.reduce((acc, num) => acc + num, 0);
}
