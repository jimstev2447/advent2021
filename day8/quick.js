const fs = require("fs");

const samples = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];

function adventPt1(data) {
  let count = 0;
  data.forEach((row) => {
    let hasPassedDelimiter = false;
    const codeBits = row.split(" ");
    codeBits.forEach((bit) => {
      if (hasPassedDelimiter) {
        const bitLen = bit.length;
        if (bitLen === 2) count++;
        if (bitLen === 4) count++;
        if (bitLen === 3) count++;
        if (bitLen === 7) count++;
      }
      if (bit === "|") hasPassedDelimiter = true;
    });
  });
  console.log(count);
}

fs.readFile("./day8/data.txt", "utf-8", (err, data) => {
  const info = data.split("\n");
  adventPt2(info);
});

function adventPt2(data) {
  const nums = data.map((row) => {
    const codeBits = row.split(" ");
    const oneChars = codeBits.find((str) => str.length === 2);
    const fourChars = codeBits.find((str) => str.length === 4);

    return codeBits
      .map((code) => {
        const charArr = code.split("");
        const includesOneChars =
          charArr.includes(oneChars[0]) && charArr.includes(oneChars[1]);
        const charsLeftAfterRemovingFour = charArr.filter(
          (char) => !fourChars.includes(char)
        ).length;
        const codeDigits = code.length;
        if (code === "|") {
          return "|";
        } else if (codeDigits === 2) {
          return 1;
        } else if (codeDigits === 3) {
          return 7;
        } else if (codeDigits === 4) {
          return 4;
        } else if (codeDigits === 7) {
          return 8;
        } else if (codeDigits === 6) {
          if (includesOneChars) {
            const isZero = charsLeftAfterRemovingFour === 3;
            if (isZero) {
              return 0;
            } else {
              return 9;
            }
          } else {
            return 6;
          }
        } else if (codeDigits === 5) {
          if (includesOneChars) {
            return 3;
          } else {
            const isFive = charsLeftAfterRemovingFour === 2;
            if (isFive) {
              return 5;
            } else {
              return 2;
            }
          }
        }
      })
      .join("");
  });

  let total = 0;
  nums.forEach((row) => {
    console.log(row);
    const [rubbish, great] = row.split("|");
    total += +great;
  });
  console.log(total);
}

//adventPt2(samples);
