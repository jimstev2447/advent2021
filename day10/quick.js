const fs = require("fs");

function corruptScore(chunk) {
  const syntaxStack = [];
  const pairs = {
    "]": "[",
    ")": "(",
    "}": "{",
    ">": "<",
  };
  const table = {
    "]": 57,
    "}": 1197,
    ")": 3,
    ">": 25137,
  };
  for (let i = 0; i < chunk.length; i++) {
    if (
      chunk[i] === "(" ||
      chunk[i] === "[" ||
      chunk[i] === "<" ||
      chunk[i] === "{"
    ) {
      syntaxStack.push(chunk[i]);
    } else {
      if (syntaxStack[syntaxStack.length - 1] === pairs[chunk[i]]) {
        syntaxStack.pop();
      } else {
        return table[chunk[i]];
      }
    }
  }
  return 0;
}

function autoCompleteScore(chunk) {
  const syntaxStack = [];
  const pairs = {
    "]": "[",
    ")": "(",
    "}": "{",
    ">": "<",
  };
  const table = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };
  for (let i = 0; i < chunk.length; i++) {
    if (
      chunk[i] === "(" ||
      chunk[i] === "[" ||
      chunk[i] === "<" ||
      chunk[i] === "{"
    ) {
      syntaxStack.push(chunk[i]);
    } else {
      if (syntaxStack[syntaxStack.length - 1] === pairs[chunk[i]]) {
        syntaxStack.pop();
      }
    }
  }

  return syntaxStack.reverse().reduce((acc, curr) => {
    return acc * 5 + table[curr];
  }, 0);
}

fs.readFile("./day10/data.txt", "utf-8", (err, data) => {
  const syntaxRows = data.split("\n");
  let total = 0;
  syntaxRows.forEach((row) => {
    total += corruptScore(row);
  });

  const nonCorrupt = syntaxRows.filter((row) => {
    const score = corruptScore(row) === 0;
    total += score;
    return score === 0;
  });

  const completeScores = nonCorrupt.map((row) => {
    return autoCompleteScore(row);
  });
  completeScores.sort((a, b) => a - b);
  console.log(total);
  console.log(nonCorrupt[Math.floor(nonCorrupt.length / 2)]);
});
